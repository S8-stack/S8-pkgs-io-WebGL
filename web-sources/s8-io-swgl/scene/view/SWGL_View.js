

import * as M4 from "/s8-io-swgl/maths/SWGL_Matrix4d.js";
import * as V3 from "/s8-io-swgl/maths/SWGL_Vector3d.js";
import * as V4 from "/s8-io-swgl/maths/SWGL_Vector4d.js";

import { SWGL_CONTEXT } from "/s8-io-swgl/swgl.js";
import { SWGL_Scene } from "/s8-io-swgl/scene/SWGL_Scene.js";
import { NeObject } from "/s8-io-bohr-neon/NeObject.js";


export class NbRay3d {
	constructor(eyePosition, rayVector) {
		this.eyePosition = eyePosition;
		this.rayVector = rayVector;
	}
}




/**
 * view for the scene
 */
export class SWGL_View extends NeObject {

	/** @type {NbScene} scene */
	scene;

	/** @type {Float32Array} V3 */
	up = V3.create(0, 0, 1);

	/** @type {number} min radius */
	SETTINGS_min_approach_r = 0.2;

	/** @type {number} */
	width = 400;

	/** @type {number} */
	height = 300;


	// Eye

	/** @type {Float32Array} V3-type vector: position point of viewer */
	eyePosition = V3.create(1.0, 1.0, 1.0);

	/** @type {Float32Array} target point of view */
	eyeTarget = V3.create(0.0, 0.0, 0.0);

	/** @type {Float32Array} eye vector */
	eyeVector = V3.create();

	/** @type {Float32Array} projection matrix */
	matrix_Projection = M4.create();

	/** @type {Float32Array} inverse projection matrix */
	matrix_invProjection = M4.create();

	/** @type {Float32Array} View matrix */
	matrix_View = M4.create();

	/** @type {Float32Array} inverse of View matrix */
	matrix_invView = M4.create();

	/** @type {Float32Array} Projection * View Matrix */
	matrix_ProjectionView = M4.create();

	/**
	 * @param {SWGL_Scene} scene
	 */
	constructor() {
		super();
	}


	/**
	 * 
	 * @param {number} width canvasWrapperNode DOM element width
	 * @param {number} height canvasWrapperNode DOM element height
	 *  
	 * see for instance https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
	 */
	resize(width, height) {
		this.width = width;
		this.height = height;
		this.updateProjectionMatrix();
	}


	/**
	 * 
	 */
	updateProjectionMatrix(){

		// build projection matrix
		M4.perspectiveProjection_RIGHT_SIDE(45, this.width / this.height, 0.1, 10000.0, this.matrix_Projection);

		// Build inverse projection matrix
		M4.inverse(this.matrix_Projection, this.matrix_invProjection);

		// update for consistency
		this.updateViewMatrix();
	}


	/**
	 * 
	 */
	updateViewMatrix() {
		// compute new eye target position
		//this.eyeTarget_Speed.add(this.eyeTarget_Acceleration, this.eyeTarget_Speed);
		//this.eyeTarget.add(this.eyeTarget_Speed, this.eyeTarget);

		V3.add(this.eyeTarget, this.eyeVector, this.eyePosition);

		// update view
		M4.lookAt(this.eyePosition, this.eyeTarget, this.up, this.matrix_View);
		M4.multiply(this.matrix_Projection, this.matrix_View, this.matrix_ProjectionView);
	}


	/**
	 * 
	 */
	refresh() {
		// recompute
		this.updateViewMatrix();

		// refresh
		this.scene.render();
	}



	/**
	 * @param {number} x : mouse coordinate in screen space
	 * @param {number} y : mouse coordinate in screen space
	 * @return a MathRay3d modelling the ray cast from mouse position on the screen for a given 
	 * Projection/View
	 */
	castRay(xMouse, yMouse) {


		/* (Arguments)
		 * Step 0: 2d Viewport Coordinates (range [0:width, height:0])
		 * 
		 * We are starting with mouse cursor coordinates. 
		 * These are 2d, and in the viewport coordinate system. 
		 * First we need to get the mouse x,y pixel coordinates.
		 * This gives us an x in the range of 0:width and y from height:0. 
		 * Remember that 0 is at the top of the screen here, so the y-axis direction is opposed to that 
		 * in other coordinate systems.
		 */


		/*
		 * Step 1: 3d Normalised Device Coordinates (range [-1:1, -1:1, -1:1]).
		 * The next step is to transform it into 3d normalised device coordinates. 
		 * This should be in the ranges of x [-1:1] y [-1:1] and z [-1:1]. 
		 * We have an x and y already, so we scale their range, and reverse the direction of y.
		 */
		let x = (2.0 * xMouse) / this.width - 1.0;
		let y = 1.0 - (2.0 * yMouse) / this.height;

		/*
		 * Step 2: 4d Homogeneous Clip Coordinates (range [-1:1, -1:1, -1:1, -1:1])
		 * We want our ray's z to point forwards - this is usually the negative z direction in OpenGL style. 
		 * We can add a w, just so that we have a 4d vector.
		 * Note: we do not need to reverse perspective division here because this is a ray with no intrinsic depth. 
		 * Other tutorials on ray-casting will, incorrectly, tell you to do this.
		 */
		let rayClip = V4.create(x, y, -1.0, 1.0);


		/* 
		 * Step 3: 4d Eye (Camera) Coordinates (range [-x:x, -y:y, -z:z, -w:w])
		 * Normally, to get into clip space from eye space we multiply the vector by a projection matrix. 
		 * We can go backwards by multiplying by the inverse of this matrix.
		 * vec4 ray_eye = inverse(projection_matrix) * ray_clip;
		 */
		let rayEye = V4.create();
		M4.transformVector4d(this.matrix_invProjection, rayClip, rayEye)

		/* Now, we only needed to un-project the x,y part, so let's 
		 * manually set the z,w part to mean "forwards, and not a point".
		 * ray_eye = vec4(ray_eye.xy, -1.0, 0.0);
		 */
		rayEye[2] = -1.0; rayEye[3] = 0.0;

		/*
		 * Step 4: 4d World Coordinates (range [-x:x, -y:y, -z:z, -w:w])
		 * Same again, to go back another step in the transformation pipeline. 
		 * Remember that we manually specified a -1 for the z component, which means that our ray isn't normalised. 
		 * We should do this before we use it.
		 * -> vec3 ray_wor = (inverse(view_matrix) * ray_eye).xyz;
		 * don't forget to normalise the vector at some point
		 * 
		 * This should balance the up-and-down, left-and-right, and forwards components for us. 
		 * So, assuming our camera is looking directly along the -Z world axis, 
		 * we should get [0,0,-1] when the mouse is in the centre of the screen, 
		 * and less significant z values when the mouse moves around the screen. 
		 * This will depend on the aspect ratio, and field-of-view defined in the view 
		 * and projection matrices. 
		 * We now have a ray that we can compare with surfaces in world space.
		 */

		M4.inverse(this.matrix_View, this.matrix_invView);
		let rayWorld = V4.create();
		M4.transform(this.matrix_invView, rayEye, rayWorld);

		let rayVector = V3.create(rayWorld[0], rayWorld[1], rayWorld[2]);
		V3.normalize(rayVector, rayVector);

		return new NbRay3d(this.eyePosition, rayVector);
	}



	S8_render(){
		/* nothing */
	}

	S8_dispose(){
		SWGL_CONTEXT.removeSizeListener(this.sizeListener);
	}
}

