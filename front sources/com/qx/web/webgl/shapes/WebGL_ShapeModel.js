
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(isWisNormalEnabled = true, isTexCoordEnabled = false){
	// no affines

	/** default value for shape material */
	this.wireColor = [0.12, 0.12, 0.12, 0.0];

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
				this.wireVertices = new WebGL_VertexBuffer();		
				this.wireElements = new WebGL_LineBuffer();
				if(this.isWireColorAttributeEnabled){
					this.wireColors = new WebGL_Vector3dBuffer();
				}
			}
			/* </wire> */
			
			/* <surface> */
			if(this.isSurfaceEnabled){
				this.surfaceVertices = new WebGL_VertexBuffer();
				this.surfaceElements = new WebGL_TriangleBuffer();
				if(this.isSurfaceNormalAttributeEnabled){
					this.surfaceNormals = new WebGL_NormalBuffer();
				}
				if(this.isSurfaceTexCoordAttributeEnabled){
					this.surfaceTexCoords = new WebGL_TexCoordBuffer();
				}
				if(this.isSurfaceColorAttributeEnabled){
					this.surfaceColors = new WebGL_Vector3dBuffer();
				}
				if(this.isSurfaceTangentAttributeEnabled){
					this.surfaceUTangents = new WebGL_TangentBuffer();
					this.surfaceVTangents = new WebGL_TangentBuffer();
				}
			}
			/* </surface> */
		},

		transform : function(affine, target){
			var offset;

			/* <wire> */
			if(this.isWireEnabled){
				offset = target.wireVertices.length();
				this.wireVertices.transform(affine, target.wireVertices);
				this.wireElements.shift(offset, target.wireElements);
				if(this.isWireColorAttributeEnabled){
					this.wireColors.copy(target.wireColors);
				}
			}
			/* </wire> */
			
			/* <surface> */
			if(this.isSurfaceEnabled){
				offset = target.surfaceVertices.length();
				this.surfaceVertices.transform(affine, target.surfaceVertices);
				this.surfaceElements.shift(offset, target.surfaceElements);
				
				if(this.isSurfaceNormalAttributeEnabled){
					this.surfaceNormals.transform(affine, target.surfaceNormals);
				}
				if(this.isSurfaceTexCoordAttributeEnabled){
					this.surfaceTexCoords.copy(target.surfaceTexCoords);
				}
				if(this.isSurfaceColorAttributeEnabled){
					this.surfaceColors.copy(target.surfaceColors);
				}
				if(this.isSurfaceTangentAttributeEnabled){
					this.surfaceUTangents.transform(affine, target.surfaceUTangents);
					this.surfaceVTangents.transform(affine, target.surfaceVTangents);
				}
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
				this.wireVertices.compile();
				this.wireElements.compile();
				if(this.isWireColorAttributeEnabled){
					this.wireColors.compile();
				}
			}
			/* </wire> */
			
			/* <surface> */
			if(this.isSurfaceEnabled){
				this.surfaceVertices.compile();
				this.surfaceElements.compile();
				if(this.isSurfaceNormalAttributeEnabled){
					this.surfaceNormals.compile();
				}
				if(this.isSurfaceTexCoordAttributeEnabled){
					this.surfaceTexCoords.compile();
				}
				if(this.isSurfaceColorAttributeEnabled){
					this.surfaceColors.compile();
				}
				if(this.isSurfaceTangentAttributeEnabled){
					this.surfaceUTangents.compile();
					this.surfaceVTangents.compile();
				}
			}
			/* </surface> */
		},
		
		
		apply : function(instance){
						
			/* <wire> */
			if(this.isWireEnabled){
				// material
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
			if(this.isSurfaceEnabled){
				// material
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


/*
 * VBO objects
 */



function WebGL_Vector2dBuffer(){
	this.vectors = new Array();
}

WebGL_Vector2dBuffer.prototype = {


		push : function(vector){
			this.vectors.push(vector);
		},

		length : function(){
			return this.vectors.length;
		},

		compile : function(){
			// create array
			var array = new Float32Array(2*this.vectors.length);
			var offset = 0;
			for(let vector of this.vectors){
				array[offset+0] = vector.x;
				array[offset+1] = vector.y;
				offset+=2;
			}

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
		},

		bind : function(location){

			// bind vertices
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// set to vertex attributes location
			gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
		},

		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);	
		},
		
		// default transform: let vectors untouched
		copy : function(affine, target){
			var vertexCopy;
			for(let vertex of this.vectors){
				vertexCopy = new MathVector2d();
				vertex.copy(vertexCopy);
				target.push(vertexCopy);
			}
		}
};

function WebGL_TexCoordBuffer(){
	WebGL_Vector2dBuffer.call(this);
}

WebGL_TexCoordBuffer.prototype = {
		push : WebGL_Vector2dBuffer.prototype.push,
		length : WebGL_Vector2dBuffer.prototype.length,
		compile : WebGL_Vector2dBuffer.prototype.compile,
		bind : WebGL_Vector2dBuffer.prototype.bind,
		dispose : WebGL_Vector2dBuffer.prototype.dispose,
};


function WebGL_Vector3dBuffer(){
	this.vectors = new Array();
}

WebGL_Vector3dBuffer.prototype = {


		push : function(vector){
			this.vectors.push(vector);
		},

		length : function(){
			return this.vectors.length;
		},

		compile : function(){
			// create array
			var array = new Float32Array(3*this.vectors.length);
			var offset = 0;
			for(let vector of this.vectors){
				array[offset+0] = vector.x;
				array[offset+1] = vector.y;
				array[offset+2] = vector.z;
				offset+=3;
			}

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
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
		
		// default transform: let vectors untouched
		copy : function(affine, target){
			var vertexCopy;
			for(let vertex of this.vectors){
				vertexCopy = new MathVector3d();
				vertex.copy(vertexCopy);
				target.push(vertexCopy);
			}
		}
};



function WebGL_VertexBuffer(){
	WebGL_Vector3dBuffer.call(this);
}

WebGL_VertexBuffer.prototype = {
		push : WebGL_Vector3dBuffer.prototype.push,
		length : WebGL_Vector3dBuffer.prototype.length,
		compile : WebGL_Vector3dBuffer.prototype.compile,
		bind : WebGL_Vector3dBuffer.prototype.bind,
		dispose : WebGL_Vector3dBuffer.prototype.dispose,

		transform : function(affine, target){
			var transformedVertex;
			for(let vertex of this.vectors){
				transformedVertex = new MathVector3d();
				affine.transformPoint(vertex, transformedVertex);
				target.push(transformedVertex);
			}
		}
};


function WebGL_NormalBuffer(){
	WebGL_Vector3dBuffer.call(this);
}

WebGL_NormalBuffer.prototype = {
		push : WebGL_Vector3dBuffer.prototype.push,
		length : WebGL_Vector3dBuffer.prototype.length,
		compile : WebGL_Vector3dBuffer.prototype.compile,
		bind : WebGL_Vector3dBuffer.prototype.bind,
		dispose : WebGL_Vector3dBuffer.prototype.dispose,

		transform : function(affine, target){
			var transformedNormal;
			for(let normal of this.vectors){
				transformedNormal = new MathVector3d();
				affine.transformVector(normal, transformedNormal);
				target.push(transformedNormal);
			}
		}
};



function WebGL_TangentBuffer(){
	WebGL_TangentBuffer.call(this);
}

WebGL_TangentBuffer.prototype = {
		push : WebGL_Vector3dBuffer.prototype.push,
		length : WebGL_Vector3dBuffer.prototype.length,
		compile : WebGL_Vector3dBuffer.prototype.compile,
		bind : WebGL_Vector3dBuffer.prototype.bind,
		dispose : WebGL_Vector3dBuffer.prototype.dispose,

		transform : function(affine, target){
			var transformedNormal;
			for(let normal of this.vectors){
				transformedNormal = new MathVector3d();
				affine.transformVector(normal, transformedNormal);
				target.push(transformedNormal);
			}
		}
};


function WebGL_ElementBuffer(){
	this.indices = new Array();
}

WebGL_ElementBuffer.prototype = {

		shift : function(offset, target){
			for(let index of this.indices){
				target.indices.push(offset+index);
			}
		},

		compile : function(){
			// create and populate array
			this.length = this.indices.length;
			var array = new Uint16Array(this.length);
			array.set(this.indices);

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

			// bind buffer data
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
		},

		bind : function(){

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
		},

		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);	
		}
};

function WebGL_LineBuffer(){
	WebGL_ElementBuffer.call(this);
}

WebGL_LineBuffer.prototype = {
		shift : WebGL_ElementBuffer.prototype.shift,
		compile : WebGL_ElementBuffer.prototype.compile,
		bind : WebGL_ElementBuffer.prototype.bind,
		dispose : WebGL_ElementBuffer.prototype.dispose,

		push : function(i0, i1){
			this.indices.push(i0);
			this.indices.push(i1);
		},

		draw : function(){
			// trigger render by drawing elements
			gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_SHORT, 0);
		}


};


function WebGL_TriangleBuffer(){
	WebGL_ElementBuffer.call(this);
}

WebGL_TriangleBuffer.prototype = {
		shift : WebGL_ElementBuffer.prototype.shift,
		compile : WebGL_ElementBuffer.prototype.compile,
		bind : WebGL_ElementBuffer.prototype.bind,
		dispose : WebGL_ElementBuffer.prototype.dispose,

		push : function(i0, i1, i2){
			this.indices.push(i0);
			this.indices.push(i1);
			this.indices.push(i2);
		},

		draw : function(){
			// trigger render by drawing elements
			gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
		}

};
