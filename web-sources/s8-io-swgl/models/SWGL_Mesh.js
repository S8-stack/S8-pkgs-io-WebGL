


import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { NeObject } from '/s8-io-bohr/neon/NeObject.js';
import { gl } from '/s8-io-swgl/swgl.js';





/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Mesh extends NeObject {

	/** @type {Float32Array}  predefine matrix */
	matrix = M4.createIdentity();

	/** @type {boolean[]} vertex attributes enabling flage */
	isVertexAttributeEnabled = new Array(VertexAttributes.INDEX_RANGE);

	/** @type {VertexAttributes[]} the array of vertex attributes */
	vertexAttributes = new Array(VertexAttributes.INDEX_RANGE);


	/** @type {Uint32Array} indices of elements */
	indices;

	/** @type {WebGLBuffer}  elements buffer  UNSIGNED_INT (UInt32) REQUIRED !!! */
	elementBuffer = null;

	/** number of vertices */
	nVertices;


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

	/** draw option */
	drawOption = gl.STATIC_DRAW;


	/** @type {boolean} : false if mesh is to be built */
	isMeshBuilt = false;

	/**
	 * Transfer to GPU has been initiated
	 */
	GPU_isInitiated = false;


	GPU_isLoaded = false;


	/** Direct: vertex attributes directly set */
	static DIRECT_MESH_BUILD_MODE = 0;

	/** Pattern: one seed is replaicated and postionned against a matrices array */
	static PATTERN_MESH_BUILD_MODE = 2;

	/** Blend: multiple seeds are postionned against a single matrix */
	static PATTERN_MESH_BUILD_MODE = 4;

	/** @type {string} */
	meshBuildMode = SWGL_Mesh.DIRECT_MESH_BUILD_MODE;


	/**
	 * @type {boolean} true is NbModel is directly part of a renderer pipe, 
	 * false if intermediary in complex Model construction.
	 */
	WebGL_isRendered;

	/** @type {SWGL_Mesh} */
	seedModel;

	/** seed matrix */
	seedMatrix;

	/**
	 * 
	 */
	constructor() {
		super();

		// initialize attributes
		for (let i = 0; i < VertexAttributes.INDEX_RANGE; i++) {
			this.isVertexAttributeEnabled[i] = false;
			this.vertexAttributes[i] = null;
		}
	}

	setDrawOption(flag) {
		if (flag == 0) {
			this.drawOption = gl.STATIC_DRAW;
		}
		else if (flag == 1) {
			this.drawOption = gl.DYNAMIC_DRAW;
		}
		else {
			throw "Unsupported code for refreshingStyle";
		}
	}



	/** @param {number} */
	S8_set_meshBuildMode(mode) {
		this.meshBuildMode = mode;
	}


	buildMesh() {
		if (!this.isMeshBuilt) {
			switch (this.meshBuildMode) {
				case SWGL_Mesh.DIRECT_MESH_BUILD_MODE: /* do nothing, already loaded */ break;
				case SWGL_Mesh.PATTERN_MESH_BUILD_MODE: throw "Not implemented yet";
			}
			this.isMeshBuilt = true;
		}
	}

	/** @param {Float32Array} coefficients */
	S8_set_matrix(coefficients) {
		this.matrix = coefficients;
	}

	/** @param {Float32Array} points */
	S8_set_positions(points) {
		let index = VertexAttributes.POSITIONS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(3, points);
		this.nVertices = points.length / 3;
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} normals */
	S8_set_normals(normals) {
		let index = VertexAttributes.NORMALS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(3, normals);
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} uTangents */
	S8_set_uTangents(uTangents) {
		let index = VertexAttributes.U_TANGENTS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(3, uTangents);
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} vTangents */
	S8_set_vTangents(vTangents) {
		let index = NbVertexAttributes.V_TANGENTS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new NbVertexAttributes(3, vTangents);
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} texCoords */
	S8_set_texCoords(texCoords) {
		let index = VertexAttributes.TEX_COORDS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(2, texCoords);
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} colors */
	S8_set_colors(colors) {
		let index = VertexAttributes.COLORS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(4, colors);
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} colors */
	S8_set_appCoords(appCoords) {
		let index = VertexAttributes.APP_COORDS;
		this.isVertexAttributeEnabled[index] = true;
		this.vertexAttributes[index] = new VertexAttributes(2, appCoords);
		this.GPU_isLoaded = false;
	}

	/** @param {number} dim */
	S8_set_dimension(dim) {
		this.dimension = dim;
		this.GPU_isLoaded = false;
	}

	/** @param {Uint32Array} indices */
	S8_set_indices(indices) {
		this.indices = indices;
		this.indexCount = indices.length;
		this.GPU_isLoaded = false;
	}


	/**
	 * 
	 */
	S8_render() {
		this.GPU_initialize();
	}



	/** 
	 * load GPU-side buffers to prepare rendering 
	 */
	GPU_initialize() {
		if (this.WebGL_isRendered && !this.GPU_isLoaded) {

			/** build mesh before if necessary */
			this.buildMesh();


			for (let i = 0; i < VertexAttributes.INDEX_RANGE; i++) {
				if (this.isVertexAttributeEnabled[i]) {
					this.vertexAttributes[i].GPU_load();
				}
			}

			// Create buffer handle
			this.elementBuffer = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

			// bind buffer data
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, this.drawOption);

			this.GPU_isLoaded = true;
		}
	}




	/** @param {number} location */
	bindVertexAttributes(index, location) {
		if (!this.isVertexAttributeEnabled[index]) { throw "Attribute is not enabled for index:" + index; }
		this.vertexAttributes[index].GPU_bind(location);
	}

	/** */
	bindElements() {

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
	}

	/** actually launch drawing */
	draw() {
		// launch drawing!
		if (this.dimension == 2) {
			gl.drawElements(gl.LINES, this.indexCount, gl.UNSIGNED_INT, 0);
		}
		else if (this.dimension == 3) {
			// launch drawing!
			gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_INT, 0);
		}
	}

	S8_dispose() {
		if (this.GPU_isLoaded) {
			for(let i= 0; i<VertexAttributes.INDEX_RANGE; i++){
				if (this.isVertexAttributeEnabled[i]) {
					this.vertexAttributes[i].GPU_dispose();
				}	
			}
			
			// delete handler buffer
			gl.deleteBuffer(this.elementBuffer);
		}
	}

}





