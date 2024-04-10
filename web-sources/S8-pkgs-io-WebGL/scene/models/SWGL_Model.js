


import { NeObject } from '/S8-core-bohr-neon/NeObject.js';

import * as M4 from '/S8-pkgs-io-WebGL/maths/SWGL_Matrix4d.js';

import { GL } from '/S8-pkgs-io-WebGL/swgl.js';
import { SWGL_Mesh } from './SWGL_Mesh.js';
import { VertexAttributesShaderLayout as ShLayout } from '/S8-pkgs-io-WebGL/scene/pipes/SWGL_Program.js';





/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Model extends NeObject {


	/** @type{WebGL2RenderingContext} */
	gl;


	/** @type {Float32Array}  predefine matrix */
	matrix = M4.createIdentity();


	/**
	 * @type{boolean}
	 */
	isReady = false;


	/** @type {SWGL_Mesh} vertex attributes enabling flag */
	mesh = null;


/** @type {number} the position vertex attributes */
dimension;

	/** @type {VertexAttributes} the position vertex attributes */
	positionVertexAttributes;

	/** @type {VertexAttributes} the position vertex attributes */
	normalVertexAttributes;

	/** @type {VertexAttributes} the position vertex attributes */
	uTangentVertexAttributes;

	/** @type {VertexAttributes} the position vertex attributes */
	vTangentVertexAttributes;

	/** @type {VertexAttributes} the position vertex attributes */
	texCoordsVertexAttributes;

	/** @type {VertexAttributes} the position vertex attributes */
	colorVertexAttributes;



	/**
	 * @type {ElementIndices}
	 */
	elementIndices;


	/**
	 * 
	 */
	constructor() {
		super();
	}

	setDrawOption(flag) {
		if (flag == 0) {
			this.drawOption = GL.STATIC_DRAW;
		}
		else if (flag == 1) {
			this.drawOption = GL.DYNAMIC_DRAW;
		}
		else {
			throw "Unsupported code for refreshingStyle";
		}
	}


	/** @param {Float32Array} coefficients */
	S8_set_matrix(coefficients) {
		this.matrix = coefficients;
	}


	/** @param {SWGL_Mesh} mesh */
	S8_set_mesh(mesh) {
		if (mesh == null) { throw "SWGL: Forbidden to set null mesh"; }
		this.mesh = mesh;
		this.isReady = true;
		this.GPU_isLoaded = false;
	}



		/**
	 * @param {WebGL2RenderingContext} gl 
	 */
		WebGL_relink(gl){
			this.gl = gl;
		}


	/**
	 * load data from mesh
	 */
	load() {
		const gl = this.gl
		if (!this.GPU_isLoaded) {

			/* load mesh to GPU (if not already done) */
			const mesh = this.mesh;

			this.dimension = mesh.dimension;

			if (mesh.positionVertexAttributes) {
				this.positionVertexAttributes = new VertexAttributes(gl, ShLayout.POSITIONS_LOCATION, 3,
					mesh.positionVertexAttributes, this.drawOption);
			}

			if (mesh.normalVertexAttributes) {
				this.normalVertexAttributes = new VertexAttributes(gl, ShLayout.NORMALS_LOCATION, 3,
					mesh.normalVertexAttributes, this.drawOption);
			}

			if (mesh.uTangentVertexAttributes) {
				this.uTangentVertexAttributes = new VertexAttributes(gl, ShLayout.U_TANGENTS_LOCATION, 3,
					mesh.uTangentVertexAttributes, this.drawOption);
			}

			if (mesh.vTangentVertexAttributes) {
				this.vTangentVertexAttributes = new VertexAttributes(gl, ShLayout.V_TANGENTS_LOCATION, 3,
					mesh.vTangentVertexAttributes, this.drawOption);
			}

			if (mesh.texCoordsVertexAttributes) {
				this.texCoordsVertexAttributes = new VertexAttributes(gl, ShLayout.TEX_COORDS_LOCATION, 2,
					mesh.texCoordsVertexAttributes, this.drawOption);
			}

			if (mesh.colorVertexAttributes) {
				this.colorVertexAttributes = new VertexAttributes(gl, ShLayout.COLORS_LOCATION, 4,
					mesh.colorVertexAttributes, this.drawOption);
			}

			this.elementIndices = new ElementIndices(gl, mesh.elementIndices, this.drawOption);

			this.GPU_isLoaded = true;
		}
	}



	/**
	 * Actually launch drawing 
	 */
	draw() {
		const gl = this.gl;
		// launch drawing!
		if (this.dimension == 2) {
			this.elementIndices.drawLines(gl);
		}
		else if (this.dimension == 3) {
			this.elementIndices.drawTriangles(gl);
		}
	}


	S8_render() { /* do nothing */ }


	S8_dispose() {
		if (this.isReady) {
			this.dispose();
			this.isReady = false;
		}
	}



	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 */
	dispose() {
		const gl = this.gl;
		if (this.GPU_isLoaded) {
			if (this.positionVertexAttributes) { this.positionVertexAttributes.dispose(gl); }
			if (this.normalVertexAttributes) { this.normalVertexAttributes.dispose(gl); }
			if (this.uTangentVertexAttributes) { this.uTangentVertexAttributes.dispose(gl); }
			if (this.vTangentVertexAttributes) { this.vTangentVertexAttributes.dispose(gl); }
			if (this.texCoordsVertexAttributes) { this.texCoordsVertexAttributes.dispose(gl); }
			if (this.colorVertexAttributes) { this.colorVertexAttributes.dispose(gl); }


			// delete handler buffer
			this.elementIndices.dispose(gl);
			this.GPU_isLoaded = false;
		}
	}

}





