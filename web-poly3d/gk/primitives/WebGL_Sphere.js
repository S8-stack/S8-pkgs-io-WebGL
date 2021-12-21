


export class WebGL_Sphere {


	constructor() {
		this.radius = 1.0;
		this.nPerPi = 32;
	}

	build(shape) {

		let vertices, normals, texCoords, texCoordScale, elements, offset, vertexAttributes;

		// <surface>
		if (shape.isSurfaceEnabled) {


			// surface attributes
			let r = this.radius;
			let n = this.nPerPi;

			let surfaceAttributes = shape.surfaceAttributes;
			offset = surfaceAttributes.length;

			let matrix = new MathMatrix3d();
			let theta, dTheta = Math.PI / (n - 1), phi, dPhi = 2.0 * Math.PI / (2 * n);
			let vertex, normal;

			let isSurfaceNormalAttributeEnabled = shape.isSurfaceNormalAttributeEnabled;

			for (let iTheta = 0; iTheta < n; iTheta++) {
				theta = iTheta * dTheta;
				for (let iPhi = 0; iPhi < 2 * n; iPhi++) {
					phi = iPhi * dPhi;

					vertexAttributes = new WebGL_VertexAttributes();

					// vertex
					vertex = new MathVector3d();
					vertex.spherical_radial(r, phi, theta);
					vertexAttributes.vertex = vertex;

					// normal
					if (isSurfaceNormalAttributeEnabled) {
						normal = new MathVector3d();
						normal.spherical_radial(1.0, phi, theta);
						vertexAttributes.normal = normal;
					}

					surfaceAttributes.push(vertexAttributes);
				}
			}

			// </surface-attributes>


			// <surface-indices>
			let indices = shape.surfaceIndices;
			let i0, i1, i2, i3;
			for (let iTheta = 0; iTheta < n - 1; iTheta++) {
				for (let iPhi = 0; iPhi < 2 * n - 1; iPhi++) {
					i0 = 2 * n * iTheta + iPhi;
					i1 = 2 * n * iTheta + (iPhi < (2 * n - 2) ? iPhi + 1 : 0);
					i2 = 2 * n * (iTheta + 1) + iPhi;
					i3 = 2 * n * (iTheta + 1) + (iPhi < (2 * n - 2) ? iPhi + 1 : 0);
					indices.push(i2, i3, i1);
					indices.push(i2, i0, i1);
				}
			}
			// </surface-indices>

		}
		// </surface>
	}
}
