
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_Shape(configuration = new WebGL_ShapeConfiguration()){
	// no affines

	/** Shape configuration */
	this.configuration = configuration;

}


WebGL_Shape.prototype = {

		initialize : function(){
			
			// caching configuration
			let config = this.configuration;
			
			/* <wire> */
			if(config.isWireEnabled){
				this.wireAttributes = new Array();		
				this.wireIndices = new Array();
			}
			/* </wire> */

			/* <surface> */
			if(config.isSurfaceEnabled){
				this.surfaceAttributes = new Array();
				this.surfaceIndices = new Array();
			}
			/* </surface> */
		},

		transform : function(affine, target){
			let config = this.configuration;
			
			var offset, n, vertex, color, uTangent, vTangent, normal, texCoord;
			var vertexAttributes, targetVertexAttributes;

			/* <wire> */
			if(config.isWireEnabled){

				/* <wire-attributes> */
				let wireAttributes = this.wireAttributes, targetWireAttributes = target.wireAttributes;
				let isWireColorAttributeEnabled = config.isWireColorAttributeEnabled;
				offset = targetWireAttributes.length;
				n = wireAttributes.length;
				for(var i=0; i<n; i++){
					vertexAttributes = wireAttributes[i];
					targetVertexAttributes = new WebGL_VertexAttributes();

					/* <vertex> */
					vertex = new MathVector3d();
					affine.transformPoint(vertexAttributes.vertex, vertex);
					targetVertexAttributes.vertex = vertex;
					/* </vertex> */

					/* <color> */
					if(isWireColorAttributeEnabled){
						color = new MathVector3d();
						vertexAttributes.color.copy(color);
						targetVertexAttributes.color = color;	
					}
					/* </color> */

					targetWireAttributes.push(targetVertexAttributes);
				}
				/* </wire-attributes> */

				/* <wire-elements> */
				var targetWireIndices = target.wireIndices;
				for(let index of this.wireIndices){
					targetWireIndices.push(offset+index);
				}
				/* <wire-elements> */
			}
			/* </wire> */

			/* <surface> */
			if(config.isSurfaceEnabled){

				/* <surface-attributes> */
				let surfaceAttributes = this.surfaceAttributes, 
				targetSurfaceAttributes = target.surfaceAttributes;
				
				// caching shape configuration flags
				let isSurfaceNormalAttributeEnabled = config.isSurfaceNormalAttributeEnabled,
				isSurfaceTangentAttributeEnabled = config.isSurfaceTangentAttributeEnabled,
				isSurfaceTexCoordAttributeEnabled = config.isSurfaceTexCoordAttributeEnabled,
				isSurfaceColorAttributeEnabled = config.isSurfaceColorAttributeEnabled;
				
				offset = targetSurfaceAttributes.length;
				n = surfaceAttributes.length;
				for(var i=0; i<n; i++){
					vertexAttributes = surfaceAttributes[i];
					targetVertexAttributes = new WebGL_VertexAttributes();

					/* <vertex> */
					vertex = new MathVector3d();
					affine.transformPoint(vertexAttributes.vertex, vertex);
					targetVertexAttributes.vertex = vertex;
					/* </vertex> */

					/* <normal> */
					if(isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						affine.transformVector(vertexAttributes.normal, normal);
						targetVertexAttributes.normal = normal;
					}
					/* </normal> */

					/* <tangents> */
					if(isSurfaceTangentAttributeEnabled){

						// u-tangent
						uTangent = new MathVector3d();
						affine.transformVector(vertexAttributes.uTangent, uTangent);
						targetVertexAttributes.uTangent = uTangent;

						// v-tangent
						vTangent = new MathVector3d();
						affine.transformVector(vertexAttributes.vTangent, vTangent);
						targetVertexAttributes.vTangent = vTangent;
					}
					/* </tangents> */

					/* <texCoord> */
					if(isSurfaceTexCoordAttributeEnabled){
						texCoord = new MathVector3d();
						vertexAttributes.texCoord.copy(texCoord);
						targetVertexAttributes.texCoord = texCoord;
					}
					/* </texCoord> */

					/* <color> */
					if(isSurfaceColorAttributeEnabled){
						color = new MathVector3d();
						vertexAttributes.color.copy(color);
						targetVertexAttributes.color = color;
					}
					/* </color> */	

					targetSurfaceAttributes.push(targetVertexAttributes);
				}
				/* </surface-attributes> */

				/* <surface-elements> */
				var targetSurfaceIndices = target.surfaceIndices;
				for(let index of this.surfaceIndices){
					targetSurfaceIndices.push(offset+index);
				}
				/* <surface-elements> */
			}
			/* </surface> */
		},


		pattern : function(affines, target){
			for(let affine of affines){
				this.transform(affine, target);
			}
		},


		compile : function(){

			// caching configuration
			let config = this.configuration;
			
			/* <wire> */
			if(config.isWireEnabled){

				/* <wire-attributes> */
				var wireAttributes = this.wireAttributes;
				var n = wireAttributes.length;

				/* <wire-vertices> */
				var wireVertices = new WebGL_Vector3dBuffer(n);
				for(var i=0; i<n; i++){
					wireVertices.set(i, wireAttributes[i].vertex);
				}
				wireVertices.compile();
				this.wireVertices = wireVertices;
				/* </wire-vertices> */

				/* <wire-colors> */
				if(config.isWireColorAttributeEnabled){
					var wireColors = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						wireColors.set(i, wireAttributes[i].color);
					}
					wireColors.compile();
					this.wireColors = wireColors;
				}
				/* </wire-colors> */

				delete this.wireAttributes;
				/* </wire-attributes> */

				/* <wire-elements> */
				this.wireElements = new WebGL_LineBuffer(this.wireIndices);
				delete this.wireIndices;
				/* </wire-elements> */

			}
			/* </wire> */

			/* <surface> */
			if(config.isSurfaceEnabled){

				/* <surface-attributes> */
				var surfaceAttributes = this.surfaceAttributes;
				var n = surfaceAttributes.length;

				/* <surface-vertices> */
				var surfaceVertices = new WebGL_Vector3dBuffer(n);
				for(var i=0; i<n; i++){
					surfaceVertices.set(i, surfaceAttributes[i].vertex);
				}
				surfaceVertices.compile();
				this.surfaceVertices = surfaceVertices;
				/* </surface-vertices> */

				/* <surface-normals> */
				if(config.isSurfaceNormalAttributeEnabled){
					var surfaceNormals = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceNormals.set(i, surfaceAttributes[i].normal);
					}
					surfaceNormals.compile();
					this.surfaceNormals = surfaceNormals;
				}
				/* </surface-normals> */

				/* <surface-tex-coords> */
				if(config.isSurfaceTexCoordAttributeEnabled){
					var surfaceTexCoords = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceTexCoords.set(i, surfaceAttributes[i].texCoord);
					}
					surfaceTexCoords.compile();
					this.surfaceTexCoords = surfaceTexCoords;
				}
				/* </surface-tex-coords> */

				/* <surface-colors> */
				if(config.isSurfaceColorAttributeEnabled){
					var surfaceColors = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceColors.set(i, surfaceAttributes[i].color);
					}
					surfaceColors.compile();
					this.surfaceColors = surfaceColors;
				}
				/* </surface-colors> */

				/* <surface-tangents> */
				if(config.isSurfaceTangentAttributeEnabled){
					var surfaceUTangents = new WebGL_Vector3dBuffer(n);
					var surfaceVTangents = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceUTangents.set(i, surfaceAttributes[i].uTangent);
						surfaceVTangents.set(i, surfaceAttributes[i].vTangent);
					}
					surfaceUTangents.compile();
					this.surfaceUTangents = surfaceUTangents;
					surfaceVTangents.compile();
					this.surfaceVTangents = surfaceVTangents;
				}
				/* </surface-tangents> */

				delete this.surfaceAttributes;
				/* </surface-attributes> */

				/* <surface-elements> */
				this.surfaceElements = new WebGL_TriangleBuffer(this.surfaceIndices);
				delete this.surfaceIndices;
				/* </surface-elements> */

			}
			/* </surface> */
		},


		apply : function(instance){
			// caching configuration
			let config = this.configuration;
			
			/* <wire> */
			instance.isWireEnabled = config.isWireEnabled;

			if(config.isWireEnabled){

				// attributes
				instance.wireVertices = this.wireVertices
				instance.wireElements = this.wireElements;
				if(config.isWireColorAttributeEnabled){
					instance.wireColors = this.wireColors;
				}
			}
			/* </wire> */

			/* <surface> */
			instance.isSurfaceEnabled = config.isSurfaceEnabled;

			if(config.isSurfaceEnabled){

				// attributes
				instance.surfaceVertices = this.surfaceVertices;
				instance.surfaceElements = this.surfaceElements;
				if(config.isSurfaceNormalAttributeEnabled){
					instance.surfaceNormals = this.surfaceNormals;
				}
				if(config.isSurfaceTexCoordAttributeEnabled){
					instance.surfaceTexCoords = this.surfaceTexCoords;
				}
				if(config.isSurfaceColorAttributeEnabled){
					instance.surfaceColors = this.surfaceColors;
				}
				if(config.isSurfaceTangentAttributeEnabled){
					instance.surfaceUTangents = this.surfaceUTangents;
					instance.surfaceVTangents = this.surfaceVTangents;
				}
			}
			/* </surface> */
		},

		dispose : function(){
			// caching configuration
			let config = this.configuration;
			
			/* <wire> */
			if(config.isWireEnabled){
				this.wireVertices.dispose();
				this.wireElements.dispose();
				if(config.isWireColorAttributeEnabled){
					this.wireColors.dispose();
				}
			}
			/* </wire> */

			/* <surface> */
			if(config.isSurfaceEnabled){
				this.surfaceVertices.dispose();
				this.surfaceElements.dispose();
				if(config.isSurfaceNormalAttributeEnabled){
					this.surfaceNormals.dispose();
				}
				if(config.isSurfaceTexCoordAttributeEnabled){
					this.surfaceTexCoords.dispose();
				}
				if(config.isSurfaceColorAttributeEnabled){
					this.surfaceColors.dispose();
				}
				if(config.isSurfaceTangentAttributeEnabled){
					this.surfaceUTangents.dispose();
					this.surfaceVTangents.dispose();
				}
			}
			/* </surface> */
		}
};




