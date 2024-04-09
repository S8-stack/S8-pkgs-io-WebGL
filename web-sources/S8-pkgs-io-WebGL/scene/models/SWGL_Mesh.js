

import { S8Object } from '/S8-api/S8Object.js';






/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Mesh extends S8Object {

/** @type {number} the position vertex attributes */
	dimension;

	/** @type {Float32Array} the position vertex attributes */
	positionVertexAttributes;

	/** @type {Float32Array} the position vertex attributes */
	normalVertexAttributes;

	/** @type {Float32Array} the position vertex attributes */
	uTangentVertexAttributes;

	/** @type {Float32Array} the position vertex attributes */
	vTangentVertexAttributes;

	/** @type {Float32Array} the position vertex attributes */
	texCoordsVertexAttributes;

	/** @type {Float32Array} the position vertex attributes */
	colorVertexAttributes;

	/** @type {Uint32Array} the indcices of the elements */
	elementIndices;

	/** number of vertices */
	nVertices;

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
		this.positionVertexAttributes = positions;
		this.nVertices = positions.length / 3;
	}

	/** @param {Float32Array} normals */
	S8_set_normals(normals) { this.normalVertexAttributes = normals; }

	/** @param {Float32Array} uTangents */
	S8_set_uTangents(uTangents) { this.uTangentVertexAttributes = uTangents; }

	/** @param {Float32Array} vTangents */
	S8_set_vTangents(vTangents) { this.vTangentVertexAttributes = vTangents; }

	/** @param {Float32Array} texCoords */
	S8_set_texCoords(texCoords) { this.texCoordsVertexAttributes = texCoords; }

	/** @param {Float32Array} colors */
	S8_set_colors(colors) { this.colorVertexAttributes = colors; }


	/** @param {number} dim */
	S8_set_dimension(dim) {
		this.dimension = dim;
	}

	/** @param {Uint32Array} indices */
	S8_set_indices(indices) { this.elementIndices = indices; }




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



