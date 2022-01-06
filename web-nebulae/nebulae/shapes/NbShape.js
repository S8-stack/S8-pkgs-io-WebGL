import { NbMeshProperties } from "../meshes/NbMesh";
import { WebGL_Mesh } from "../webgl/meshes/WebGL_Mesh";





export class NbShape {

	constructor(props = new NbMeshProperties(), attributes = new Array(), indices = new Array()) {

		/** Shape configuration */
		this.props = props;

		// attributes
		this.attributes = attributes;

		// indices
		this.indices = indices;
	}

	/*
	 * Using same verticeAttirbutes two times: in source and detination
	 */
	append(right, affine = null) {
		/* <attributes> */
		let attributes = this.attributes,
			rightAttributes = right.attributes,
			offset = this.attributes.length,
			n = right.attributes.length;

		if (affine) {
			for (let i = 0; i < n; i++) {
				attributes.push(affine.transform(this.props, rightAttributes[i]));
			}
		}
		else {
			for (let i = 0; i < n; i++) {
				this.attributes.push(right.attributes[i]);
			}
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


	transform(affine = null) {

		/* <attributes> */
		let targetAttributes = new Array();

		// caching shape configuration flags
		let n = this.attributes.length;
		if (affine) {
			for (var i = 0; i < n; i++) {
				targetAttributes.push(this.attributes[i].transform(this.props, affine));
			}
		}
		else{
			for (var i = 0; i < n; i++) {
				targetAttributes.push(this.attributes[i]);
			}
		}

		/* </attributes> */

		/* <surface-elements> */
		let targetIndices = new Array();
		for (let index of this.indices) { targetIndices.push(index); }
		/* <surface-elements> */

		return new NbShape(this.props.copy(), targetAttributes, targetIndices);
	}


	appendPattern(mesh, affines) {
		for (let affine of affines) { this.append(mesh, affine); }
	}


	toWebGLBuffer(modelMatrix,) {
		return new WebGL_Mesh(this.props, this.attributes, this.indices);
	}
}


/**
 * 
 * @type {NbShapeVertexAttributes} is IMMUTABLE
 */
export class NbShapeVertexAttributes {

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


	transform(props, affine) {
		let targetVertexAttributes = new NbShapeVertexAttributes();

		/* <vertex> */
		if (props.isVertexAttributeEnabled) {
			targetVertexAttributes.vertex = affine.transformPoint(this.vertex);
		}
		/* </vertex> */

		/* <normal> */
		if (props.isNormalAttributeEnabled) {
			targetVertexAttributes.normal = affine.transformVector(this.normal);
		}
		/* </normal> */

		/* <u-tangent> */
		if (props.isUTangentAttributeEnabled) {
			// u-tangent
			targetVertexAttributes.uTangent = affine.transformVector(this.uTangent);
		}
		/* <u-tangent> */

		/* <v-tangent> */
		if (props.isVTangentAttributeEnabled) {
			// v-tangent
			targetVertexAttributes.vTangent = affine.transformVector(this.vTangent);
		}
		/* </v-tangent> */

		/* <texCoord> */
		if (props.isTexCoordAttributeEnabled) {
			targetVertexAttributes.texCoord = this.texCoord;
		}
		/* </texCoord> */

		/* <color> */
		if (props.isColorAttributeEnabled) {
			targetVertexAttributes.color = this.color;
		}
		/* </color> */

		return targetAttributes;
	}



}