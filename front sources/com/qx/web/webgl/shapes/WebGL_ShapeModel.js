
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(){
	// no affines

	// wire
	this.wireVertices = new WebGL_VertexBuffer();
	this.wireElements = new WebGL_LineBuffer();

	// surface
	this.surfaceVertices = new WebGL_VertexBuffer();
	this.surfaceNormals = new WebGL_NormalBuffer();
	this.surfaceElements = new WebGL_TriangleBuffer();

}


WebGL_ShapeModel.prototype = {
		
		transform : function(affine, target){
			var offset;
			
			// wire
			offset = target.wireVertices.length();
			this.wireVertices.transform(affine, target.wireVertices);
			this.wireElements.shift(offset, target.wireElements);
			
			// surface
			offset = target.surfaceVertices.length();
			this.surfaceVertices.transform(affine, target.surfaceVertices);
			this.surfaceNormals.transform(affine, target.surfaceNormals);
			this.surfaceElements.shift(offset, target.surfaceElements);
		},

		pattern : function(affines, target){
			for(let affine of affines){
				this.transform(affine, target);
			}
		},
		
		compile : function(){
			this.wireVertices.compile();
			this.wireElements.compile();
			this.surfaceVertices.compile();
			this.surfaceNormals.compile();
			this.surfaceElements.compile();
		},
		
		dispose : function(){
			this.wireVertices.dispose();
			this.wireElements.dispose();
			this.surfaceVertices.dispose();
			this.surfaceNormals.dispose();
			this.surfaceElements.dispose();
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
		}
};

function WebGL_TexCoordBuffer(){
	WebGL_Vector2dBuffer.call(this);
}

WebGL_TexCoordBuffer.prototype = {
		push : WebGL_Vector2dBuffer.prototype.push,
		length : WebGL_Vector2dBuffer.prototype.length,
		compile : WebGL_Vector2dBuffer.prototype.push,
		bind : WebGL_Vector2dBuffer.prototype.bind,
		dispose : WebGL_Vector2dBuffer.prototype.dispose,
		
		transform : function(target){
			for(let vector of this.vectors){
				target.push(vector);
			}
		}
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
		}
};



function WebGL_VertexBuffer(){
	WebGL_Vector3dBuffer.call(this);
}

WebGL_VertexBuffer.prototype = {
		push : WebGL_Vector3dBuffer.prototype.push,
		length : WebGL_Vector3dBuffer.prototype.length,
		compile : WebGL_Vector3dBuffer.prototype.push,
		bind : WebGL_Vector3dBuffer.prototype.bind,
		dispose : WebGL_Vector3dBuffer.prototype.dispose,
		
		transform : function(affine, target){
			var transformedVertex;
			for(let vertex of this.vectors){
				transformedVertex = new Math3d_Vector();
				affine.transformVertex(vertex, transformedVertex);
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
		compile : WebGL_Vector3dBuffer.prototype.push,
		bind : WebGL_Vector3dBuffer.prototype.bind,
		dispose : WebGL_Vector3dBuffer.prototype.dispose,
		
		transform : function(affine, target){
			var transformedNormal;
			for(let normal of this.vectors){
				transformedNormal = new Math3d_Vector();
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
		// bind elements buffer (only one element buffer)
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
	compile : WebGL_ElementBuffer.compile,
	bind : WebGL_ElementBuffer.bind,
	dispose : WebGL_ElementBuffer.dispose,
	
	push : function(i0, i1){
		this.indices.push(i0);
		this.indices.push(i1);
	},
	
	draw : function(){
		// trigger render by drawing elements
		gl.drawElements(this.GL_LINE, this.length, gl.UNSIGNED_SHORT, 0);
	}
	
	
};


function WebGL_TriangleBuffer(){
	WebGL_ElementBuffer.call(this);
}

WebGL_TriangleBuffer.prototype = {
	compile : WebGL_ElementBuffer.compile,
	bind : WebGL_ElementBuffer.bind,
	dispose : WebGL_ElementBuffer.dispose,
	
	push : function(i0, i1, i2){
		this.indices.push(i0);
		this.indices.push(i1);
		this.indices.push(i2);
	},
	
	draw : function(){
		// trigger render by drawing elements
		gl.drawElements(this.GL_TRIANGLE, this.length, gl.UNSIGNED_SHORT, 0);
	}
	
};
