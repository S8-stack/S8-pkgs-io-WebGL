import { WebGL_MeshProperties } from "../webgl/meshes/WebGL_Mesh";




export class GkMeshProperties {

	constructor() {

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
		this.isTangentsAttributeEnabled = false;

		/* </surface> */
	}

	set(code, value, bindings) {
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
}


export class GkMesh {

	constructor(props = new GkMeshProperties()) {

		/** Shape configuration */
		this.props = props;

		// attributes
		this.attributes = new Array();

		// indices
		this.indices = new Array();
	}

	/*
	 * Using same verticeAttirbutes two times: in source and detination
	 */
	append(target) {
		/* <attributes> */
		let attributes = this.attributes, targetAttributes = target.attributes;

		let offset = targetAttributes.length, n = surfaceAttributes.length;
		for (let i = 0; i < n; i++) {
			targetAttributes.push(attributes[i]);
		}
		/* </attributes> */

		/* <elements> */
		var targetIndices = target.indices;
		for (let index of this.indices) {
			targetIndices.push(offset + index);
		}
		/* <elements> */

		/* </surface> */
	}

	
	transform(affine, target) {

		/* <attributes> */
		let attributes = this.attributes, targetAttributes = target.attributes;

		// caching shape configuration flags
		let isVertexAttributeEnabled = this.props.isVertexAttributeEnabled;
		let isNormalAttributeEnabled = this.props.isNormalAttributeEnabled;
		let isTangentsAttributeEnabled = this.props.isTangentsAttributeEnabled;
		let isTexCoordAttributeEnabled = this.props.isTexCoordAttributeEnabled;
		let isColorAttributeEnabled = this.props.isColorAttributeEnabled;

		let offset = targetAttributes.length, n = surfaceAttributes.length;

		let vertexAttributes, targetVertexAttributes;
		for (var i = 0; i < n; i++) {
			vertexAttributes = attributes[i];
			targetVertexAttributes = new GkVertexAttributes();

			/* <vertex> */
			if (isVertexAttributeEnabled) {
				targetVertexAttributes.vertex = affine.transformPoint(vertexAttributes.vertex);
			}
			/* </vertex> */

			/* <normal> */
			if (isNormalAttributeEnabled) {
				targetVertexAttributes.normal = affine.transformVector(vertexAttributes.normal);
			}
			/* </normal> */

			/* <tangents> */
			if (isTangentsAttributeEnabled) {

				// u-tangent
				targetVertexAttributes.uTangent = affine.transformVector(vertexAttributes.uTangent);

				// v-tangent
				targetVertexAttributes.vTangent = affine.transformVector(vertexAttributes.vTangent);
			}
			/* </tangents> */

			/* <texCoord> */
			if (isTexCoordAttributeEnabled) {
				targetVertexAttributes.texCoord = vertexAttributes.texCoord.copy();
			}
			/* </texCoord> */

			/* <color> */
			if (isColorAttributeEnabled) {
				targetVertexAttributes.color = vertexAttributes.color.copy();
			}
			/* </color> */

			targetAttributes.push(targetVertexAttributes);
		}
		/* </attributes> */

		/* <surface-elements> */
		let targetIndices = target.indices;
		for (let index of this.indices) {
			targetIndices.push(offset + index);
		}
		/* <surface-elements> */
	}


	pattern(affines, target) {
		for (let affine of affines) {
			this.transform(affine, target);
		}
	}

}



export class GkVertexAttributes {

	constructor(vertex = null) {
		this.vertex = vertex;
	}

	static build_VN(vertex, normal) {
		let va = new WebGL_VertexAttributes();
		va.vertex = vertex;
		va.normal = normal;
		return va;
	}

	static build_aVN(affine, vertex, normal) {
		let vertexAttributes = new WebGL_VertexAttributes();
		let tVertex = new MathVector3d(); affine.transformPoint(vertex, tVertex);
		let tNormal = new MathVector3d(); affine.transformVector(normal, tNormal);
		vertexAttributes.vertex = tVertex;
		vertexAttributes.normal = tNormal;
		return vertexAttributes;
	}

