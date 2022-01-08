

/**
 * 
 */
export class WebGL_HexagonalNut {

	constructor() {
		this.wrenchSize = 0.03;
		this.height = 0.02;
		this.shift = 0.0001;
	}


	build(mesh) {
		// caching configuration
		let config = mesh.configuration;

		let vertices, normals, texCoords, texCoordScale, elements, offset;

		// dimensions
		let s = this.wrenchSize / 2.0;
		let halfWidth = s * Math.tan(Math.PI / 6.0);
		let r = s / Math.cos(Math.PI / 6.0);
		let x0 = 0.0;
		let x1 = this.height;

		// <surface>
		if (config.isSurfaceEnabled) {

			vertices = mesh.surfaceVertices;

			let isSurfaceNormalAttributeEnabled = config.isSurfaceNormalAttributeEnabled;
			if (isSurfaceNormalAttributeEnabled) {
				normals = mesh.surfaceNormals;
			}
			elements = mesh.surfaceElements;
			offset = vertices.length();

			let matrix = new MathMatrix3d();
			let dTheta = 2.0 * Math.PI / 6, theta0 = Math.PI / 6.0;
			let vertex, normal;
			for (let i = 0; i < 6; i++) {
				matrix.xRotation(i * dTheta);

				// vertex 0
				vertex = new MathVector3d(x0, s, -halfWidth);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// vertex 1
				vertex = new MathVector3d(x0, s, halfWidth);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// vertex 2
				vertex = new MathVector3d(x1, s, halfWidth);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// vertex 3
				vertex = new MathVector3d(x1, s, -halfWidth);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// normals
				if (isSurfaceNormalAttributeEnabled) {
					normal = new MathVector3d(0.0, 1.0, 0.0);
					matrix.transform(normal, normal);
					normals.push(normal);
					normals.push(normal);
					normals.push(normal);
					normals.push(normal);
				}

				elements.push(offset + 0, offset + 1, offset + 2);
				elements.push(offset + 2, offset + 3, offset + 0);
				offset += 4;
			}

			// mesh bottom
			for (let i = 0; i < 6; i++) {
				matrix.xRotation(theta0 + i * dTheta);

				// vertex
				vertex = new MathVector3d(x0, r, 0.0);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// normal
				if (isSurfaceNormalAttributeEnabled) {
					normal = new MathVector3d(-1.0, 0.0, 0.0);
					normals.push(normal);
				}
			}
			elements.push(offset + 0, offset + 3, offset + 1); // 013
			elements.push(offset + 1, offset + 3, offset + 2); // 123
			elements.push(offset + 3, offset + 0, offset + 4); // 340
			elements.push(offset + 4, offset + 0, offset + 5);// 450
			offset += 6;

			// mesh top
			for (let i = 0; i < 6; i++) {
				matrix.xRotation(theta0 + i * dTheta);

				// vertex
				vertex = new MathVector3d(x1, r, 0.0);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);


				// normal
				if (isSurfaceNormalAttributeEnabled) {
					normal = new MathVector3d(1.0, 0.0, 0.0);
					normals.push(normal);
				}
			}
			elements.push(offset + 0, offset + 1, offset + 3); // 013
			elements.push(offset + 1, offset + 2, offset + 3); // 123
			elements.push(offset + 3, offset + 4, offset + 0); // 340
			elements.push(offset + 4, offset + 5, offset + 0);// 450

		}
		// </surface>

		// <wire>
		if (config.isWireEnabled) {

			vertices = mesh.wireVertices;
			elements = mesh.wireElements;
			offset = vertices.length();
			for (let i = 0; i < 6; i++) {
				matrix.xRotation(theta0 + i * dTheta);

				// vertex 0
				vertex = new MathVector3d(x0 + this.shift, r + this.shift, 0.0);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				// vertex 1
				vertex = new MathVector3d(x1 + this.shift, r + this.shift, 0.0);
				matrix.transform(vertex, vertex);
				vertices.push(vertex);

				elements.push(offset + 2 * i + 0, offset + 2 * i + 1);
				elements.push(offset + 2 * i + 0, offset + 2 * (i < 5 ? i + 1 : 0) + 0);
				elements.push(offset + 2 * i + 1, offset + 2 * (i < 5 ? i + 1 : 0) + 1);
			}
		}
		// </wire>
	}
};


