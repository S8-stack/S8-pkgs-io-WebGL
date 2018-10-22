
/**
 * 
 */
function CAD2d_Segment(){
	this.isTesselated = false;
}


CAD2d_Segment.prototype = {

		isClosed : false,
		
		nbVertices : 2,

		set : function(/*MathVector2*/ point, /*MathVector2*/ vector, u0, u1){
			this.point = point;
			this.vector = vector;
			this.u0 = u0;
			this.u1 = u1;
		},


		setPoints : function(point0, point1){
			this.vector = new MathVector2();
			this.point = point0;
			point1.substract(point0, this.vector);
			this.u0 = 0.0;
			this.u1 = this.vector.length();
			this.vector.normalize(this.vector);
		},		

		length : function(){
			return this.u1 - this.u0;
		},

		evaluateVertex : function(u, result){
			this.point.integrate(this.vector, u, result);
		},

		evaluateNormal : function(u, result){
			this.vector.orthogonal(false, result);
		},

		evaluateAffine : function(u, result){
			this.point.integrate(this.vector, u, result.vector);
			result.matrix.setOrthoX(this.vector);
		},

		startPoint : function(result){
			this.point.integrate(this.vector, this.u0, result);
		},

		endPoint : function(result){
			this.point.integrate(this.vector, this.u1, result);
		},

		tesselate : function(){
			if(!this.isTesselated){

				// vertex 0
				var vertex0 = new MathVector3();
				this.evaluateVertex(this.u0, vertex0);

				// normal 0
				var normal0 = new MathVector3();
				this.evaluateNormal(this.u0, normal0);

				// vertex 1
				var vertex1 = new MathVector3();
				this.evaluateVertex(this.u1, vertex1);

				// normal 1
				var normal1 = new MathVector3();
				this.evaluateNormal(this.u1, normal1);

				this.vertices = [vertex0, vertex1];

				this.normals = [normal0, normal1];
				
				this.isTesselated = true;
			}
		},


		draw : function(affine, wire, settings){
			this.tesselate();
			var offset = wire.vertices.getNumberOfVectors();

			var shift = settings.shift;

			wire.vertices.expand(2);
			
			// vertex 0
			var vertex0 = new MathVector3();
			this.vertices[0].integrate(this.normals[0], shift, vertex0);
			affine.transformVertex(vertex0, vertex0);
			wire.vertices.push(vertex0);

			// vertex 1
			var vertex1 = new MathVector3();
			this.vertices[1].integrate(this.normals[1], shift, vertex1);
			affine.transformVertex(vertex1, vertex1);
			wire.vertices.push(vertex1);

			// element
			wire.elements.expand(1);
			wire.elements.push(offset+0, offset+1);
		},

		extrude : function(affine, z0, z1, surface, wire, settings, isEndEnabled){
			this.tesselate();


			// <surface>

			// vertices
			var vertices = surface.vertices;
			var offset = vertices.length();
			var normals = surface.normals;
			var vertex, normal;

			var vertex, normal;

			// vertex 0
			vertex = new MathVector3();
			this.vertex0.copy(vertex); // copy only x, y
			vertex.z = z0;
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);

			// normal 0
			normal = new MathVector3();
			this.normal0.copy(normal); // copy only x, y
			affine.transformVector(normal, normal);
			normals.push(normal);

			// vertex 1
			vertex = new MathVector3();
			this.vertex1.copy(vertex); // copy only x, y
			vertex.z = z0;
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);

			// normal 1
			normal = new MathVector3();
			this.normal1.copy(normal); // copy only x, y
			affine.transformVector(normal, normal);
			normals.push(normal);

			// vertex 2
			vertex = new MathVector3();
			this.vertex0.copy(vertex); // copy only x, y
			vertex.z = z1;
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);

			// normal 2
			normal = new MathVector3();
			this.normal0.copy(normal); // copy only x, y
			affine.transformVector(normal, normal);
			normals.push(normal);

			// vertex 3
			vertex = new MathVector3();
			this.vertex1.copy(vertex); // copy only x, y
			vertex.z = z1;
			affine.transformVertex(vertex, vertex);
			vertices.push(vertex);

			// normal 3
			normal = new MathVector3();
			this.normal1.copy(normal); // copy only x, y
			affine.transformVector(normal, normal);
			normals.push(normal);

			var elements = surface.elements;
			elements.push(offset+0, offset+2, offset+1);
			elements.push(offset+2, offset+3, offset+1);

			// </surface>



			// <wire>

			var shift = settings.shift;

			// <start-wire>
			var point0 = new CAD2d_Point();
			this.vertex0.integrate(this.normal0, shift, point0.position);
			point0.extrude(affine, z0, z1, wire);
			// </start-wire>

			// <end-wire>
			if(this.isEndEnabled){
				var point1 = new CAD2d_Point();
				this.vertex1.integrate(this.normal1, shift, point1.position);
				point1.extrude(affine, z0, z1, wire);
			}
			// </end-wire>
			// </wire>

		}
};
