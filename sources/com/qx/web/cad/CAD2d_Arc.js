
/**
 * 
 */
function CAD2d_Arc(affine, r, theta0=0.0, theta1=2.0*Math.PI){
	this.affine = affine;
	this.r = r;
	this.theta0 = theta0;
	this.theta1 = theta1;
	this.isTesselated = false;
}


CAD2d_Arc.prototype = {

		evaluateVertex : function(theta, result){
			result.radial(this.r, theta);
			this.affine.transformVertex(result, result);
		},

		evaluateNormal : function(theta, result){
			result.radial(1.0, theta);
			this.affine.transformVector(result, result);
		},

		evaluateAffine : function(theta, result){
			result.vector.radial(this.r, theta);
			this.affine.transformVertex(result.vector, result.vector);
			var rotationMatrix = new MathMatrix2();
			rotationMatrix.rotation(theta+Math.PI/2.0);
			affine.matrix.multiply(rotationMatrix, result.matrix);
		},

		startPoint : function(result){
			this.evaluateVertex(this.theta0, result);
		},

		endPoint : function(result){
			this.evaluateVertex(this.theta1, result);
		},

		tesselate : function(settings){
			if(!this.isTesselated){
				this.isClosed = Math.abs(this.theta1-this.theta0-2.0*Math.PI)<1e-6;

				var n = Math.ceil((this.theta1-this.theta0)/(2.0*Math.PI)*settings.n);
				var dTheta = (this.theta1-this.theta0)/n;
				this.nbVertices=this.isClosed?n:(n+1);

				this.vertices = new Array(this.nbVertices);
				this.normals = new Array(this.nbVertices);

				var vertex, normal;
				for(var i=0; i<this.nbVertices; i++){
					theta = this.theta0+i*dTheta;

					// vertex
					vertex = new MathVector2();
					this.evaluateVertex(theta, vertex);
					this.vertices[i]=vertex;

					// normal
					normal = new MathVector2();
					this.evaluateNormal(theta, normal);
					this.normals[i]=normal;
				}
				this.isTesselated = true;
			}
		},


		draw : function(affine, wire, settings){

			this.tesselate(settings);

			// vertices
			var vertices = wire.vertices;
			var offset = vertices.getNumberOfVectors();
			var vertex;
			var shift = settings.shift;
			vertices.expand(this.nbVertices);
			for(var i=0; i<this.nbVertices; i++){
				vertex = new MathVector3();
				this.vertices[i].integrate(this.normals[i], shift, vertex);
				affine.transformVertex(vertex, vertex);
				vertices.push(vertex);
			}

			// elements
			var elements = wire.elements;
			elements.expand(this.isClosed?this.nbVertices:this.nbVertices-1);
			for(var i=0; i<this.nbVertices-1; i++){
				elements.push(offset+i, offset+(i+1));
			}
			if(this.isClosed){
				elements.push(offset+this.nbVertices-1, offset+0);
			}
		},


		extrude : function(affine, z0, z1, surface, wire, settings, isEndEnabled){

			this.tesselate(settings);

			// <surface>

			// vertices
			var vertices = surface.vertices;
			var offset = vertices.length();
			var normals = surface.normals;
			var vertex, normal;
			for(var i=0; i<this.nbVertices; i++){

				// vertex 0
				vertex = new MathVector3();
				this.vertices[i].copy(vertex); // copy only x, y
				vertex.z = z0;
				affine.transformVertex(vertex, vertex);
				vertices.push(vertex);

				// normal 0
				normal = new MathVector3();
				this.normals[i].copy(normal); // copy only x, y
				affine.transformVector(normal, normal);
				normals.push(normal);

				// vertex 1
				vertex = new MathVector3();
				this.vertices[i].copy(vertex); // copy only x, y
				vertex.z = z1;
				affine.transformVertex(vertex, vertex);
				vertices.push(vertex);

				// normal 1
				normal = new MathVector3();
				this.normals[i].copy(normal); // copy only x, y
				affine.transformVector(normal, normal);
				normals.push(normal);
			}


			var elements = surface.elements;
			for(var i=0; i<this.nbVertices; i++){
				elements.push(offset+2*i, offset+2*i+2, offset+2*i+1);
				elements.push(offset+2*i+2, offset+2*i+3, offset+2*i+1);
			}


			// </surface>

			// <wire>

			var shift = settings.shift;

			// <start-wire>
			var point0 = new CAD2d_Point();
			this.vertices[0].integrate(this.normals[0], shift, point0.position);
			point0.extrude(affine, z0, z1, wire);
			// </start-wire>

			// <end-wire>
			if(!this.isClosed && this.isEndEnabled){
				var point1 = new CAD2d_Point();
				var p = this.nbVertices-1;
				this.vertices[p].integrate(this.normals[p], shift, point1.position);
				point1.extrude(affine, z0, z1, wire);
			}
			// </end-wire>
			// </wire>
		},

		revolve : function(affine3, affine2, theta0, theta1, surface, wire, settings){


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
			var vertex2, normal2, vertex3, normal3;

			// sections
			for(var i=0; i<nbSections; i++){
				rotationMatrix.xRotation(theta0+i*dTheta);
				affine3.matrix.multiply(rotationMatrix, sectionAffine.matrix);

				// vertices
				for(var j=0; j<this.nbVertices; j++){

					// vertex
					invAffine2.transformVertex(this.vertices[j], vertex2);
					vertex3 = new MathVector3(vertex2.x, vertex2.y, 0.0);
					sectionAffine.transformVertex(vertex3, vertex3);
					vertices.push(vertex3);

					// normal
					invAffine2.transformVector(this.normals[j], normal2);
					normal3 = new MathVector3(normal2.x, normal2.y, 0.0);
					sectionAffine.transformVector(normal3, normal3);
					normals.push(normal3);
				}
			}

			// elements
			var elements =surface.elements;
			var n = this.nbVertices, p=nbSections;
			// sections
			for(var i=0; i<p-1; i++){
				// vertices
				for(var j=0; j<n-1; j++){
					elements.push(offset+i*n+j+0, offset+i*n+j+1, offset+(i+1)*n+j);
					elements.push(offset+i*n+j+1, offset+(i+1)*n+j+1, offset+(i+1)*n+j);
				}
			}
			if(isFullyRevolved){
				// vertices
				for(var j=0; j<n-1; j++){
					elements.push(offset+(p-1)*n+j+0, offset+(p-1)*n+j+1, offset+0*n+j);
					elements.push(offset+(p-1)*n+j+1, offset+0*n+j+1, offset+0*n+j);
				}
			}
			// </surface>
		
			// <wire>
			if(!this.isClosed){
				var shift = settings.shift;

				// <start-wire>
				var point0 = new CAD2d_Point();
				this.vertices[0].integrate(affine3, affine2, wire, settings, theta0, theta1);
				point0.revolve(affine3, affine2, theta0, theta1, wire, settings);
				// </start-wire>

				// <end-wire>
				if(!this.isClosed && this.isEndEnabled){
					var point1 = new CAD2d_Point();
					var p = this.nbVertices-1;
					this.vertices[p].integrate(this.normals[p], shift, point1.position);
					point1.revolve(affine3, affine2, theta0, theta1, wire, settings);
				}
				// </end-wire>	
			}
			
			// </wire>
		}

};