function WebGL_ShapeConfiguration(){
	// no affines (see WebGL_Object for space positioned model)

	/* <wire> */
	
	/** wire */
	this.isWireEnabled = true;

	/** wire */
	this.isWireColorAttributeEnabled = false;
	/* </wire> */
	
	/* <surface> */
	
	/** surface */
	this.isSurfaceEnabled = true;

	/** surface normal */
	this.isSurfaceNormalAttributeEnabled = true;

	/** surface tex coord */
	this.isSurfaceTexCoordAttributeEnabled = false;

	/** surface color */
	this.isSurfaceColorAttributeEnabled = false;

	/** surface {U,V}-tangents */
	this.isSurfaceTangentAttributeEnabled = false;

	/* </surface> */
}





function WebGL_VertexAttributes(vertex=null){
	this.vertex = vertex;
}

WebGL_VertexAttributes.build_VN = function(vertex, normal){
	var va = new WebGL_VertexAttributes();
	va.vertex = vertex;
	va.normal = normal;
	return va;
};

WebGL_VertexAttributes.build_aVN = function(affine, vertex, normal){
	var vertexAttributes = new WebGL_VertexAttributes();
	var tVertex = new MathVector3d(); affine.transformPoint(vertex, tVertex);
	var tNormal = new MathVector3d(); affine.transformVector(normal, tNormal);
	vertexAttributes.vertex = tVertex;
	vertexAttributes.normal = tNormal;
	return vertexAttributes;
};


