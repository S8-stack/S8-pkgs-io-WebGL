

/**
 * This object encapsulates the element buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param indices : (String) the vertex indices data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * @param location : the location of this attribute in the shader program given by : gl.getAttribLocation(shaderProgram, [Keyword]);
 * 
 */
function WebGL_TriangleBuffer(){
	this.buffer = new Array();
}


WebGL_TriangleBuffer.prototype = {

		push : function(i0, i1, i2){
			this.buffer.push(i0);
			this.buffer.push(i1);
			this.buffer.push(i2);
		},

		compile : function(){

			// length
			this.length = this.buffer.length;
			
			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

			// Store array data in the current buffer
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.buffer, 0, this.length), gl.STATIC_DRAW);

			// delete buffer
			delete this.buffer;
		},

		/** Bind the buffer for rendering */
		render : function() {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
			gl.drawElements(gl.TRIANGLES, this.length, gl.UNSIGNED_SHORT, 0);
		},

		/** Dispose the buffer */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		}
};