/**
 * WebGL Shape constructor, methods and utilities
 */
class VertexAttributes {

	static INDEX_RANGE = 8;


	/**
	 * @type {number} dimension of the unit value inside buffer
	 */
	dimension = 3;


	/**
	 * @type {number} location in shader
	 */
	location;


	/** 
	 * @type {WebGLBuffer}  vertex attributes : vertex buffer 
	 */
	buffer;

	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 * @param {number} dimension 
	 * @param {number} location 
	 * @param {Float32Array} data 
	 * 
	 */
	constructor(gl, location, dimension, data, drawOption = GL.STATIC_DRAW) {

		this.location = location;

		this.dimension = dimension;

		// Create buffer handle
		this.buffer = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		/** load GPU-side buffers to prepare rendering */
		gl.bufferData(gl.ARRAY_BUFFER, data, drawOption);
	}



	/**
	 * @param {WebGL2RenderingContext} gl 
	 */
	bind(gl) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.vertexAttribPointer(this.location, this.dimension, gl.FLOAT, false, 0, 0);
	}


	/**
	 * @param {WebGL2RenderingContext} gl 
	 */
	dispose(gl) {
		gl.deleteBuffer(this.buffer);
	}
}



class ElementIndices {

	/**
	 * @type {number}
	 * 
	 * A GLsizei specifying the number of elements of the bound element array buffer to be rendered. 
	 * For example, to draw a wireframe triangle with gl.LINES the count should be 2 endpoints 
	 * per line × 3 lines = 6 elements. However to draw the same wireframe triangle with gl.LINE_STRIP 
	 * the element array buffer does not repeat the indices for the end of the first line/start of the second 
	 * line, and end of the second line/start of the third line, so count will be four. 
	 * To draw the same triangle with gl.LINE_LOOP the element array buffer does not repeat the 
	 * first/last vertex either so count will be three.
	 */
	indexCount;



	/** @type {WebGLBuffer}  elements buffer  UNSIGNED_INT (UInt32) REQUIRED !!! */
	elementBuffer = null;


	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 * @param {Uint32Array} indices 
	 */
	constructor(gl, indices, drawOption = gl.STATIC_DRAW) {

		/* index count */
		this.indexCount = indices.length;

		/* Create buffer handle */
		this.elementBuffer = gl.createBuffer();

		/* Bind buffer handle to current buffer */
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

		/* bind buffer data */
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, drawOption);
	}


	/** @param {WebGL2RenderingContext} gl */
	bind(gl) {
		// Bind buffer handle to current buffer
		gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
	}

	/** 
	 * @param {WebGL2RenderingContext} gl 
	 * actually launch drawing 
	 */
	drawLines(gl) {
		// launch drawing!
		gl.drawElements(GL.LINES, this.indexCount, GL.UNSIGNED_INT, 0);
	}

	/** @param {WebGL2RenderingContext} gl */
	drawTriangles(gl) {
		gl.drawElements(GL.TRIANGLES, this.indexCount, GL.UNSIGNED_INT, 0);
	}

	/** @param {WebGL2RenderingContext} gl */
	dispose(gl) {
		// delete handler buffer
		gl.deleteBuffer(this.elementBuffer);
	}

}



