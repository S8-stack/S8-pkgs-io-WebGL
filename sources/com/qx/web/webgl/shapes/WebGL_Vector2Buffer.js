
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
		 * Bind the buffer for rendering
		 */
		bind : function(location, offset) {

			// bind buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);
			gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
		},


		unbind : function(location) {
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