/**
 * WebGL Shape constructor, methods and utilities
 */
export class VertexAttributes {


	static INDEX_RANGE = 16;

	static POSITIONS = 0x0;

	static NORMALS = 0x1;

	static U_TANGENTS = 0x2;

	static V_TANGENTS = 0x3;

	static TEX_COORDS = 0x4;

	static COLORS = 0x5;

	static APP_COORDS = 0x6;


	/** 
	 * @type {boolean} is vertex attribute enabled 
	 */
	isEnabled = false;


	/**
	 * @type {Float32Array} pre-buffering values
	 */
	floatValues;


	/**
	 * @type {number} dimension of the unit value inside buffer
	 */
	dimension = 3;

	/** 
	 * @type {WebGLBuffer}  vertex attributes : vertex buffer 
	 */
	buffer;

	/**
	 * @type{boolean} is buffer created and loaded into the GPU
	 */
	GPU_isLoaded = false;

	/**
	 * 
	 */
	constructor(dimension, floatValues) {
		this.dimension = dimension;
		this.floatValues = floatValues;
	}


	/** 
	 * load GPU-side buffers to prepare rendering 
	 */
	GPU_load(drawOption = gl.STATIC_DRAW) {
		if (!this.GPU_isLoaded) {

			// Create buffer handle
			this.buffer = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, this.floatValues, drawOption);

			this.GPU_isLoaded = true;
		}
	}


	/** 
	 * @param {number} location 
	 */
	GPU_bind(location) {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.vertexAttribPointer(location, this.dimension, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 */
	GPU_dispose() {
		if (this.GPU_isLoaded) {
			gl.deleteBuffer(this.buffer);
			this.GPU_isLoaded = false;
		}
	}
}
