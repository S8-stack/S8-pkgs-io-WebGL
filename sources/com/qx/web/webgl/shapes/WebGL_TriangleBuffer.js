

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



