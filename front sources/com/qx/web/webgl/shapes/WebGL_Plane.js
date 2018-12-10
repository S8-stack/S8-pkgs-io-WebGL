

function WebGL_Plane(){
	
	this.x0 = -0.5;
	this.x1 = 0.5;
	this.y0 = -0.5;
	this.y1 = 0.5;
	this.z = 0.0;
	this.shift = 0.0001;
	this.texCoordScale = 1.0;
}

WebGL_Plane.prototype = {

		build : function(shape){
			
			var vertices, normals, texCoords, texCoordScale, elements, offset;

			// dimensions
			var x0=this.x0, x1=this.x1, y0=this.y0, y1=this.y1, z=this.z;

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

				// vertices
				vertices.push(new MathVector3d(x0, y0, z));
				vertices.push(new MathVector3d(x1, y0, z));
				vertices.push(new MathVector3d(x1, y1, z));
				vertices.push(new MathVector3d(x0, y1, z));

				// normals
				if(isSurfaceNormalAttributeEnabled){
					normals.push(new MathVector3d(0.0, 0.0, 1.0));
					normals.push(new MathVector3d(0.0, 0.0, 1.0));
					normals.push(new MathVector3d(0.0, 0.0, 1.0));
					normals.push(new MathVector3d(0.0, 0.0, 1.0));
				}
				
				// texCoords
				if(isSurfaceTexCoordAttributeEnabled){
					texCoords.push(new MathVector2d(0.0, 0.0));
					texCoords.push(new MathVector2d((x1-x0)/texCoordScale, 0.0));
					texCoords.push(new MathVector2d((x1-x0)/texCoordScale, (y1-y0)/texCoordScale));
					texCoords.push(new MathVector2d(0.0, (y1-y0)/texCoordScale));
				}
				
				elements.push(offset+0, offset+1, offset+2);
				elements.push(offset+2 ,offset+3, offset+0);

			}
			// </surface>

			// <wire>
			if(shape.isWireEnabled){
				x0-=this.shift; x1+=this.shift;
				y0-=this.shift; y1+=this.shift;

				vertices = shape.wireVertices;
				elements = shape.wireElements;
				offset = vertices.length();

				// surface vertices
				vertices.push(new MathVector3d(x0, y0, z));
				vertices.push(new MathVector3d(x1, y0, z));
				vertices.push(new MathVector3d(x1, y1, z));
				vertices.push(new MathVector3d(x0, y1, z));

				elements.push(offset+0, offset+1);
				elements.push(offset+1, offset+2);
				elements.push(offset+2, offset+3);
				elements.push(offset+3, offset+0);
			}
			// </wire>
		}
};
