

function WebGL_Cylinder(){

	// default settings
	this.radius = 0.4;
	this.x0 = 1.0;
	this.x1 = -1.0,
	this.nPerRevolution = 32;
	this.shift = 0.0001;
	this.isStartFaceEnabled = true;
	this.isStartWireEnabled = true;
	this.isEndFaceEnabled = true
	this.isEndWireEnabled = true;
}


WebGL_Cylinder.prototype = {

		build : function(shape){
			// caching configuration
			let config = shape.configuration;
			
			var vertices, normals, texCoords, elements, offset;

			// <surface>			
			if(config.isSurfaceEnabled){
				var r = this.radius, 
				n = this.nPerRevolution, 
				x0 = this.x0, 
				x1 = this.x1, 
				shift = this.shift;

				vertices = shape.surfaceVertices;
				elements = shape.surfaceElements;
				var isSurfaceNormalAttributeEnabled = config.isSurfaceNormalAttributeEnabled;
				if(isSurfaceNormalAttributeEnabled){
					normals = shape.surfaceNormals;	
				}

				// < lateral_surface>
				offset = vertices.length();
				var theta, dTheta = 2.0*Math.PI/n;
				var vertex, normal, i0, i1, i2, i3;

				for(var i=0; i<n; i++){
					theta = i*dTheta;

					// vertex 0 
					vertex = new MathVector3d();
					vertex.x = x0;
					vertex.y = r*Math.cos(theta);
					vertex.z = r*Math.sin(theta);
					vertices.push(vertex);

					if(isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						normal.x = 0.0;
						normal.y = Math.cos(theta);
						normal.z = Math.sin(theta);
						normals.push(normal);	
					}

					// vertex 1
					vertex = new MathVector3d();
					vertex.x = x1;
					vertex.y = r*Math.cos(theta);
					vertex.z = r*Math.sin(theta);
					vertices.push(vertex);

					if(isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						normal.x = 0.0;
						normal.y = Math.cos(theta);
						normal.z = Math.sin(theta);
						normals.push(normal);	
					}

					// elements
					i0 = offset+i*2;
					i1 = offset+(i<(n-1)?i+1:0)*2+0;
					i2 = offset+i*2+1;
					i3 = offset+(i<(n-1)?i+1:0)*2+1;

					elements.push(i0, i1, i3);
					elements.push(i3, i2, i0);
				}
				// </ lateral_surface>


				// <top_surface>
				if(this.isEndFaceEnabled){
					offset = vertices.length();

					// vertex
					vertex = new MathVector3d();
					vertex.x = x1;
					vertex.y = 0.0;
					vertex.z = 0.0;
					vertices.push(vertex);

					if(isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						normal.x = 1.0;
						normal.y = 0.0;
						normal.z = 0.0;
						normals.push(normal);
					}

					for(var i=0; i<n; i++){
						theta = i*dTheta;

						// vertex
						vertex = new MathVector3d();
						vertex.x = x1;
						vertex.y = r*Math.cos(theta);
						vertex.z = r*Math.sin(theta);
						vertices.push(vertex);

						// normal
						if(isSurfaceNormalAttributeEnabled){
							normal = new MathVector3d();
							normal.x = 1.0;
							normal.y = 0.0;
							normal.z = 0.0;
							normals.push(normal);
						}

						// elements
						i0 = offset+i+1;
						i1 = offset+(i<(n-1)?i+1:0)+1;
						elements.push(offset+0, i0, i1);
					}
				}
				// </top_surface>


				// <bottom_surface>

				if(this.isStartFaceEnabled){

					offset = vertices.length();

					// vertex
					vertex = new MathVector3d();
					vertex.x = x0;
					vertex.y = 0.0;
					vertex.z = 0.0;
					vertices.push(vertex);

					// normal
					if(isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						normal.x =-1.0;
						normal.y = 0.0;
						normal.z = 0.0;
						normals.push(normal);
					}

					for(var i=0; i<n; i++){
						theta = i*dTheta;

						// vertex
						vertex = new MathVector3d();
						vertex.x = x0;
						vertex.y = r*Math.cos(theta);
						vertex.z = r*Math.sin(theta);
						vertices.push(vertex);

						// normal
						if(isSurfaceNormalAttributeEnabled){
							normal = new MathVector3d();
							normal.x =-1.0;
							normal.y = 0.0;
							normal.z = 0.0;
							normals.push(normal);
						}

						// elements
						i0 = offset+i+1;
						i1 = offset+(i<(n-1)?i+1:0)+1;
						elements.push(offset+0, i1, i0);
					}
				}
				// </bottom_surface>
			}
			// </surface>


			// <wire>
			if(config.isWireEnabled){

				r+=shift;

				vertices = shape.wireVertices;
				elements = shape.wireElements;

				// <start_wire> 
				if(this.isStartWireEnabled){
					offset = vertices.length();

					for(var i=0; i<n; i++){
						theta = i*dTheta;

						// vertex
						vertex = new MathVector3d();
						vertex.x = x0;
						vertex.y = r*Math.cos(theta);
						vertex.z = r*Math.sin(theta);
						vertices.push(vertex);

						// elements
						i0 = offset+i;
						i1 = offset+(i<(n-1)?i+1:0);
						elements.push(i0, i1);
					}
				}
				// </start_wire>

				// <end_wire> 
				if(this.isEndWireEnabled){
					offset = vertices.length();

					for(var i=0; i<n; i++){
						theta = i*dTheta;

						// vertex
						vertex = new MathVector3d();
						vertex.x = x1;
						vertex.y = r*Math.cos(theta);
						vertex.z = r*Math.sin(theta);
						vertices.push(vertex);

						// elements
						i0 = offset+i;
						i1 = offset+(i<(n-1)?i+1:0);
						elements.push(i0, i1);
					}
				}
				// </end_wire> 
			}
			// </wire>
		}
};




/**
 * 

GkPrimitives.buildRing = function(surface, d0, d1){

	var n=36, dTheta = 2.0*Math.PI/n, theta=0.0, offset=surface.vertices.length;
	var r0=d0/2.0, r1=d1/2.0;
	for(var i=0; i<n; i++){
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