WebGL_VertexAttributes.prototype = {

		constructor: WebGL_VertexAttributes,

		interpolateFrom2VA : function(va0, va1, u, v){

			if(va0.vertex){
				var vertex0 = va0.vertex, vertex1 = va1.vertex;
				this.vertex = new MathVector3d(u*vertex0.x+v*vertex1.x, u*vertex0.y+v*vertex1.y, u*vertex0.z+v*vertex1.z);	
			}

			if(va0.normal){
				var normal0 = va0.normal, normal1 = va1.normal;
				this.normal = new MathVector3d(u*normal0.x+v*normal1.x, u*normal0.y+v*normal1.y, u*normal0.z+v*normal1.z);	
			}

			if(va0.texCoord){
				var texCoord0 = va0.texCoord, texCoord1 = va1.texCoord;
				this.texCoord = new MathVector2d(u*texCoord0.x+v*texCoord1.x, u*texCoord0.y+v*texCoord1.y);
			}

			if(va0.color){
				var color0 = va0.color, color1 = va1.color;
				this.color = new MathVector3d(u*color0.x+v*color1.x, u*color0.y+v*color1.y, u*color0.z+v*color1.z);	
			}

			if(va0.uTangent){
				var uTangent0 = va0.uTangent, uTangent1 = va1.uTangent;
				this.uTangent = new MathVector3d(
						u*uTangent0.x+v*uTangent1.x, 
						u*uTangent0.y+v*uTangent1.y, 
						u*uTangent0.z+v*uTangent1.z);	
			}

			if(va0.vTangent){
				var vTangent0 = va0.vTangent, vTangent1 = va1.vTangent;
				this.vTangent = new MathVector3d(
						u*vTangent0.x+v*vTangent1.x,
						u*vTangent0.y+v*vTangent1.y,
						u*vTangent0.z+v*vTangent1.z);	
			}
		},

		interpolateFrom3VA : function(va0, va1, va2, u, v, w){

			if(va0.vertex){
				var vertex0 = va0.vertex, vertex1 = va1.vertex, vertex2 = va2.vertex;
				this.vertex = new MathVector3d(
						u*vertex0.x+v*vertex1.x+w*vertex2.x,
						u*vertex0.y+v*vertex1.y+w*vertex2.y,
						u*vertex0.z+v*vertex1.z+w*vertex2.z);	
			}

			if(va0.normal){
				var normal0 = va0.normal, normal1 = va1.normal, normal2 = va2.normal;
				this.normal = new MathVector3d(
						u*normal0.x+v*normal1.x+w*normal2.x,
						u*normal0.y+v*normal1.y+w*normal2.y,
						u*normal0.z+v*normal1.z+w*normal2.z);	
			}

			if(va0.texCoord){
				var texCoord0 = va0.texCoord, texCoord1 = va1.texCoord, texCoord2 = va2.texCoord;
				this.texCoord = new MathVector2d(
						u*texCoord0.x+v*texCoord1.x+w*texCoord2.x,
						u*texCoord0.y+v*texCoord1.y+w*texCoord2.y);
			}

			if(va0.color){
				var color0 = va0.color, color1 = va1.color, color2 = va2.color;
				this.color = new MathVector3d(
						u*color0.x+v*color1.x+w*color2.x,
						u*color0.y+v*color1.y+w*color2.y,
						u*color0.z+v*color1.z+w*color2.z);	
			}

			if(va0.uTangent){
				var uTangent0 = va0.uTangent, uTangent1 = va1.uTangent, uTangent2 = va2.uTangent;
				this.uTangent = new MathVector3d(
						u*uTangent0.x+v*uTangent1.x+w*uTangent2.x,
						u*uTangent0.y+v*uTangent1.y+w*uTangent2.y,
						u*uTangent0.z+v*uTangent1.z+w*uTangent2.z);	
			}

			if(va0.vTangent){
				var vTangent0 = va0.vTangent, vTangent1 = va1.vTangent, vTangent2 = va2.vTangent;
				this.vTangent = new MathVector3d(
						u*vTangent0.x+v*vTangent1.x+w*vTangent2.x,
						u*vTangent0.y+v*vTangent1.y+w*vTangent2.y,
						u*vTangent0.z+v*vTangent1.z+w*vTangent2.z);	
			}
		}
};


