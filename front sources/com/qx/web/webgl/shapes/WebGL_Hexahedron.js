
/**
 * 
 */


function WebGL_Hexahedron(){
	this.ax = 1.0;
	this.ay = 1.0;
	this.az = 1.0;
	this.shift = 0.01;
	this.texCoordScale = 1.0;
}


WebGL_Hexahedron.prototype = {


		build : function(shape){
			

			var vertices, normals, texCoords, texCoordScale, elements, offset;

			// dimensions
			var ax = this.ax/2.0;
			var ay = this.ay/2.0;
			var az = this.az/2.0;

			// <surface>
			if(shape.isSurfaceEnabled){

				vertices = shape.surfaceVertices;

				var isSurfaceNormalAttributeEnabled = shape.isSurfaceNormalAttributeEnabled;
				if(isSurfaceNormalAttributeEnabled){
					normals = shape.surfaceNormals;	
				}
				
				var isSurfaceTexCoordAttributeEnabled = shape.isSurfaceTexCoordAttributeEnabled;
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords = shape.surfaceTexCoords;
					texCoordScale = this.texCoordScale;
				}
				elements = shape.surfaceElements;
				offset = vertices.length();

				// face ax+

				// vertices
				vertices.push(new MathVector3d( ax,-ay,-az));
				vertices.push(new MathVector3d( ax, ay,-az));
				vertices.push(new MathVector3d( ax, ay, az));
				vertices.push(new MathVector3d( ax,-ay, az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d( 1.0, 0.0, 0.0));
					normals.push(new MathVector3d( 1.0, 0.0, 0.0));
					normals.push(new MathVector3d( 1.0, 0.0, 0.0));
					normals.push(new MathVector3d( 1.0, 0.0, 0.0));		
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ay/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ay/texCoordScale, 2*az/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*az/texCoordScale));
				}

				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ax-

				// vertices
				vertices.push(new MathVector3d(-ax, ay,-az));
				vertices.push(new MathVector3d(-ax,-ay,-az));
				vertices.push(new MathVector3d(-ax,-ay, az));
				vertices.push(new MathVector3d(-ax, ay, az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d(-1.0, 0.0, 0.0));
					normals.push(new MathVector3d(-1.0, 0.0, 0.0));
					normals.push(new MathVector3d(-1.0, 0.0, 0.0));
					normals.push(new MathVector3d(-1.0, 0.0, 0.0));
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ay/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ay/texCoordScale, 2*az/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*az/texCoordScale));
				}

				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ay+

				// vertices
				vertices.push(new MathVector3d(-ax, ay,-az));
				vertices.push(new MathVector3d( ax, ay,-az));
				vertices.push(new MathVector3d( ax, ay, az));
				vertices.push(new MathVector3d(-ax, ay, az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d( 0.0, 1.0, 0.0));
					normals.push(new MathVector3d( 0.0, 1.0, 0.0));
					normals.push(new MathVector3d( 0.0, 1.0, 0.0));
					normals.push(new MathVector3d( 0.0, 1.0, 0.0));
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 2*az/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*az/texCoordScale));
				}

				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ay-

				// vertices
				vertices.push(new MathVector3d(-ax,-ay,-az));
				vertices.push(new MathVector3d( ax,-ay,-az));
				vertices.push(new MathVector3d( ax,-ay, az));
				vertices.push(new MathVector3d(-ax,-ay, az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d( 0.0,-1.0, 0.0));
					normals.push(new MathVector3d( 0.0,-1.0, 0.0));
					normals.push(new MathVector3d( 0.0,-1.0, 0.0));
					normals.push(new MathVector3d( 0.0,-1.0, 0.0));
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 2*az/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*az/texCoordScale));
				}

				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face az+

				// vertices
				vertices.push(new MathVector3d(-ax,-ay, az));
				vertices.push(new MathVector3d( ax,-ay, az));
				vertices.push(new MathVector3d( ax, ay, az));
				vertices.push(new MathVector3d(-ax, ay, az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d( 0.0, 0.0, 1.0));
					normals.push(new MathVector3d( 0.0, 0.0, 1.0));
					normals.push(new MathVector3d( 0.0, 0.0, 1.0));
					normals.push(new MathVector3d( 0.0, 0.0, 1.0));
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 2*ay/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*ay/texCoordScale));
				}
				
				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face az-

				// vertices
				vertices.push(new MathVector3d(-ax,-ay,-az));
				vertices.push(new MathVector3d(-ax, ay,-az));
				vertices.push(new MathVector3d( ax, ay,-az));
				vertices.push(new MathVector3d( ax,-ay,-az));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d( 0.0, 0.0,-1.0));
					normals.push(new MathVector3d( 0.0, 0.0,-1.0));
					normals.push(new MathVector3d( 0.0, 0.0,-1.0));
					normals.push(new MathVector3d( 0.0, 0.0,-1.0));
				}
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 0.0));
					texCoords.push(new MathVector2d(2*ax/texCoordScale, 2*ay/texCoordScale));
					texCoords.push(new MathVector2d(0.0, 2*ay/texCoordScale));
				}
				
				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);
				offset+=4;
			}
			// </surface>

			// <wire>
			if(shape.isWireEnabled){
				ax+=this.shift;
				ay+=this.shift;
				az+=this.shift;

				vertices = shape.wireVertices;
				elements = shape.wireElements;
				offset = vertices.length();

				// surface vertices
				vertices.push(new MathVector3d(-ax,-ay,-az));
				vertices.push(new MathVector3d( ax,-ay,-az));
				vertices.push(new MathVector3d( ax, ay,-az));
				vertices.push(new MathVector3d(-ax, ay,-az));
				vertices.push(new MathVector3d(-ax,-ay, az));
				vertices.push(new MathVector3d( ax,-ay, az));
				vertices.push(new MathVector3d( ax, ay, az));
				vertices.push(new MathVector3d(-ax, ay, az));

				elements.push(offset+0, offset+1);
				elements.push(offset+1, offset+2);
				elements.push(offset+2, offset+3);
				elements.push(offset+3, offset+0);

				elements.push(offset+4, offset+5);
				elements.push(offset+5, offset+6);
				elements.push(offset+6, offset+7);
				elements.push(offset+7, offset+4);

				elements.push(offset+0, offset+4);
				elements.push(offset+1, offset+5);
				elements.push(offset+2, offset+6);
				elements.push(offset+3, offset+7);	
			}
			// </wire>
		}
};


