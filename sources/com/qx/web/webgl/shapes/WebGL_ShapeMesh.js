
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeMesh(){
	this.affines = [new MathAffine3()];
}


WebGL_ShapeMesh.prototype = {
		
		getNumberOfVertices : function(){
			return this.vertices.getNumberOfVectors();
		},
		
		getNumberOfElements : function(){
			return this.elements.getNumberOfElements();
		},
		
		pattern : function(patternFunction, result){
			
			var nbInstances = patternFunction.nbInstances;
			var nbVertices = this.getNumberOfVertices();
			result.expand(nbInstances*nbVertices, nbInstances*this.getNumberOfElements());
			var affine = new MathAffine3();
			var offset = 0;
			var that = this;
			patternFunction(affine, function(){
				that.transform(affine, result, offset);
				offset+=nbVertices;
			});
		}
};


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireMesh(nbVertices=0, nbElements=0){
	WebGL_ShapeMesh.call(this);

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// elements
	this.elements = new WebGL_SegmentBuffer(nbElements);

}


WebGL_WireMesh.prototype = {
		
		getElementType : function(){
			return gl.LINES;
		},
		
		getNumberOfVertices : WebGL_ShapeMesh.prototype.getNumberOfVertices,
		
		getNumberOfElements : WebGL_ShapeMesh.prototype.getNumberOfElements,
		
		createRenderable : function(instanceAffines){
			var renderable = new WebGL_ShapeRenderable(this, instanceAffines);
			renderable.vertexBufferHandle = this.vertices.bufferHandle;
			return renderable;
		},
		
		pattern : WebGL_ShapeMesh.prototype.pattern,
		
		expand : function(nbVertices, nbElements){
			this.vertices.expand(nbVertices);
			this.elements.expand(nbElements);
		},
		
		compile : function(){
			this.vertices.compile();
			this.elements.compile();
		},

		dispose : function(){
			this.vertices.dispose();
			this.elements.dispose();
		},

		transform : function(affine, target, offset){
			this.vertices.transformVertices(affine, target.vertices);
			this.elements.shift(offset, target.elements);
		}
};



/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_SurfaceMesh(nbVertices=0, nbElements=0){
	WebGL_ShapeMesh.call(this);

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// normals
	this.normals = new WebGL_Vector3Buffer(nbVertices);

	// tex coords
	this.texCoords = new WebGL_Vector2Buffer(nbVertices);

	// elements
	this.elements = new WebGL_TriangleBuffer(nbElements);

}


WebGL_SurfaceMesh.prototype = {
		
		getElementType : function(){
			return gl.TRIANGLES;
		},
		
		getNumberOfVertices : WebGL_ShapeMesh.prototype.getNumberOfVertices,
		
		getNumberOfElements : WebGL_ShapeMesh.prototype.getNumberOfElements,
		
		createRenderable : function(instanceAffines){
			var renderable = new WebGL_ShapeRenderable(this, instanceAffines);
			renderable.vertexBufferHandle = this.vertices.bufferHandle;
			renderable.normalBufferHandle = this.normals.bufferHandle;
			// TODO texCoords
			return renderable;
		},
		
		pattern : WebGL_ShapeMesh.prototype.pattern,
		
		expand : function(nbVertices, nbElements){
			this.vertices.expand(nbVertices);
			this.normals.expand(nbVertices);
			this.elements.expand(nbElements);
		},
		
		getNumberOfVertices : function(){
			return this.vertices.getNumberOfVectors();
		},
		
		getNumberOfElements : function(){
			return this.elements.getNumberOfElements();
		},
		
		compile : function(){
			this.vertices.compile();
			this.normals.compile();
			this.texCoords.compile();
			this.elements.compile();
		},

		dispose : function(){
			this.vertices.dispose();
			this.normals.dispose();
			this.texCoords.dispose();
			this.elements.dispose();
		},
		
		transform : function(affine, target, offset){
			this.vertices.transformVertices(affine, target.vertices);
			this.normals.transformNormals(affine, target.normals);
			this.elements.shift(offset, target.elements);
		}
};





/**
 * This object encapsulates the attribute array buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param data : (String) the coefficients of the vertex data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * 
 */
function WebGL_Vector2Buffer(nbVectors=0){
	this.array = new Float32Array(nbVectors*2);
	this.nbVectors = nbVectors;
	this.offset=0;
}


WebGL_Vector2Buffer.prototype = {
		
		expand : function(nbAdditionalVectors){
			if(this.offset!=2*this.nbVectors){
				throw "Previous patch has not been filled!";
			}
			var expandedArray = new Float32Array(this.array.length+2*nbAdditionalVectors);
			expandedArray.set(this.array);
			this.array = expandedArray;
			this.nbVectors+=nbAdditionalVectors;
		},

		push(vector){
			this.array[this.offset+0] = vector.x;
			this.array[this.offset+1] = vector.y;
			offset+=2;
		},

		getVector : function(index, result){
			var offset = index*2;
			result.x = this.array[offset+0];
			result.y = this.array[offset+1];
		},

		compile : function(){

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// Store array data in the current buffer (Float32Array.BYTES_PER_ELEMENT=4: 4 bytes per float)
			/*
			var bufferData = new Float32Array(this.array.length);
			for(var i in this.array){
				bufferData[i] = this.array[i];
			}*/
			// delete
			//delete this.array;

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);
		},


		/**
		 * Dispose the buffer
		 */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		},

		copy(target){
			var nbVectors = this.getNumberOfVectors();

			var input = new MathVector2(), output = new MathVector2();
			for(var i=0; i<nbVectors; i++){
				this.getVector(i, input);
				input.copy(output);
				target.push(output);
			}
		}
};




