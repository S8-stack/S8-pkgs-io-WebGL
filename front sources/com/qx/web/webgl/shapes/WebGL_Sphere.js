

function WebGL_Sphere(){
	this.radius = 1.0;
	this.nPerPi = 32;
}


WebGL_Sphere.prototype = {

		build : function(shape){
			

			var vertices, normals, texCoords, texCoordScale, elements, offset, vertexAttributes;

			// <surface>
			if(shape.isSurfaceEnabled){
				
				
				// surface attributes
				var r = this.radius;
				var n = this.nPerPi;

				var surfaceAttributes = shape.surfaceAttributes;
				offset = surfaceAttributes.length;
				
				var matrix = new MathMatrix3d();
				var theta, dTheta = Math.PI/(n-1), phi, dPhi = 2.0*Math.PI/(2*n);
				var vertex, normal;
				
				var isSurfaceNormalAttributeEnabled = shape.isSurfaceNormalAttributeEnabled;
				
				for(var iTheta=0; iTheta<n; iTheta++){
					theta = iTheta*dTheta;
					for(var iPhi=0; iPhi<2*n; iPhi++){
						phi = iPhi*dPhi;
						
						vertexAttributes = new WebGL_VertexAttributes();

						// vertex
						vertex = new MathVector3d();
						vertex.spherical_radial(r, phi, theta);
						vertexAttributes.vertex = vertex;

						// normal
						if(isSurfaceNormalAttributeEnabled){
							normal = new MathVector3d();
							normal.spherical_radial(1.0, phi, theta);	
							vertexAttributes.normal = normal;
						}
					
						surfaceAttributes.push(vertexAttributes);
					}
				}
				
				// </surface-attributes>

				
				// <surface-indices>
				var indices = shape.surfaceIndices;
				var i0, i1, i2, i3;
				for(var iTheta=0; iTheta<n-1; iTheta++){
					for(var iPhi=0; iPhi<2*n-1; iPhi++){
						i0 = 2*n*iTheta+iPhi;
						i1 = 2*n*iTheta+(iPhi<(2*n-2)?iPhi+1:0);
						i2 = 2*n*(iTheta+1)+iPhi;
						i3 = 2*n*(iTheta+1)+(iPhi<(2*n-2)?iPhi+1:0);
						indices.push(i2, i3, i1);
						indices.push(i2, i0, i1);
					}
				}	
				// </surface-indices>
				
			}
			// </surface>
		}
};
