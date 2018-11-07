
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(){
	// no affines
}


WebGL_ShapeModel.prototype = {

		render : function(matrixStack, program, affine){

			// bind vertex attributes buffer handles (program is doing the
			// picking of the appropriate vertices attributes)
			program.bindVertexAttributes(this);

			// bind elements buffer (only one element buffer)
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementBufferHandle);

			// update stack
			matrixStack.setModel(affine);

			// bind matrices
			program.bindMatrixStack(matrixStack);

			// trigger render by drawing elements
			gl.drawElements(this.elementType, this.nbElements, gl.UNSIGNED_SHORT, 0);
		},

		pattern : function(affines, target){
			for(let affine of affines){
				this.transform(affine, target);
			}
		}
};


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireModel(){
	WebGL_ShapeModel.call(this);
	this.vertices = new Array();
	this.elementType = gl.LINES;
	this.elements = new Array();
}


WebGL_WireModel.prototype = {
		
		transform : function(affine, target){
			var targetVertices = target.vertices;
			var targetSegments = target.segments;

			var transformedVertex;
			var offset = targetVertices.length;

			// vertex
			for(let vertex of this.vertices){
				transformedVertex = new Math3d_Vector();
				affine.transformVertex(vertex, transformedVertex);
				targetVertices.push(transformedVertex);
			}

			// elements
			for(let index of this.elements){
				targetSegments.push(offset+index);
			}
		},

		pattern : WebGL_ShapeModel.prototype.pattern,

		pushVertex : function(vertex){
			this.vertices.push(vertex);
		},
		
		setVertices : function(buffer){
			var n = buffer.length/3;
			this.vertices = new Array(n);
			var index = 0;
			for(var i=0; i<n; i++){
				this.vertices[i] = new Math3d_Vector(buffer[index+0], buffer[index+1], buffer[index+2]);
				index+=3;
			}
		},
		
		setIndices : function(buffer){
			var n = buffer.length;
			this.indices = new Array(n);
			for(var i=0; i<n; i++){
				this.indices[i] = buffer[i];
			}
		},
		
		pushSegment : function(i0, i1){
			this.elements.push(i0);
			this.elements.push(i1);
		},

		compile : function(){

			// vertex buffer handle
			this.vertexBufferHandle = WebGL_ArrayBuffer.createVector3dBuffer(this.vertices);

			// normal buffer handle
			this.nbElements = this.elements.length;
			this.elementBufferHandle = WebGL_ArrayBuffer.createElementBuffer(this.elements);
		},

		render : WebGL_ShapeModel.prototype.render,

		dispose : function(){
			gl.deleteBuffer(this.vertexBufferHandle);
			gl.deleteBuffer(this.elementBufferHandle);
		}
};



/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_SurfaceModel(){
	WebGL_ShapeModel.call(this);
	this.vertices = new Array();
	this.normals = new Array();
	this.elementType = gl.TRIANGLES;
	this.elements = new Array();
}


WebGL_SurfaceModel.prototype = {


		transform : function(affine, target){
			var targetVertices = target.vertices;
			var targetNormals = target.normals;
			var targetElements = target.elements;

			var transformedVertex, transformedNormal;
			var offset = targetVertices.length;

			// vertex
			for(let vertex of this.vertices){
				transformedVertex = new Math3d_Vector();
				affine.transformPoint(vertex, transformedVertex);
				targetVertices.push(transformedVertex);
			}

			// normals
			for(let normal of this.normals){
				transformedNormal = new Math3d_Vector();
				affine.transformVector(vertex, transformedNormal);
				targetNormals.push(transformedNormal);
			}

			// elements
			for(let index of this.elements){
				targetElements.push(offset+index);
			}
		},

		pattern : WebGL_ShapeModel.prototype.pattern,


		pushVertex : function(vertex){
			this.vertices.push(vertex);
		},

		pushNormal : function(normal){
			this.normals.push(normal);
		},
		
		pushTriangle : function(i0, i1, i2){
			this.elements.push(i0);
			this.elements.push(i1);
			this.elements.push(i2);
		},

		compile : function(){

			// vertex buffer handle
			this.vertexBufferHandle = WebGL_ArrayBuffer.createVector3dBuffer(this.vertices);

			// vertex buffer handle
			this.normalBufferHandle = WebGL_ArrayBuffer.createVector3dBuffer(this.normals);

			// normal buffer handle
			this.nbElements = this.elements.length;
			this.elementBufferHandle = WebGL_ArrayBuffer.createElementBuffer(this.elements);
		},

		render : WebGL_ShapeModel.prototype.render,

		dispose : function(){
			gl.deleteBuffer(this.vertexBufferHandle);
			gl.deleteBuffer(this.normalBufferHandle);
			gl.deleteBuffer(this.elementBufferHandle);
		}
};



var WebGL_ArrayBuffer = {};

WebGL_ArrayBuffer.createVector2dBuffer = function(vectors){

	// create array
	var array = new Float32Array(2*vectors.length);
	var offset = 0;
	for(let vector of vectors){
		array[offset+0] = vector.x;
		array[offset+1] = vector.y;
		offset+=2;
	}

	// Create buffer handle
	var bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferHandle);

	// store data in GPU
	gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

	return bufferHandle;
}


WebGL_ArrayBuffer.createVector3dBuffer = function(vectors){

	// create array
	var array = new Float32Array(3*vectors.length);
	var offset = 0;
	for(let vector of vectors){
		array[offset+0] = vector.x;
		array[offset+1] = vector.y;
		array[offset+2] = vector.z;
		offset+=3;
	}

	// Create buffer handle
	var bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferHandle);

	// store data in GPU
	gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

	return bufferHandle;
}


WebGL_ArrayBuffer.createElementBuffer = function(indices){

	// create and populate array
	var array = new Uint16Array(indices.length);
	array.set(indices);

	// Create buffer handle
	var bufferHandle = gl.createBuffer();

	// Bind buffer handle to current buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferHandle);

	// bind buffer data
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);

	return bufferHandle;
}