/**
 * This object encapsulates the attribute array buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param data : (String) the coefficients of the vertex data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * 
 */
function WebGL_Vector3Buffer(nbVectors=0){
	this.offset = 0;
	this.nbVectors = nbVectors;
	this.array = new Float32Array(3*nbVectors);
}


WebGL_Vector3Buffer.prototype = {

		expand : function(nbAdditionalVectors){
			if(this.offset!=3*this.nbVectors){
				throw "Previous patch has not been filled!";
			}
			var expandedArray = new Float32Array(this.array.length+3*nbAdditionalVectors);
			expandedArray.set(this.array);
			this.array = expandedArray;
			this.nbVectors+=nbAdditionalVectors;
		},
		
		push : function(vector){
			this.array[this.offset+0] = vector.x;
			this.array[this.offset+1] = vector.y;
			this.array[this.offset+2] = vector.z;
			this.offset+=3;
		},
		
		getVector : function(index, result){
			var offset = index*3;
			result.x = this.array[offset+0];
			result.y = this.array[offset+1];
			result.z = this.array[offset+2];
		},

		getNumberOfVectors : function(){
			return this.nbVectors;
		},

		compile : function(){

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// Store array data in the current buffer (Float32Array.BYTES_PER_ELEMENT=4: 4 bytes per float)
			/*
			var bufferData = new Float32Array(this.buffer.length);
			for(var i in this.buffer){
				bufferData[i] = this.buffer[i];
			}
			 */
			// delete
			//delete this.buffer;

			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);
		},

		/**
		 * Dispose the buffer
		 */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		},
		
		copy(target){
			var nbVectors = this.getNumberOfVectors();

			var input = new MathVector3(), output = new MathVector3();
			for(var i=0; i<nbVectors; i++){
				this.getVector(i, input);
				input.copy(output);
				target.push(output);
			}
		},
		
		transformVertices(affine, target){
			var nbVectors = this.getNumberOfVectors();

			var input = new MathVector3(), output = new MathVector3();
			for(var i=0; i<nbVectors; i++){
				this.getVector(i, input);
				affine.transformVertex(input, output);
				target.push(output);
			}
		},
		
		transformVectors(affine, target){
			var nbVectors = this.getNumberOfVectors();

			var input = new MathVector3(), output = new MathVector3();
			for(var i=0; i<nbVectors; i++){
				this.getVector(i, input);
				affine.transformVector(input, output);
				target.push(output);
			}
		},
		
		transformNormals(affine, target){
			var nbVectors = this.getNumberOfVectors();
			var input = new MathVector3(), output = new MathVector3();
			for(var i=0; i<nbVectors; i++){
				this.getVector(i, input);
				affine.transformNormal(input, output);
				target.push(output);
			}
		}
};





/**
 * This object encapsulates the element buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param indices : (String) the vertex indices data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * @param location : the location of this attribute in the shader program given by : gl.getAttribLocation(shaderProgram, [Keyword]);
 * 
 */
function WebGL_SegmentBuffer(nbElements=0){
	this.array = new Uint16Array(nbElements);
	this.offset = 0;
}


WebGL_SegmentBuffer.prototype = {

		expand : function(nbAllocatedSegments){
			var expandedArray = new Uint16Array(this.array.length+2*nbAllocatedSegments);
			expandedArray.set(this.array);
			this.array = expandedArray;
		},
		
		push : function(i0, i1){
			this.array[this.offset+0] = i0;
			this.array[this.offset+1] = i1;
			this.offset+=2;
		},
		

		getNumberOfElements : function(){
			return this.array.length/2;
		},

		compile : function(){
			
			// length
			this.length = this.array.length;
			
			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

			// bind buffer data
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		},

		/** Bind the buffer for rendering */
		render : function() {
			
			// bind buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
			
			// draw elements
			gl.drawElements(gl.LINES, this.length, gl.UNSIGNED_SHORT, 0);
		},

		/** Dispose the buffer */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		},
		
		shift : function(offset, target){
			var n = this.array.length/2;
			var index;
			for(var i=0; i<n; i++){
				index=i*2;
				target.push(offset+this.array[index+0], offset+this.array[index+1]);
			}
		}
};




/**
 * This object encapsulates the element buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param indices : (String) the vertex indices data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * @param location : the location of this attribute in the shader program given by : gl.getAttribLocation(shaderProgram, [Keyword]);
 * 
 */
function WebGL_TriangleBuffer(nbElements=0){
	this.array = new Uint16Array(nbElements);
	this.offset = 0;
}


WebGL_TriangleBuffer.prototype = {
		

		expand : function(nbAllocatedTriangles){
			var expandedArray = new Uint16Array(this.array.length+3*nbAllocatedTriangles);
			expandedArray.set(this.array);
			this.array = expandedArray;
		},

		push : function(i0, i1, i2){
			this.array[this.offset+0] = i0;
			this.array[this.offset+1] = i1;
			this.array[this.offset+2] = i2;
			this.offset+=3;
		},
		
		getNumberOfElements : function(){
			return this.array.length/3;
		},

		compile : function(){

			// length
			this.length = this.array.length;
			
			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

			// Store array data in the current buffer
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		},

		/** Bind the buffer for rendering */
		render : function() {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
			gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
		},

		/** Dispose the buffer */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		},
		
		shift : function(offset, target){
			var n = this.array.length/3;
			var index;
			for(var i=0; i<n; i++){
				index=i*3;
				target.push(
						offset+this.array[index+0],
						offset+this.array[index+1],
						offset+this.array[index+2]);
			}
		}
};
