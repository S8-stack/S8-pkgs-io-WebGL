
/**
 * 
 */
function CAD2d_Point(position = new MathVector2()){
	this.position = position;
}


CAD2d_Point.prototype = {


		extrude : function(affine, z0, z1, wire){

			// vertices
			var vertices = wire.vertices;
			var offset = vertices.length();
			var normals = wire.normals;
			var vertex, normal;

			// vertex 0
			var vertex0 = new MathVector3();
			this.position.copy(vertex0);
			vertex0.z = z0;
			affine.transformVertex(vertex0, vertex0);
			vertices.push(vertex0);

			// vertex 1
			var vertex1 = new MathVector3();
			this.position.copy(vertex1);
			vertex1.z = z1;
			affine.transformVertex(vertex1, vertex1);
			vertices.push(vertex1);

			// segment element
			var elements = wire.elements;
			elements.push(offset+0, offset+1);
		},

		revolve : function(affine3, affine2, theta0, theta1, wire, settings){

			var isFullyRevolved = Math.abs(this.theta1-this.theta0-2.0*Math.PI)<1e-6;

			var n = Math.ceil((this.theta1-this.theta0)/(2.0*Math.PI)*settings.n);
			var dTheta = (this.theta1-this.theta0)/n;
			var nbSections = isFullyRevolved?n:(n+1);

			// affine
			var invAffine2 = new MathAffine2();
			affine2.inverse(invAffine2);

			// <surface>
			var vertices = surface.vertices;
			var offset = vertices.length();
			
			var normals = surface.normals;
			var sectionAffine = new MathAffine3();
			var rotationMatrix = new MathMatrix3();
			var vertex2, vertex3;

			// sections
			var shift = settings.shift;
			for(var i=0; i<nbSections; i++){
				rotationMatrix.xRotation(theta0+i*dTheta);
				affine3.matrix.multiply(rotationMatrix, sectionAffine.matrix);

				// vertex
				invAffine2.transformVertex(this.position, vertex2);
				vertex3 = new MathVector3(vertex2.x, vertex2.y, 0.0);
				sectionAffine.transformVertex(vertex3, vertex3);
				surfaceVertices.push(vertex3);

			}

			// elements
			var elements = wire.elements;
			// sections
			for(var i=0; i<nbSections-1; i++){
				surfaceElements.push(offset+i, offset+i+1);
			}
			if(isFullyRevolved){
				// vertices
				for(var j=0; j<n-1; j++){
					surfaceElements.push(offset+this.nbSections-1, offset+0);
				}
			}			
		}
}
