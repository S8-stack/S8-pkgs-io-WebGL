
import * as M4 from "../../maths/NbMatrix4d";
import * as M3 from "../../maths/NbMatrix3d";
import * as V3 from "../../maths/NbVector3d";
import * as V4 from "../../maths/NbVector4d";



export class NbRay3d {
	constructor(eyePosition, rayVector) {
		this.eyePosition = eyePosition;
		this.rayVector = rayVector;
	}
}


/**
 * view for the scene
 */
export class NbView {

	/**
	 * 
	 * @param {*} width 
	 * @param {*} height 
	 * @param {*} up 
	 */
	constructor(width, height, up = V3.create(0, 0, 1)) {
		this.width = width;
		this.height = height;
		this.up = up;

		this.newRotationMatrix = M4.create();
		M4.identity(this.newRotationMatrix);

		// Eye
		this.eyePosition = V3.create(1.0, 1.0, 1.0);
		this.eyeTarget = V3.create(0.0, 0.0, 0.0);

		/* see for instance https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html */

		// Projection matrix
		this.matrix_Projection = M4.create();
		M4.perspectiveProjection(45, width / height, 0.1, 10000.0, this.matrix_Projection);

		// Build inverse projection matrix
		this.matrix_invProjection = M4.create();
		M4.inverse(this.matrix_Projection, this.matrix_invProjection);

		// View matrix 
		this.matrix_View = M4.create();
		let up = V3.create(0.0, 0.0, 1.0);
		M4.lookAt(this.eyePosition, this.eyeTarget, up, this.matrix_View);

		// allocate inverse view matrix
		this.matrix_invView = M4.create();

		// Projection * View Matrix
		this.matrix_ProjectionView = M4.create();
		M4.multiply(this.matrix_Projection, this.matrix_View, this.matrix_ProjectionView);


		/* create useful matrices */


		// view model matrix
		this.matrix_ViewModel = M4.create();

		// projection view matrix
		this.matrix_ProjectionViewModel = M4.create();

		// normal matrix (for shader rendering of normals)
		this.matrix_Normal = M3.create();

		// model matrix
		this.matrix_Model = M4.create();
	}

	/*
	 * set eye vector and eye target
	 */
	update() {

		// update view matrices
		M4.lookAt(this.eyePosition, this.eyeTarget, this.up, this.matrix_View);
		M4.multiply(this.matrix_Projection, this.matrix_View, this.matrix_ProjectionView);
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
}

