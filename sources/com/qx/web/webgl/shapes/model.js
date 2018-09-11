
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
function WebGL_ShapeModel(id){
	
	// id
	this.id = id;
	
	this.initialize();
}


WebGL_ShapeModel.prototype = {

	/** initialize the shape model */
	initialize : function(){
		

		// flags
		this.isInitialized = false;
		this.isRenderablesInitialized = false;
		this.isVertexArraysInitialized = false;
		this.isElementArrayInitialized = false;
		
		var shape = this;

		request("webGL.getShapeModel:id="+shape.id, function (response){

			eval(response.responseText);
			/*
			 * eval must define:
			 * 
			 * shape.isWireEnabled
			 * shape.nbWireVertices
			 * shape.nbWireSegments
			 * 
			 * shape.isSurfaceEnabled
			 * shape.nbSurfaceVertices
			 * shape.nbSurfaceTraingles
			 * 
			 * shape.renderables = [ 
			 * 		new WebGL_Wire(12,0),
			 * 		new WebGL_Wire(128,12),
			 * 		new WebGL_Surface(12,0),
			 * 		new WebGL_Surface(128,12)
			 * 	];
			 * 
			 */

			shape.isRenderablesInitialized = true;

			// <vertices block array block>
			request("webGL.getVertexArraysBlock:id="+shape.id, function (response){
				var arrayBuffer = response.response;
				
				var blockData = new DataView(arrayBuffer);
				
				var offset = 0, length;

				// wire
				if(shape.isWireEnabled){
					// load wire vertices buffer
					length = 3*shape.nbWireVertices;
					shape.wireVertices=new WebGL_ArrayBuffer(3, blockData, offset, length);
					offset+=length;	
				}
				
				// surface
				if(shape.isSurfaceEnabled){
					
					// load wire vertices buffer
					length = 3*shape.nbSurfaceVertices;
					shape.surfaceVertices=new WebGL_ArrayBuffer(3, blockData, offset, length);
					offset+=length;	
					
					// normal
					length = 3*shape.nbSurfaceVertices;
					shape.surfaceNormals=new WebGL_ArrayBuffer(3, blockData, offset, length);
					offset+=length;

					// texCoord
					length = 2*shape.nbSurfaceVertices;
					shape.surfaceTexCoords=new WebGL_ArrayBuffer(2, blockData, offset, length);
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
			request("webGL.getElementArraysBlock:id="+shape.id, function (response){
				var buffer = response.response;
				var offset = 0, length;
				
				// wire
				if(shape.nbWireSegments>0){
					shape.wireSegments=new WebGL_ElementArrayBuffer(2, buffer, offset, shape.nbWireSegments);
					offset+=2*shape.nbWireSegments;
				}
				
				// surface
				if(shape.isSurfaceEnabled){
					shape.surfaceTriangles=new WebGL_ElementArrayBuffer(3, buffer, offset, shape.nbSurfaceTriangles);	
				}

				// flagged as done
				shape.isElementArrayInitialized = true;

				// trigger redraw
				//scene.render();
			},
			function(xhr){
				xhr.responseType = "arraybuffer";
			});
			// </elements array block>

		});
	},

	update : function(){
		
		// update status
		if(!this.isInitialized && this.isVertexArraysInitialized && this.isElementArrayInitialized){
			this.isInitialized = true;
			// shape is now ready to be rendered!
		}
	},
	
	dispose : function(){

		// dispose vertex arrays
		if(this.isVertexArraysInitialized){
			
			// wire
			if(this.isWireEnabled){
				this.wireVertices.dispose();
			}
			
			// surface
			if(this.isSurfaceEnabled){
				this.surfaceVertices.dispose();
				this.surfaceNormals.dispose();
				this.surfaceTexCoords.dispose();
			}
		}

		// dispose element array
		if(this.isElementArrayInitialized){
			// wire
			if(this.isWireEnabled){
				this.wireSegments.dispose();
			}
			
			// surface
			if(this.isSurfaceEnabled){
				this.surfaceTriangles.dispose();
			}
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
	bind : function(location, offset) {

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
function WebGL_ElementArrayBuffer(dimension, buffer, offset, nbElements){


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
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(buffer, offset, length), gl.STATIC_DRAW);

}


WebGL_ElementArrayBuffer.prototype = {

	/** Bind the buffer for rendering */
	bind : function() {
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferHandle);
	},

	/** Dispose the buffer */
	dispose : function(){
		gl.deleteBuffer(this.bufferHandle);
	}
};



/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireModel(verticesOffset, segmentsOffset, segmentsLength){

	// offset
	this.verticesOffset = 3*verticesOffset;
	
	// offset
	this.segmentsOffset = 2*segmentsOffset;
	
	// register size (for bind operation)
	this.segmentsLength = segmentsLength;
}


WebGL_WireModel.prototype = {

		render : function() {
						
			// draw elements
			gl.drawElements(gl.LINES, this.segmentsLength, gl.UNSIGNED_SHORT, this.segmentsOffset);
		}
};


/**
 * WebGL Surface object. Sub-part of a shape
 */
function WebGL_SurfaceModel(verticesOffset, trianglesOffset, trianglesLength){

	// offset
	this.verticesOffset = 3*verticesOffset;
	
	// offset
	this.trianglesOffset = 3*trianglesOffset;
	
	// register size (for bind operation)
	this.trianglesLength = trianglesLength;
}


WebGL_SurfaceModel.prototype = {

		render : function() {
			
			// draw elements
			gl.drawElements(gl.TRIANGLES, this.trianglesLength, gl.UNSIGNED_SHORT, this.trianglesOffset);
		}
};


function WebGL_ShapeModels(){
	
	// map for model storage
	this.map = new Map();
}


WebGL_ShapeModels.prototype = {
	
	/**
	 * get shape
	 */
	get : function(id){
		var shapeModel = map.get(id);
		
		// if shape is not present, we create it
		if(shapeModel==undefined){
			shapeModel =new WebGL_Shape(id);	
			map.set(id, shapeModel);
		}
		return shapeModel;
	}

};