/*
 * VBO objects
 */

 function WebGL_Vector2dBuffer(nbVectors){
	 this.array = new Float32Array(2*nbVectors);
 }

 WebGL_Vector2dBuffer.prototype = {

		 set : function(index, vector){
			 this.array[2*index+0] = vector.x;
			 this.array[2*index+1] = vector.y;
		 },

		 compile : function(){

			 // Create buffer handle
			 this.bufferHandle = gl.createBuffer();

			 // Bind buffer handle to current buffer
			 gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			 // store data in GPU
			 gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

			 delete this.array;
		 },

		 bind : function(location){

			 // bind vertices
			 gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			 // set to vertex attributes location
			 gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
		 },

		 dispose : function(){
			 gl.deleteBuffer(this.bufferHandle);	
		 }
 };


 function WebGL_Vector3dBuffer(nbVectors){
	 this.array = new Float32Array(3*nbVectors);
 }

 WebGL_Vector3dBuffer.prototype = {

		 set : function(index, vector){
			 this.array[3*index+0] = vector.x;
			 this.array[3*index+1] = vector.y;
			 this.array[3*index+2] = vector.z;
		 },

		 compile : function(){

			 // Create buffer handle
			 this.bufferHandle = gl.createBuffer();

			 // Bind buffer handle to current buffer
			 gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			 // store data in GPU
			 gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

			 delete this.array;
		 },

		 bind : function(location){

			 // bind vertices
			 gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			 // set to vertex attributes location
			 gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
		 },

		 dispose : function(){
			 gl.deleteBuffer(this.bufferHandle);	
		 },

 };


 function WebGL_ElementBuffer(indices){

	 // create and populate array
	 this.length = indices.length;
	 var array = new Uint16Array(this.length);
	 array.set(indices);

	 // Create buffer handle
	 this.bufferHandle = gl.createBuffer();

	 // Bind buffer handle to current buffer
	 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

	 // bind buffer data
	 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
 }

 WebGL_ElementBuffer.prototype = {

		 bind : function(){

			 // Bind buffer handle to current buffer
			 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
		 },

		 dispose : function(){
			 gl.deleteBuffer(this.bufferHandle);	
		 }
 };

 function WebGL_LineBuffer(indices){
	 WebGL_ElementBuffer.call(this, indices);
 }

 WebGL_LineBuffer.prototype = {
		 bind : WebGL_ElementBuffer.prototype.bind,
		 dispose : WebGL_ElementBuffer.prototype.dispose,

		 draw : function(){
			 // trigger render by drawing elements
			 gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_SHORT, 0);
		 }
 };


 function WebGL_TriangleBuffer(indices){
	 WebGL_ElementBuffer.call(this, indices);
 }

 WebGL_TriangleBuffer.prototype = {
		 bind : WebGL_ElementBuffer.prototype.bind,
		 dispose : WebGL_ElementBuffer.prototype.dispose,

		 draw : function(){
			 // trigger render by drawing elements
			 gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
		 }

 };
