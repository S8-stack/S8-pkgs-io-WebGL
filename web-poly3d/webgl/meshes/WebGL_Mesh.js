



/**
 * WebGL Shape constructor, methods and utilities
 */
export class WebGL_Mesh {

	constructor(mesh) {

		this.props = props;

		/* <surface-attributes> */
		let attributes = mesh.attributes, n = attributes.length;

		/* <vertices> */
		if (this.props.isVertexAttributeEnabled) {
			let vertices = new WebGL_Vector3dBuffer(n);
			for (let i = 0; i < n; i++) {
				vertices.set(i, attributes[i].vertex);
			}
			vertices.compile();
			this.vertices = vertices;
		}
		/* </vertices> */

		/* <normals> */
		if (this.props.isNormalAttributeEnabled) {
			let normals = new WebGL_Vector3dBuffer(n);
			for (let i = 0; i < n; i++) {
				normals.set(i, attributes[i].normal);
			}
			normals.compile();
			this.normals = normals;
		}
		/* </normals> */

		/* <tex-coords> */
		if (this.props.isTexCoordAttributeEnabled) {
			let texCoords = new WebGL_Vector3dBuffer(n);
			for (let i = 0; i < n; i++) {
				texCoords.set(i, attributes[i].texCoord);
			}
			texCoords.compile();
			this.texCoords = texCoords;
		}
		/* </tex-coords> */

		/* <colors> */
		if (this.props.isColorAttributeEnabled) {
			let colors = new WebGL_Vector3dBuffer(n);
			for (let i = 0; i < n; i++) {
				colors.set(i, surfaceAttributes[i].color);
			}
			colors.compile();
			this.colors = colors;
		}
		/* </colors> */

		/* <tangents> */
		if (this.props.isSurfaceTangentAttributeEnabled) {
			let uTangents = new WebGL_Vector3dBuffer(n);
			let vTangents = new WebGL_Vector3dBuffer(n);
			for (let i = 0; i < n; i++) {
				uTangents.set(i, attributes[i].uTangent);
				vTangents.set(i, attributes[i].vTangent);
			}
			uTangents.compile();
			vTangents.compile();
			this.uTangents = uTangents;
			this.vTangents = vTangents;
		}
		/* </tangents> */


		/* </attributes> */

		/* <elements> */
		if (this.props.dimension == 1) {
			this.elements = new WebGL_LineBuffer(this.indices);
		}
		else if (this.props.dimension == 2) {
			this.elements = new WebGL_TriangleBuffer(this.indices);
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

		if (this.props.isTangentsAttributeEnabled) {
			this.surfaceUTangents.dispose();
			this.surfaceVTangents.dispose();
		}

		this.elements.dispose();
		/* </surface> */
	}

};


/*
 * VBO objects
 */

export class WebGL_Vector2dBuffer {

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


export class WebGL_Vector3dBuffer {

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


export class WebGL_ElementBuffer {

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


export class WebGL_LineBuffer extends WebGL_ElementBuffer {

	constructor(indices) {
		super(indices);
	}

	draw() {
		// trigger render by drawing elements
		gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_SHORT, 0);
	}
}

export class WebGL_TriangleBuffer extends WebGL_ElementBuffer {

	constructor(indices) {
		super(indices);
	}

	draw() {
		// trigger render by drawing elements
		gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
	}
};

