import { GkMesh, GkVertexAttributes } from "../GkMesh";



/**
 * 
 */
export class GkCylinder {

	constructor() {
		// default settings
		this.radius = 0.4;
		this.x0 = 1.0;
		this.x1 = -1.0,
			this.nPerRevolution = 32;
		this.shift = 0.0001;
		this.isEndFaceEnabled = true
		this.isEndWireEnabled = true;
	}

	buildSurface(props) {
		// caching configuration

		let vertices, normals, texCoords, elements, offset;

		let r = this.radius,
			n = this.nPerRevolution,
			x0 = this.x0,
			x1 = this.x1,
			shift = this.shift;

		let vertexAttributes;

		let mesh = new GkMesh(props), attributes = mesh.attributes, indices = mesh.indices;

		let isVertexAttributeEnabled = props.isVertexAttributeEnabled;
		let isNormalAttributeEnabled = props.isNormalAttributeEnabled;
		if (this.props.isTexCoordAttributeEnabled) { throw "Unsupported settings"; }


		// < lateral_surface>
		offset = vertices.length();

		let theta, dTheta = 2.0 * Math.PI / n;
		let i0, i1, i2, i3;

		let vertexAttributes;

		for (let i = 0; i < n; i++) {
			theta = i * dTheta;

			// vertex 0 
			vertexAttributes = new GkVertexAttributes();
			if (isVertexAttributeEnabled) {
				vertexAttributes.vertex = new MathVector3d(x0, r * Math.cos(theta), r * Math.sin(theta));
			}
			if (isNormalAttributeEnabled) {
				vertexAttributes.normal = new MathVector3d(0.0, Math.cos(theta), Math.sin(theta));
			}
			attributes.push(vertexAttributes);

			// vertex 1
			vertexAttributes = new GkVertexAttributes();
			if (isVertexAttributeEnabled) {
				vertexAttributes.vertex = new MathVector3d(x1, r * Math.cos(theta), r * Math.sin(theta));
			}
			if (isNormalAttributeEnabled) {
				vertexAttributes.normal = new MathVector3d(0.0, Math.cos(theta), Math.sin(theta));
			}
			attributes.push(vertexAttributes);

			// elements
			i0 = offset + i * 2;
			i1 = offset + (i < (n - 1) ? i + 1 : 0) * 2 + 0;
			i2 = offset + i * 2 + 1;
			i3 = offset + (i < (n - 1) ? i + 1 : 0) * 2 + 1;

			indices.push(i0, i1, i3);
			indices.push(i3, i2, i0);
		}
		// </ lateral_surface>


		// <top_surface>
		if (this.isEndFaceEnabled) {
			offset = vertices.length();


			// vertex
			vertexAttributes = new GkVertexAttributes();
			if (isVertexAttributeEnabled) {
				vertexAttributes.vertex = new MathVector3d(x1, 0.0, 0.0);
			}
			if (isNormalAttributeEnabled) {
				vertexAttributes.normal = new MathVector3d(1.0, 0.0, 0.0);
			}
			attributes.push(vertexAttributes);


			for (let i = 0; i < n; i++) {
				theta = i * dTheta;

				vertexAttributes = new GkVertexAttributes();
				if (isVertexAttributeEnabled) {
					vertexAttributes.vertex = new MathVector3d(x1, r * Math.cos(theta), r * Math.sin(theta));
				}
				if (isNormalAttributeEnabled) {
					vertexAttributes.normal = new MathVector3d(1.0, 0.0, 0.0);
				}
				attributes.push(vertexAttributes);

				// elements
				i0 = offset + i + 1;
				i1 = offset + (i < (n - 1) ? i + 1 : 0) + 1;
				indices.push(offset + 0, i0, i1);
			}
		}
		// </top_surface>


		// <bottom_surface>

		if (this.isStartFaceEnabled) {

			offset = vertices.length();

			// vertex
			vertexAttributes = new GkVertexAttributes();
			if (isVertexAttributeEnabled) {
				vertexAttributes.vertex = new MathVector3d(x0, 0.0, 0.0);
			}
			if (isNormalAttributeEnabled) {
				vertexAttributes.normal = new MathVector3d(-1.0, 0.0, 0.0);
			}
			attributes.push(vertexAttributes);


			for (let i = 0; i < n; i++) {
				theta = i * dTheta;

				vertexAttributes = new GkVertexAttributes();
				if (isVertexAttributeEnabled) {
					vertexAttributes.vertex = new MathVector3d(x0, r * Math.cos(theta), r * Math.sin(theta));
				}
				if (isNormalAttributeEnabled) {
					vertexAttributes.normal = new MathVector3d(-1.0, 0.0, 0.0);
				}
				attributes.push(vertexAttributes);


				// elements
				i0 = offset + i + 1;
				i1 = offset + (i < (n - 1) ? i + 1 : 0) + 1;
				indices.push(offset + 0, i1, i0);
			}
		}
		// </bottom_surface>
	}


	buildWire(props) {

		let mesh = new GkMesh(props), attributes = mesh.attributes, indices = mesh.indices;

		let r = this.radius,
			n = this.nPerRevolution,
			x0 = this.x0, x1 = this.x1,
			shift = this.shift;

		r += shift;
		let vertexAttributes;

		// <start_wire> 
		if (this.isStartFaceEnabled) {
			offset = vertices.length();

			for (let i = 0; i < n; i++) {
				theta = i * dTheta;

				// vertex
				vertexAttributes = new GkVertexAttributes();
				vertexAttributes.vertex = new MathVector3d(x0, r * Math.cos(theta), r * Math.sin(theta));
				attributes.push(vertexAttributes);

				// elements
				i0 = offset + i;
				i1 = offset + (i < (n - 1) ? i + 1 : 0);
				indices.push(i0, i1);
			}
		}
		// </start_wire>

		// <end_wire> 
		if (this.isEndFaceEnabled) {
			offset = vertices.length();

			for (let i = 0; i < n; i++) {
				theta = i * dTheta;

				// vertex
				vertexAttributes = new GkVertexAttributes();
				vertexAttributes.vertex = new MathVector3d(x1, r * Math.cos(theta), r * Math.sin(theta));
				attributes.push(vertexAttributes);

				// elements
				i0 = offset + i;
				i1 = offset + (i < (n - 1) ? i + 1 : 0);
				indices.push(i0, i1);
			}
		}
		// </end_wire> 
	}

};




/**
 *

GkPrimitives.buildRing = function(surface, d0, d1){

	let n=36, dTheta = 2.0*Math.PI/n, theta=0.0, offset=surface.vertices.length;
	let r0=d0/2.0, r1=d1/2.0;
	for(let i=0; i<n; i++){
		surface.pushVertex(new MathVector3d(0.0, r0*Math.cos(theta), r0*Math.sin(theta)));
		surface.pushNormal(new MathVector3d(1.0, 0.0, 0.0));
		surface.pushVertex(new MathVector3d(0.0, r1*Math.cos(theta), r1*Math.sin(theta)));
		surface.pushNormal(new MathVector3d(1.0, 0.0, 0.0));
		theta+=dTheta;
		if(i<n-1){
			surface.pushTriangle(offset+2*i+0, offset+2*i+1, offset+2*(i+1)+1);
			surface.pushTriangle(offset+2*(i+1)+1, offset+2*(i+1), offset+2*i+0);
		}
		else{
			surface.pushTriangle(offset+2*(n-1)+0, offset+2*(n-1)+1, offset+1);
			surface.pushTriangle(offset+1, offset+0, offset+2*(n-1)+0);
		}
	}
};
 */