
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(isWisNormalEnabled = true, isTexCoordEnabled = false){
	// no affines

	/** the default program for wire rendering */
	this.wireProgram = "color2";

	/** default value for shape material */
	this.wireColor = [0.12, 0.12, 0.12, 0.0];

	/** the default program for wire rendering */
	this.surfaceProgram = "standard";

	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceGlossiness = 0.7;

	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceRoughness = 0.5;

	/** default value for shape material -> Phong shading */
	this.surfaceShininess = 0.5;

	/** default value for shape material -> multi-purposes */
	this.surfaceSpecularColor = [0.12, 0.8, 0.8, 0.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceDiffuseColor = [0.12, 0.8, 0.8, 0.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceAmbientColor = [0.1, 0.1, 0.1, 0.0];

	/** wire */
	this.isWireEnabled = true;

	/** wire */
	this.isWireColorAttributeEnabled = false;

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

}


WebGL_ShapeModel.prototype = {

		initialize : function(){
			/* <wire> */
			if(this.isWireEnabled){
				this.wireAttributes = new Array();		
				this.wireIndices = new Array();
			}
			/* </wire> */

			/* <surface> */
			if(this.isSurfaceEnabled){
				this.surfaceAttributes = new Array();
				this.surfaceIndices = new Array();
			}
			/* </surface> */
		},

		transform : function(affine, target){
			var offset, n, vertex, color, uTangent, vTangent, normal, texCoord;
			var vertexAttributes, targetVertexAttributes;

			/* <wire> */
			if(this.isWireEnabled){

				/* <wire-attributes> */
				var wireAttributes = this.wireAttributes, targetWireAttributes = target.wireAttributes;
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
					if(this.isWireColorAttributeEnabled){
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
			if(this.isSurfaceEnabled){

				/* <surface-attributes> */
				var surfaceAttributes = this.surfaceAttributes, targetSurfaceAttributes = target.surfaceAttributes;
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
					if(this.isSurfaceNormalAttributeEnabled){
						normal = new MathVector3d();
						affine.transformVector(vertexAttributes.normal, normal);
						targetVertexAttributes.normal = normal;
					}
					/* </normal> */

					/* <tangents> */
					if(this.isSurfaceTangentAttributeEnabled){

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
					if(this.isSurfaceTexCoordAttributeEnabled){
						texCoord = new MathVector3d();
						vertexAttributes.texCoord.copy(texCoord);
						targetVertexAttributes.texCoord = texCoord;
					}
					/* </texCoord> */

					/* <color> */
					if(this.isSurfaceColorAttributeEnabled){
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

			/* <wire> */
			if(this.isWireEnabled){

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
				if(this.isWireColorAttributeEnabled){
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
			if(this.isSurfaceEnabled){

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
				if(this.isSurfaceNormalAttributeEnabled){
					var surfaceNormals = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceNormals.set(i, surfaceAttributes[i].normal);
					}
					surfaceNormals.compile();
					this.surfaceNormals = surfaceNormals;
				}
				/* </surface-normals> */

				/* <surface-tex-coords> */
				if(this.isSurfaceTexCoordAttributeEnabled){
					var surfaceTexCoords = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceTexCoords.set(i, surfaceAttributes[i].texCoord);
					}
					surfaceTexCoords.compile();
					this.surfaceTexCoords = surfaceTexCoords;
				}
				/* </surface-tex-coords> */

				/* <surface-colors> */
				if(this.isSurfaceColorAttributeEnabled){
					var surfaceColors = new WebGL_Vector3dBuffer(n);
					for(var i=0; i<n; i++){
						surfaceColors.set(i, surfaceAttributes[i].color);
					}
					surfaceColors.compile();
					this.surfaceColors = surfaceColors;
				}
				/* </surface-colors> */

				/* <surface-tangents> */
				if(this.isSurfaceTangentAttributeEnabled){
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

			/* <wire> */
			instance.isWireEnabled = this.isWireEnabled;

			if(this.isWireEnabled){

				// material
				instance.wireProgram = this.wireProgram;
				instance.wireColor = this.wireColor;

				// attributes
				instance.wireVertices = this.wireVertices
				instance.wireElements = this.wireElements;
				if(this.isWireColorAttributeEnabled){
					instance.wireColors = this.wireColors;
				}
			}
			/* </wire> */

			/* <surface> */
			instance.isSurfaceEnabled = this.isSurfaceEnabled;

			if(this.isSurfaceEnabled){

				// material
				instance.surfaceProgram = this.surfaceProgram;
				instance.surfaceGlossiness = this.surfaceGlossiness;
				instance.surfaceRoughness = this.surfaceRoughness;
				instance.surfaceShininess = this.surfaceShininess;
				instance.surfaceSpecularColor = this.surfaceSpecularColor;
				instance.surfaceDiffuseColor = this.surfaceDiffuseColor;
				instance.surfaceAmbientColor = this.surfaceAmbientColor;

				// attributes
				instance.surfaceVertices = this.surfaceVertices;
				instance.surfaceElements = this.surfaceElements;
				if(this.isSurfaceNormalAttributeEnabled){
					instance.surfaceNormals = this.surfaceNormals;
				}
				if(this.isSurfaceTexCoordAttributeEnabled){
					instance.surfaceTexCoords = this.surfaceTexCoords;
					// textures
					instance.surfaceTexture0 = this.surfaceTexture0;
					instance.surfaceTexture1 = this.surfaceTexture1;
					instance.surfaceTexture2 = this.surfaceTexture2;
					instance.surfaceTexture3 = this.surfaceTexture3;
				}
				if(this.isSurfaceColorAttributeEnabled){
					instance.surfaceColors = this.surfaceColors;
				}
				if(this.isSurfaceTangentAttributeEnabled){
					instance.surfaceUTangents = this.surfaceUTangents;
					instance.surfaceVTangents = this.surfaceVTangents;
				}
			}
			/* </surface> */
		},

		dispose : function(){
			/* <wire> */
			if(this.isWireEnabled){
				this.wireVertices.dispose();
				this.wireElements.dispose();
				if(this.isWireColorAttributeEnabled){
					this.wireColors.dispose();
				}
			}
			/* </wire> */

			/* <surface> */
			if(this.isSurfaceEnabled){
				this.surfaceVertices.dispose();
				this.surfaceElements.dispose();
				if(this.isSurfaceNormalAttributeEnabled){
					this.surfaceNormals.dispose();
				}
				if(this.isSurfaceTexCoordAttributeEnabled){
					this.surfaceTexCoords.dispose();
				}
				if(this.isSurfaceColorAttributeEnabled){
					this.surfaceColors.dispose();
				}
				if(this.isSurfaceTangentAttributeEnabled){
					this.surfaceUTangents.dispose();
					this.surfaceVTangents.dispose();
				}
			}
			/* </surface> */
		}
};




function WebGL_VertexAttributes(vertex=null){
	this.vertex = vertex;
}

WebGL_VertexAttributes.prototype = {
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
