
/**
 * 
 */


function WebGL_Hexahedron(){
	this.ax = 1.0;
	this.ay = 1.0;
	this.az = 1.0;
	this.shift = 0.001;
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

				var surfaceAttributes = shape.surfaceAttributes;
				offset = surfaceAttributes.length;

				var isSurfaceNormalAttributeEnabled = shape.isSurfaceNormalAttributeEnabled;
				
				
				var isSurfaceTexCoordAttributeEnabled = shape.isSurfaceTexCoordAttributeEnabled;
				if(isSurfaceTexCoordAttributeEnabled){
					texCoordScale = this.texCoordScale;
				}
				indices = shape.surfaceIndices;

				var va0, va1, va2, va3;
				
				// face ax+
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);
				
				// vertices
				va0.vertex = new MathVector3d( ax,-ay,-az);
				va1.vertex = new MathVector3d( ax, ay,-az);
				va2.vertex = new MathVector3d( ax, ay, az);
				va3.vertex = new MathVector3d( ax,-ay, az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d( 1.0, 0.0, 0.0);
					va1.normal = new MathVector3d( 1.0, 0.0, 0.0);
					va2.normal = new MathVector3d( 1.0, 0.0, 0.0);
					va3.normal = new MathVector3d( 1.0, 0.0, 0.0);		
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ay/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ay/texCoordScale, 2*az/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*az/texCoordScale);
				}

				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ax-
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);

				// vertices
				va0.vertex = new MathVector3d(-ax, ay,-az);
				va1.vertex = new MathVector3d(-ax,-ay,-az);
				va2.vertex = new MathVector3d(-ax,-ay, az);
				va3.vertex = new MathVector3d(-ax, ay, az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d(-1.0, 0.0, 0.0);
					va1.normal = new MathVector3d(-1.0, 0.0, 0.0);
					va2.normal = new MathVector3d(-1.0, 0.0, 0.0);
					va3.normal = new MathVector3d(-1.0, 0.0, 0.0);
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ay/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ay/texCoordScale, 2*az/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*az/texCoordScale);
				}

				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ay+
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);

				// vertices
				va0.vertex = new MathVector3d(-ax, ay,-az);
				va1.vertex = new MathVector3d( ax, ay,-az);
				va2.vertex = new MathVector3d( ax, ay, az);
				va3.vertex = new MathVector3d(-ax, ay, az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d( 0.0, 1.0, 0.0);
					va1.normal = new MathVector3d( 0.0, 1.0, 0.0);
					va2.normal = new MathVector3d( 0.0, 1.0, 0.0);
					va3.normal = new MathVector3d( 0.0, 1.0, 0.0);
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ax/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ax/texCoordScale, 2*az/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*az/texCoordScale);
				}

				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face ay-
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);
				
				// vertices
				va0.vertex = new MathVector3d(-ax,-ay,-az);
				va1.vertex = new MathVector3d( ax,-ay,-az);
				va2.vertex = new MathVector3d( ax,-ay, az);
				va3.vertex = new MathVector3d(-ax,-ay, az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d( 0.0,-1.0, 0.0);
					va1.normal = new MathVector3d( 0.0,-1.0, 0.0);
					va2.normal = new MathVector3d( 0.0,-1.0, 0.0);
					va3.normal = new MathVector3d( 0.0,-1.0, 0.0);
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ax/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ax/texCoordScale, 2*az/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*az/texCoordScale);
				}

				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face az+
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);
				
				// vertices
				va0.vertex = new MathVector3d(-ax,-ay, az);
				va1.vertex = new MathVector3d( ax,-ay, az);
				va2.vertex = new MathVector3d( ax, ay, az);
				va3.vertex = new MathVector3d(-ax, ay, az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d( 0.0, 0.0, 1.0);
					va1.normal = new MathVector3d( 0.0, 0.0, 1.0);
					va2.normal = new MathVector3d( 0.0, 0.0, 1.0);
					va3.normal = new MathVector3d( 0.0, 0.0, 1.0);
				}
				
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ax/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ax/texCoordScale, 2*ay/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*ay/texCoordScale);
				}
				
				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;

				// face az-
				va0 = new WebGL_VertexAttributes();
				va1 = new WebGL_VertexAttributes();
				va2 = new WebGL_VertexAttributes();
				va3 = new WebGL_VertexAttributes();
				surfaceAttributes.push(va0, va1, va2, va3);
				
				// vertices
				va0.vertex = new MathVector3d(-ax,-ay,-az);
				va1.vertex = new MathVector3d(-ax, ay,-az);
				va2.vertex = new MathVector3d( ax, ay,-az);
				va3.vertex = new MathVector3d( ax,-ay,-az);

				// normals
				if(isSurfaceNormalAttributeEnabled){
					va0.normal = new MathVector3d( 0.0, 0.0,-1.0);
					va1.normal = new MathVector3d( 0.0, 0.0,-1.0);
					va2.normal = new MathVector3d( 0.0, 0.0,-1.0);
					va3.normal = new MathVector3d( 0.0, 0.0,-1.0);
				}
				// tex coords
				if(isSurfaceTexCoordAttributeEnabled){
					va0.texCoord = new MathVector2d(0.0, 0.0);
					va1.texCoord = new MathVector2d(2*ax/texCoordScale, 0.0);
					va2.texCoord = new MathVector2d(2*ax/texCoordScale, 2*ay/texCoordScale);
					va3.texCoord = new MathVector2d(0.0, 2*ay/texCoordScale);
				}
				
				indices.push(offset+0, offset+1, offset+2);
				indices.push(offset+2 ,offset+3, offset+0);
				offset+=4;
			}
			// </surface>

			// <wire>
			if(shape.isWireEnabled){
				ax+=this.shift;
				ay+=this.shift;
				az+=this.shift;

				var wireAttributes = shape.wireAttributes;
				indices = shape.wireIndices;
				offset = wireAttributes.length;

				// surface vertices
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(-ax,-ay,-az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d( ax,-ay,-az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d( ax, ay,-az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(-ax, ay,-az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(-ax,-ay, az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d( ax,-ay, az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d( ax, ay, az)));
				wireAttributes.push(new WebGL_VertexAttributes(new MathVector3d(-ax, ay, az)));

				indices.push(offset+0, offset+1);
				indices.push(offset+1, offset+2);
				indices.push(offset+2, offset+3);
				indices.push(offset+3, offset+0);

				indices.push(offset+4, offset+5);
				indices.push(offset+5, offset+6);
				indices.push(offset+6, offset+7);
				indices.push(offset+7, offset+4);

				indices.push(offset+0, offset+4);
				indices.push(offset+1, offset+5);
				indices.push(offset+2, offset+6);
				indices.push(offset+3, offset+7);	
			}
			// </wire>
		}
};


