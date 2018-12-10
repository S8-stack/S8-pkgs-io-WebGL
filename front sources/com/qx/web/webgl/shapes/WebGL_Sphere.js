

function WebGL_Sphere(){
	this.radius = 1.0;
	this.nPerPi = 32;
}


WebGL_Sphere.prototype = {

		build : function(shape){
			

			var vertices, normals, texCoords, texCoordScale, elements, offset;

			// <surface>
			if(shape.isSurfaceEnabled){
				var r = this.radius;
				var n = this.nPerPi;

				vertices = shape.surfaceVertices;
				normals = shape.surfaceNormals;
				elements = shape.surfaceElements;
				offset = vertices.length();

				var matrix = new MathMatrix3d();
				var theta, dTheta = Math.PI/(n-1), phi, dPhi = 2.0*Math.PI/(2*n);
				var vertex, normal;
				for(var iTheta=0; iTheta<n; iTheta++){
					theta = iTheta*dTheta;
					for(var iPhi=0; iPhi<2*n; iPhi++){
						phi = iPhi*dPhi;

						vertex = new MathVector3d();
						vertex.spherical_radial(r, phi, theta);
						vertices.push(vertex);

						normal = new MathVector3d();
						normal.spherical_radial(1.0, phi, theta);
						normals.push(normal);
					}
				}

				var i0, i1, i2, i3;
				for(var iTheta=0; iTheta<n-1; iTheta++){
					for(var iPhi=0; iPhi<2*n-1; iPhi++){
						i0 = 2*n*iTheta+iPhi;
						i1 = 2*n*iTheta+(iPhi<(2*n-2)?iPhi+1:0);
						i2 = 2*n*(iTheta+1)+iPhi;
						i3 = 2*n*(iTheta+1)+(iPhi<(2*n-2)?iPhi+1:0);
						elements.push(i2, i3, i1);
						elements.push(i2, i0, i1);
					}
				}	
			}
			// </surface>
		}
};
