
import { gl } from '../nebular.js';
import { NbMatrix4d } from "../maths/NbMatrix4d";






/**
 * IMMUTABLE
 */
export class NbMeshProperties {

	/**
	 * 
	 */
	constructor() {

		/** wire: dimension=2, surface: dimension=3 */
		this.dimension = 3;

		/** surface normal */
		this.isVertexAttributeEnabled = true;

		/** surface normal */
		this.isNormalAttributeEnabled = true;

		/** surface tex coord */
		this.isTexCoordAttributeEnabled = false;

		/** surface color */
		this.isColorAttributeEnabled = false;

		/** surface {U,V}-tangents */
		this.isUTangentAttributeEnabled = false;

		/** surface {U,V}-tangents */
		this.isVTangentAttributeEnabled = false;

		/* </surface> */
	}

	set(code, value) {
		switch (code) {

			// surface
			case 0x42: this.dimension = value; break;
			case 0x43: this.isNormalAttributeEnabled = value; break;
			case 0x44: this.isTexCoordAttributeEnabled = value; break;
			case 0x45: this.isColorAttributeEnabled = value; break;
			case 0x46: this.isTangentsAttributeEnabled = value; break;
			default: throw "Code not supported";
		}
	}

	copy() {
		let target = new NbMeshProperties();
		target.isVertexAttributeEnabled = this.isVertexAttributeEnabled;
		target.isNormalAttributeEnabled = this.isNormalAttributeEnabled;
		target.isUTangentAttributeEnabled = this.isUTangentAttributeEnabled;
		target.isVTangentAttributeEnabled = this.isVTangentAttributeEnabled;
		target.isColorAttributeEnabled = this.isColorAttributeEnabled;
		target.isTexCoordAttributeEnabled = this.isTexCoordAttributeEnabled;
		return target;
	}
}


/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbMesh {


	/**
	 * 
	 * @param {GkMeshProperties} props 
	 * @param {GkVertexAttributes} attributes 
	 * @param {Array} indices 
	 */
	constructor(props, attributes, indices) {

		// props
		this.props = props;

		/* <surface-attributes> */
		let n = attributes.length;

		/* <vertices> */
		if (this.props.isVertexAttributeEnabled) {
			let vertices = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				vertices.set(i, attributes[i].vertex);
			}
			vertices.compile();
			this.vertices = vertices;
		}
		/* </vertices> */

		/* <normals> */
		if (this.props.isNormalAttributeEnabled) {
			let normals = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				normals.set(i, attributes[i].normal);
			}
			normals.compile();
			this.normals = normals;
		}
		/* </normals> */

		/* <tex-coords> */
		if (this.props.isTexCoordAttributeEnabled) {
			let texCoords = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				texCoords.set(i, attributes[i].texCoord);
			}
			texCoords.compile();
			this.texCoords = texCoords;
		}
		/* </tex-coords> */

		/* <colors> */
		if (this.props.isColorAttributeEnabled) {
			let colors = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				colors.set(i, surfaceAttributes[i].color);
			}
			colors.compile();
			this.colors = colors;
		}
		/* </colors> */

		/* <u-tangents> */
		if (this.props.isUTangentAttributeEnabled) {
			let uTangents = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				uTangents.set(i, attributes[i].uTangent);
			}
			uTangents.compile();
			this.uTangents = uTangents;
		}
		/* </u-tangents> */

		/* <v-tangents> */
		if (this.props.isVTangentAttributeEnabled) {
			let vTangents = new Vector3dNbBuffer(n);
			for (let i = 0; i < n; i++) {
				vTangents.set(i, attributes[i].vTangent);
			}
			vTangents.compile();
			this.vTangents = vTangents;
		}
		/* </v-tangents> */

		/* </attributes> */

		/* <elements> */
		if (this.props.dimension == 1) {
			this.elements = new LineNbBuffer(indices);
		}
		else if (this.props.dimension == 2) {
			this.elements = new TriangleNbBuffer(indices);
		}
		else {
			throw "Unsupported dimension";
		}
		/* </elements> */
	}

	dispose() {

		if (this.props.isVertexAttributeEnabled) {
			this.vertices.dispose();
		}

		if (this.props.isNormalAttributeEnabled) {
			this.normals.dispose();
		}

		if (this.props.isTexCoordAttributeEnabled) {
			this.texCoords.dispose();
		}

		if (this.props.isSurfaceColorAttributeEnabled) {
			this.colors.dispose();
		}

		if (this.props.iUsTangentAttributeEnabled) {
			this.surfaceUTangents.dispose();
		}

		if (this.props.isVTangentAttributeEnabled) {
			this.surfaceVTangents.dispose();
		}

		this.elements.dispose();
		/* </surface> */
	}

};


/*
 * VBO objects
 */

export class Vector2dNbBuffer {

	constructor(nbVectors) {
		this.array = new Float32Array(2 * nbVectors);
	}

	set(index, vector) {
		this.array[2 * index + 0] = vector.x;
		this.array[2 * index + 1] = vector.y;
	}

	compile() {

		// Create buffer handle
		this.bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// store data in GPU
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		delete this.array;
	}

	bind(location) {

		// bind vertices
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// set to vertex attributes location
		gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
	}

	dispose() {
		gl.deleteBuffer(this.bufferHandle);
	}
};


export class Vector3dNbBuffer {

	constructor(nbVectors) {
		this.array = new Float32Array(3 * nbVectors);
	}


	set(index, vector) {
		this.array[3 * index + 0] = vector.x;
		this.array[3 * index + 1] = vector.y;
		this.array[3 * index + 2] = vector.z;
	}


	compile() {

		// Create buffer handle
		this.bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// store data in GPU
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		delete this.array;
	}


	bind(location) {

		// bind vertices
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

		// set to vertex attributes location
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	}


	dispose() {
		gl.deleteBuffer(this.bufferHandle);
	}
};


export class ElementNbBuffer {

	constructor(indices) {
		// create and populate array
		this.length = indices.length;
		var array = new Uint16Array(this.length);
		array.set(indices);

		// Create buffer handle
		this.bufferHandle = gl.createBuffer();

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

		// bind buffer data
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
	}

	bind() {

		// Bind buffer handle to current buffer
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
	}

	dispose() {
		gl.deleteBuffer(this.bufferHandle);
	}
}


export class LineNbBuffer extends ElementNbBuffer {

	constructor(indices) {
		super(indices);
	}

	draw() {
		// trigger render by drawing elements
		gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_SHORT, 0);
	}
}

export class TriangleNbBuffer extends ElementNbBuffer {

	constructor(indices) {
		super(indices);
	}

	draw() {
		// trigger render by drawing elements
		gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
	}
};

