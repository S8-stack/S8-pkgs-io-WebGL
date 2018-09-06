



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

	this.isInitialized = false;

	this.id = id;

	this.nbVertices = 0;

	// setup AttributesOptions 
	this.isVertexDefined = false;
	this.isNormalDefined = false;
	this.isUTangentDefined = false;
	this.isVTangentDefined = false;
	this.isTexCoordDefined = false;
	this.isColorDefined = false;

	this.initialize(scene);
}


WebGL_Shape.prototype = {

		/** initialize the scene */
		initialize : function(scene){

			this.style = null;

			// not yet initialized (asynchronous loading)
			this.isVertexArraysInitialized = false;
			this.isElementArrayInitialized = false;

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

			request("webGL.getShape:id="+shape.id, function (response){

				eval(response.responseText);
				/*
				 * eval must define:
				 * 
				 * 	this.nbVertices
				 * 	this.nbElements;
				 * 
				 * 	(0) this.isVertexDefined
				 * 	(1) this.isNormalDefined
				 * 	(2) this.isUTangentDefined;
				 * 	(3) this.isVTangentDefined;
				 * 	(4) this.isTexCoordDefined;
				 * 	(5) this.isColorDefined;
				 * 
				 * 	this.elementDimension;
				 * 
				 */

				// <vertices block array block>
				request("webGL.getVertexArraysBlock:id="+shape.id, function (response){
					var arrayBuffer = response.response;
					
					var blockData = new DataView(arrayBuffer);
					
					var offset = 0, length;

					// vertex
					if(shape.isVertexDefined){
						length = 3*shape.nbVertices;
						shape.vertex=new WebGL_ArrayBuffer(3, blockData, offset, length);
						offset+=length;
					}

					// normal
					if(shape.isNormalDefined){
						length = 3*shape.nbVertices;
						shape.normal=new WebGL_ArrayBuffer(3, blockData, offset, length);
						offset+=length;
					}

					// uTangent
					if(shape.isUTangentDefined){
						length = 3*shape.nbVertices;
						shape.uTangent=new WebGL_ArrayBuffer(3, blockData, offset, length);
						offset+=length;
					}

					// vTangent
					if(shape.isVTangentDefined){
						length = 3*shape.nbVertices;
						shape.vTangent=new WebGL_ArrayBuffer(3, blockData, offset, length);
						offset+=length;
					}

					// texCoord
					if(shape.isTexCoordDefined){
						length = 2*shape.nbVertices;
						shape.texCoord=new WebGL_ArrayBuffer(2, blockData, offset, length);
						offset+=length;
					}

					// color
					if(shape.isColorDefined){
						length = 3*shape.nbVertices;
						shape.color=new WebGL_ArrayBuffer(3, blockData, offset, length);
						offset+=length;
					}

					// flagged as done
					shape.isVertexArraysInitialized = true;

					// trigger redraw
					//scene.render();
				},
				function(xhr){
					xhr.responseType = "arraybuffer";
				});
				// </vertices block array block>

				// <elements array block>
				request("webGL.getElementArray:id="+shape.id,function (response){
					var buffer = response.response;
					var offset = 0, length;

					shape.element = new WebGL_ElementArrayBuffer(shape.elementDimension, buffer, shape.nbElements);

					// flagged as done
					shape.isElementArrayInitialized = true;

					// trigger redraw
					scene.render();
				},
				function(xhr){
					xhr.responseType = "arraybuffer";
				});
				// </elements array block>

			});
		},



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
			else if(this.isVertexArraysInitialized && this.isElementArrayInitialized){
				this.isInitialized = true;
				// shape is ready to be rendered!
			}
		},


		dispose : function(){

			// dispose vertex arrays
			if(this.isVertexArraysInitialized){
				if(this.isVertexDefined){ this.vertex.dispose(); }
				if(this.isNormalDefined()){ this.normal.dispose(); }
				if(this.isUTangentDefined()){ this.uTangent.dispose(); }
				if(this.isVTangentDefined()){ this.vTangent.dispose(); }
				if(this.isTexCoordDefined()){ this.texCoord.dispose(); }
				if(this.isColorDefined()){ this.color.dispose(); }	
			}

			// dispose element array
			if(this.isElementArrayInitialized){
				this.element.dispose();	
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
function WebGL_ArrayBuffer(dimension, blockData, offset, length){

	// register dimension (for bind operation)
	this.dimension = dimension;

	// Create buffer handle
	this.bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferHandle);

	// Store array data in the current buffer
	// Float32Array.BYTES_PER_ELEMENT=4: 4 bytes per float
	var bufferData = new Float32Array(length);
	for(var i=0; i<length; i++){
		bufferData[i] = blockData.getFloat32((i+offset)*Float32Array.BYTES_PER_ELEMENT, false);
	}
	gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
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
function WebGL_ElementArrayBuffer(dimension, buffer, nbElements){


	switch(dimension){
	case 2 : this.type = gl.LINES; break;
	case 3 : this.type = gl.TRIANGLES; break;
	}

	// register size (for bind operation)
	this.length = nbElements*dimension;

	// Create buffer handle
	this.bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);

	// Store array data in the current buffer
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer), gl.STATIC_DRAW);

}


WebGL_ElementArrayBuffer.prototype = {

		/** Bind the buffer for rendering */
		render : function() {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
			gl.drawElements(this.type, this.length, gl.UNSIGNED_SHORT, 0);
		},

		/** Dispose the buffer */
		dispose : function(){
			gl.deleteBuffer(this.bufferHandle);
		}
};

/**
 * 
 * @param requestText
 * @param callback
 * @returns
 */
/*
function requestTypedArray(requestText, callback) {
	// Set up an asynchronous request
	var request = new XMLHttpRequest();


	// Hook the event that gets called as the request progresses
	request.onreadystatechange = function () {
		// If the request is "DONE" (completed or failed)
		if (request.readyState == 4) {
			// If we got HTTP status 200 (OK)
			if (request.status == 200 || request.status == 0) {
				callback(request);
			}
			// Failed
			else { 
				alert("Request failed");
			}
		}
	};
	
	request.open("POST", serverURL, true);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	request.setRequestHeader('Access-Control-Allow-Origin', "*");
	request.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	request.setRequestHeader('Access-Control-Allow-Headers', 'Cookie, Content-Type, Authorization, Content-Length, X-Requested-With');
	request.setRequestHeader('Access-Control-Expose-Headers', 'Set-Cookie, X-Powered-By');
	
	var token = session.getToken();
	if(token!=null){
		requestText+=token;
	}
	request.send(requestText);
}
*/
