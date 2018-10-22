
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
		 * Bind the buffer for rendering
		 */
		bind : function(location) {

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

