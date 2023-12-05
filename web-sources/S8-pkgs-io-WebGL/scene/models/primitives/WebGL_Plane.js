


export class WebGL_Plane {

	constructor() {
		this.x0 = -0.5;
		this.x1 = 0.5;
		this.y0 = -0.5;
		this.y1 = 0.5;
		this.z = 0.0;
		this.shift = 0.0001;
		this.texCoordScale = 1.0;

	}

	build(shape) {
		// caching configuration
		let config = shape.configuration;

		let vertexAttributes, vertex, normal, texCoord, texCoordScale, elements, offset, indices;

		// dimensions
		let x0 = this.x0, x1 = this.x1, y0 = this.y0, y1 = this.y1, z = this.z;

		// <surface>
		if (config.isSurfaceEnabled) {

			// <surface-attributes>
			let surfaceAttributes = shape.surfaceAttributes;
			offset = surfaceAttributes.length();

			let isSurfaceNormalAttributeEnabled = config.isSurfaceNormalAttributeEnabled;
			let isSurfaceTexCoordAttributeEnabled = config.isSurfaceTexCoordAttributeEnabled;

			if (isSurfaceTexCoordAttributeEnabled) {
				texCoordScale = this.texCoordScale;
			}

			// v0
			let va0 = new WebGL_VertexAttributes();
			let va1 = new WebGL_VertexAttributes();
			let va2 = new WebGL_VertexAttributes();
			let va3 = new WebGL_VertexAttributes();

			va0.vertex = new MathVector3d(x0, y0, z);
			va1.vertex = new MathVector3d(x1, y0, z);
			va1.vertex = new MathVector3d(x1, y1, z);
			va1.vertex = new MathVector3d(x0, y1, z);

			// normals
			if (isSurfaceNormalAttributeEnabled) {
				va0.normal = new MathVector3d(0.0, 0.0, 1.0);
				va1.normal = new MathVector3d(0.0, 0.0, 1.0);
				va2.normal = new MathVector3d(0.0, 0.0, 1.0);
				va3.normal = new MathVector3d(0.0, 0.0, 1.0);
			}

			// texCoords
			if (isSurfaceTexCoordAttributeEnabled) {
				va0.texCoord = new MathVector2d(0.0, 0.0);
				va1.texCoord = new MathVector2d((x1 - x0) / texCoordScale, 0.0);
				va2.texCoord = new MathVector2d((x1 - x0) / texCoordScale, (y1 - y0) / texCoordScale);
				va3.texCoord = new MathVector2d(0.0, (y1 - y0) / texCoordScale);
			}

			surfaceAttributes.push(va0, va1, va2, va3);

			// </surface-attributes>

			indices = shape.surfaceIndices;
			indices.push(offset + 0, offset + 1, offset + 2);
			indices.push(offset + 2, offset + 3, offset + 0);

		}
		// </surface>

		// <wire>
		if (config.isWireEnabled) {
			x0 -= this.shift; x1 += this.shift;
			y0 -= this.shift; y1 += this.shift;

			let wireAttributes = shape.wireAttributes;
			offset = wireAttributes.length();

			// surface vertices
			wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(x0, y0, z)));
			wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(x1, y0, z)));
			wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(x1, y1, z)));
			wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(x0, y1, z)));

			indices = shape.wireIndices;
			indices.push(offset + 0, offset + 1);
			indices.push(offset + 1, offset + 2);
			indices.push(offset + 2, offset + 3);
			indices.push(offset + 3, offset + 0);

		}
		// </wire>
	}
};
