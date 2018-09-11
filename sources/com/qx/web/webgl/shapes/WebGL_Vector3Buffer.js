
/**
 * This object encapsulates the attribute array buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param data : (String) the coefficients of the vertex data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * 
 */
function WebGL_ArrayBuffer3(){
	this.vectors = new Array();
}


WebGL_ArrayBuffer3.prototype = {
		
		push(vector){
			this.buffer.push(vector.x);
			this.buffer.push(vector.y);
			this.buffer.push(vector.z);
			this.length++;
		},
		
		
		compile : function(){

			// Create buffer handle
			this.bufferHandle = gl.createBuffer();

			// Bind buffer handle to current buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

			// Store array data in the current buffer (Float32Array.BYTES_PER_ELEMENT=4: 4 bytes per float)
			var bufferData = new Float32Array(3*this.length);
			for(var i in this.buffer){
				bufferData[i] = this.buffer[i];
			}
			
			// delete
			delete this.buffer;
			
			// store data in GPU
			gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
		}


	/**
	 * Bind the buffer for rendering
	 */
	bind : function(location, offset) {

		// bind buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);
		gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
	},


	unbind : function(location) {
	},

	/**
	 * Dispose the buffer
	 */
	dispose : function(){
		gl.deleteBuffer(this.bufferHandle);
	}
};

