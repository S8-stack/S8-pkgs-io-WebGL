

import { NeObject } from '/s8-io-bohr-neon/NeObject.js';
import { gl } from '/s8-io-swgl/swgl.js';





/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Mesh extends NeObject {

	/** @type {VertexAttributes} the position vertex attributes */
	positionVertexAttributes = new VertexAttributes(3, VertexAttributes.POSITIONS_LOCATION);

	/** @type {VertexAttributes} the position vertex attributes */
	normalVertexAttributes = new VertexAttributes(3, VertexAttributes.NORMALS_LOCATION);

	/** @type {VertexAttributes} the position vertex attributes */
	uTangentVertexAttributes = new VertexAttributes(3, VertexAttributes.U_TANGENTS_LOCATION);

	/** @type {VertexAttributes} the position vertex attributes */
	vTangentVertexAttributes = new VertexAttributes(3, VertexAttributes.V_TANGENTS_LOCATION);

	/** @type {VertexAttributes} the position vertex attributes */
	texCoordsVertexAttributes = new VertexAttributes(2, VertexAttributes.TEX_COORDS_LOCATION);

	/** @type {VertexAttributes} the position vertex attributes */
	colorVertexAttributes = new VertexAttributes(4, VertexAttributes.COLORS_LOCATION);
	
	/** @type {VertexAttributes} the position vertex attributes */
	appCoordsVertexAttributes = new VertexAttributes(2, VertexAttributes.APP_COORDS_LOCATION);
	


	/**
	 * @type {ElementIndices}
	 */
	elementIndices;




	/** number of vertices */
	nVertices;

	/** draw option */
	drawOption = gl.STATIC_DRAW;

	GPU_isLoaded = false;

	/**
	 * 
	 */
	constructor() {
		super();

		// initialize attributes
		

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



	/** @param {Float32Array} positions */
	S8_set_positions(positions) {
		this.positionVertexAttributes.data = positions;
		this.positionVertexAttributes.isEnabled = true;

		this.nVertices = positions.length / 3;
		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} normals */
	S8_set_normals(normals) {
		this.normalVertexAttributes.data = normals;
		this.normalVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} uTangents */
	S8_set_uTangents(uTangents) {
		this.uTangentVertexAttributes.data = uTangents;
		this.uTangentVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} vTangents */
	S8_set_vTangents(vTangents) {
		this.vTangentVertexAttributes.data = vTangents;
		this.vTangentVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} texCoords */
	S8_set_texCoords(texCoords) {
		this.texCoordsVertexAttributes.data = texCoords;
		this.texCoordsVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} colors */
	S8_set_colors(colors) {
		this.colorVertexAttributes.data = colors;
		this.colorVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {Float32Array} colors */
	S8_set_appCoords(appCoords) {
		this.appCoordsVertexAttributes.data = appCoords;
		this.appCoordsVertexAttributes.isEnabled = true;

		this.GPU_isLoaded = false;
	}

	/** @param {number} dim */
	S8_set_dimension(dim) {
		this.dimension = dim;
		this.GPU_isLoaded = false;
	}

	/** @param {Uint32Array} indices */
	S8_set_indices(indices) {
		this.elementIndices = new ElementIndices(indices);
	}


	/** 
	 * load GPU-side buffers to prepare rendering 
	 */
	load() {
		if (!this.GPU_isLoaded) {

			this.positionVertexAttributes.load();
			this.normalVertexAttributes.load();
			this.uTangentVertexAttributes.load();
			this.vTangentVertexAttributes.load();
			this.texCoordsVertexAttributes.load();
			this.colorVertexAttributes.load();
			this.appCoordsVertexAttributes.load();

			// element indices
			this.elementIndices.load();

			this.GPU_isLoaded = true;
		}
	}


	/** actually launch drawing */
	draw() {
		// launch drawing!
		if (this.dimension == 2) {
			this.elementIndices.drawLines();
		}
		else if (this.dimension == 3) {
			this.elementIndices.drawTriangles();
		}
	}


	/**
	 * 
	 */
	dispose() {
		if (this.GPU_isLoaded) {
			this.positionVertexAttributes.dispose();
			this.normalVertexAttributes.dispose();
			this.uTangentVertexAttributes.dispose();
			this.vTangentVertexAttributes.dispose();
			this.texCoordsVertexAttributes.dispose();
			this.colorVertexAttributes.dispose();
			this.appCoordsVertexAttributes.dispose();

			// delete handler buffer
			this.elementIndices.dispose();
			this.GPU_isLoaded = false;
		}
	}


	S8_render() { /* do nothing */ }

	/**
	 * 
	 */
	S8_dispose() {
		this.dispose();
	}

	/**
	 * 
	 * @returns {SWGL_Mesh}
	 */
	static generateZero(dimension){
		const mesh = new SWGL_Mesh();
	
		// no vertices
		mesh.S8_set_positions(new Float32Array());
		mesh.S8_set_normals(new Float32Array());
		mesh.S8_set_uTangents(new Float32Array());
		mesh.S8_set_vTangents(new Float32Array());
		mesh.S8_set_texCoords(new Float32Array());
		mesh.S8_set_colors(new Float32Array());
	
		// no elements
		mesh.S8_set_dimension(dimension);
		mesh.S8_set_indices(new Uint32Array());
	
		return mesh;
	}

}



/**
 * WebGL Shape constructor, methods and utilities
 */
export class VertexAttributes {


	static INDEX_RANGE = 8;

	static POSITIONS_LOCATION = 0x0;
	static NORMALS_LOCATION = 0x1;
	static U_TANGENTS_LOCATION = 0x2;
	static V_TANGENTS_LOCATION = 0x3;
	static TEX_COORDS_LOCATION = 0x4;
	static COLORS_LOCATION = 0x5;
	static APP_COORDS_LOCATION = 0x6;


	/** 
	 * @type {boolean} is vertex attribute enabled 
	 */
	isEnabled = false;


	/**
	 * @type {number} dimension of the unit value inside buffer
	 */
	dimension = 3;


	/**
	 * @type {number} location in shader
	 */
	location;



	/**
	 * @type {Float32Array} pre-buffering values
	 */
	data;


	/** 
	 * @type {WebGLBuffer}  vertex attributes : vertex buffer 
	 */
	buffer;


	/**
	 * 
	 */
	constructor(dimension, location) {
		this.dimension = dimension;
		this.location = location;
	}


	/** 
	 * load GPU-side buffers to prepare rendering 
	 */
	load(drawOption = gl.STATIC_DRAW) {
		if (this.isEnabled) {
			// Create buffer handle
			this.buffer = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, this.data, drawOption);
		}
	}


	/** 
	 * @param {number} location 
	 */
	bind() {
		if (!this.isEnabled) { throw "Disabled VAO"; }
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.vertexAttribPointer(this.location, this.dimension, gl.FLOAT, false, 0, 0);
	}


	/**
	 * 
	 */
	dispose() {
		if (this.isEnabled) {
			gl.deleteBuffer(this.buffer);
		}
	}
}



export class ElementIndices {

	/** @type {Uint32Array} indices of elements */
	indices;


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


	/** @param {Uint32Array} indices */
	constructor(indices) {
		this.indices = indices;
		this.indexCount = indices.length;
	}


	load(drawOption = gl.STATIC_DRAW) {

		// Create buffer handle
		this.elementBuffer = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);

		// bind buffer data
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, drawOption);
	}



	bind() {
		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBuffer);
	}


	/** actually launch drawing */
	drawLines() {
		// launch drawing!
		gl.drawElements(gl.LINES, this.indexCount, gl.UNSIGNED_INT, 0);
	}

	/** actually launch drawing */
	drawTriangles() {
		gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_INT, 0);
	}

	dispose() {
		// delete handler buffer
		gl.deleteBuffer(this.elementBuffer);
	}



	
}

