



/**
 * WebGL Shape constructor, methods and utilities
 */


/**
 * Constructor
 *  Dimension is set-up by the length of the array passed as argument. This dimension cannot be changed later on.
 *  
 *  Potential attributes are: vertex, normal, uTangent, vTangent, texCoord, color
 *  
 */
function WebGL_Shape(id, scene){
	
	this.id = id;
	
	this.style = null;
	
	// not yet initialized (asynchronous loading)
	this.isInitialized = false;
	
	// model matrix to position object
	this.matrix_Model = new Matrix4();
	this.matrix_Model.identity();
	
	// normal matrix (for shader rendering of normals)
	this.matrix_Normal = new Matrix3();
	
	// projection view matrix
	this.matrix_ProjectionViewModel = new Matrix4();
	
	// view model matrix
	this.matrix_ViewModel = new Matrix4();
	
	// keep pointer
	this.matrix_ProjectionView = scene.view.matrix_ProjectionView;

	// keep pointer
	this.matrix_View = scene.view.matrix_View;

	var shape = this;
	
	request("service=WebGL; action=GetShape; id="+id, function (response){
		
		eval(response.responseText);
		/*
		 * eval must define:
		 *      <WebGL vertex arrays>
		 *      <WebGL element arrays> element
		 * 		(function) this.dispose()	
		 */
		
		shape.initialize();
		shape.isInitialized = true;
		// shape is ready to be rendered!
		
		scene.render();
	});
}


WebGL_Shape.prototype = {
		
		/**
		 * render the styles and shapes
		 */
		render : function(program){
			
			// check if initialized and perform asynchronous loading otherwise
			if(this.isInitialized){
				// update matrices
				this.matrix_ProjectionViewModel.multiply(this.matrix_ProjectionView, this.matrix_Model);
				this.matrix_ViewModel.multiply(this.matrix_View, this.matrix_Model);
				this.matrix_Normal.transposeInverse4(this.matrix_ViewModel);
				
				// bind to program
				program.bindShape(this);
				
				// render elements
				this.element.render();
				
				// unbind of program
				program.unbindShape(this);
				
			}
		},
		
		
		/**
		 * setStyle to a shape
		 */
		setStyle : function(newStyleId){
			
			// detach form current style if any
			if(this.style!=null){
				this.style.removeShape(this.id);	
			}
			
			// append to new style
			scene.getStyle(newStyleId).addShape(this);
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
function WebGL_ArrayBuffer(dimension, array){
	// register dimension (for bind operation)
	this.dimension = dimension;

	this.array = array;
	
	// Create buffer handle
	this.bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

	// Store array data in the current buffer
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
	
}


WebGL_ArrayBuffer.prototype = {
		
		/** Bind the buffer for rendering */
		bind : function(location) {


			// bind buffer
			gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);
			gl.vertexAttribPointer(location, this.dimension, gl.FLOAT, false, 0, 0);
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




/**
 * This object encapsulates the element buffer.
 * Attributes are object specific so creation and management is of the sole responsability of the WebGLObject
 * 
 * @param indices : (String) the vertex indices data serialized in a String delimited by comma and/or spaces.
 * @param dimension : the dimensions of the vectors passed as vertex data
 * @param location : the location of this attribute in the shader program given by : gl.getAttribLocation(shaderProgram, [Keyword]);
 * 
 */
function WebGL_ElementArrayBuffer(dimension, data){
	
	
	switch(dimension){
	case 2 : this.type = gl.LINES; break;
	case 3 : this.type = gl.TRIANGLES; break;
	}

	// register size (for bind operation)
	this.numItems = data.length;

	// Create buffer handle
	this.bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

	// Store array data in the current buffer
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);

}


WebGL_ElementArrayBuffer.prototype = {

		/** Bind the buffer for rendering */
		render : function() {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
			gl.drawElements(this.type, this.numItems, gl.UNSIGNED_SHORT, 0);
		},

		/** Dispose the buffer */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		}
};