	static interpolateFrom2VA(va0, va1, u, v) {

		let attributes = new WebGL_VertexAttributes();

		if (va0.vertex) {
			let vertex0 = va0.vertex, vertex1 = va1.vertex;
			attributes.vertex = new MathVector3d(
				u * vertex0.x + v * vertex1.x,
				u * vertex0.y + v * vertex1.y,
				u * vertex0.z + v * vertex1.z);
		}

		if (va0.normal) {
			let normal0 = va0.normal, normal1 = va1.normal;
			attributes.normal = new MathVector3d(
				u * normal0.x + v * normal1.x,
				u * normal0.y + v * normal1.y,
				u * normal0.z + v * normal1.z);
		}

		if (va0.texCoord) {
			let texCoord0 = va0.texCoord, texCoord1 = va1.texCoord;
			attributes.texCoord = new MathVector2d(
				u * texCoord0.x + v * texCoord1.x,
				u * texCoord0.y + v * texCoord1.y);
		}

		if (va0.color) {
			var color0 = va0.color, color1 = va1.color;
			attributes.color = new MathVector3d(
				u * color0.x + v * color1.x,
				u * color0.y + v * color1.y,
				u * color0.z + v * color1.z);
		}

		if (va0.uTangent) {
			var uTangent0 = va0.uTangent, uTangent1 = va1.uTangent;
			attributes.uTangent = new MathVector3d(
				u * uTangent0.x + v * uTangent1.x,
				u * uTangent0.y + v * uTangent1.y,
				u * uTangent0.z + v * uTangent1.z);
		}

		if (va0.vTangent) {
			var vTangent0 = va0.vTangent, vTangent1 = va1.vTangent;
			attributes.vTangent = new MathVector3d(
				u * vTangent0.x + v * vTangent1.x,
				u * vTangent0.y + v * vTangent1.y,
				u * vTangent0.z + v * vTangent1.z);
		}

		return attributes;
	}

	static interpolateFrom3VA(va0, va1, va2, u, v, w) {

		if (va0.vertex) {
			var vertex0 = va0.vertex, vertex1 = va1.vertex, vertex2 = va2.vertex;
			this.vertex = new MathVector3d(
				u * vertex0.x + v * vertex1.x + w * vertex2.x,
				u * vertex0.y + v * vertex1.y + w * vertex2.y,
				u * vertex0.z + v * vertex1.z + w * vertex2.z);
		}

		if (va0.normal) {
			var normal0 = va0.normal, normal1 = va1.normal, normal2 = va2.normal;
			this.normal = new MathVector3d(
				u * normal0.x + v * normal1.x + w * normal2.x,
				u * normal0.y + v * normal1.y + w * normal2.y,
				u * normal0.z + v * normal1.z + w * normal2.z);
		}

		if (va0.texCoord) {
			var texCoord0 = va0.texCoord, texCoord1 = va1.texCoord, texCoord2 = va2.texCoord;
			this.texCoord = new MathVector2d(
				u * texCoord0.x + v * texCoord1.x + w * texCoord2.x,
				u * texCoord0.y + v * texCoord1.y + w * texCoord2.y);
		}

		if (va0.color) {
			var color0 = va0.color, color1 = va1.color, color2 = va2.color;
			this.color = new MathVector3d(
				u * color0.x + v * color1.x + w * color2.x,
				u * color0.y + v * color1.y + w * color2.y,
				u * color0.z + v * color1.z + w * color2.z);
		}

		if (va0.uTangent) {
			var uTangent0 = va0.uTangent, uTangent1 = va1.uTangent, uTangent2 = va2.uTangent;
			this.uTangent = new MathVector3d(
				u * uTangent0.x + v * uTangent1.x + w * uTangent2.x,
				u * uTangent0.y + v * uTangent1.y + w * uTangent2.y,
				u * uTangent0.z + v * uTangent1.z + w * uTangent2.z);
		}

		if (va0.vTangent) {
			var vTangent0 = va0.vTangent, vTangent1 = va1.vTangent, vTangent2 = va2.vTangent;
			this.vTangent = new MathVector3d(
				u * vTangent0.x + v * vTangent1.x + w * vTangent2.x,
				u * vTangent0.y + v * vTangent1.y + w * vTangent2.y,
				u * vTangent0.z + v * vTangent1.z + w * vTangent2.z);
		}
	}
}