
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(){
	
	// identity pattern
	this.pattern = function(targetMatrix, callback){
		targetMatrix.origin();
		callback();
	}
}


WebGL_ShapeModel.prototype = {
		
		getNumberOfVertices : function(){
			return this.vertices.getNumberOfVectors();
		},
		
		getNumberOfElements : function(){
			return this.elements.getNumberOfElements();
		},
		
		render : function(matrixStack, program){
			var that = this;
			this.pattern(matrixStack.modelAffine, function(){

				// update Model
				matrixStack.compute();
				
				// bind matrices
				program.bindMatrixStack(matrixStack);

				// render
				that.elements.render();
			});
		}
};




/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_Wire(nbVertices=0, nbElements=0){
	WebGL_ShapeModel.call(this);

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// elements
	this.elements = new WebGL_SegmentBuffer(nbElements);

}


WebGL_Wire.prototype = {
		
		getNumberOfVertices : WebGL_ShapeModel.prototype.getNumberOfVertices,
		
		getNumberOfElements : WebGL_ShapeModel.prototype.getNumberOfElements,
		
		render : WebGL_ShapeModel.prototype.render,
		
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
function WebGL_Surface(nbVertices=0, nbElements=0){
	WebGL_ShapeModel.call(this);

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// normals
	this.normals = new WebGL_Vector3Buffer(nbVertices);

	// tex coords
	this.texCoords = new WebGL_Vector2Buffer(nbVertices);

	// elements
	this.elements = new WebGL_TriangleBuffer(nbElements);

}


WebGL_Surface.prototype = {

		getNumberOfVertices : WebGL_ShapeModel.prototype.getNumberOfVertices,
		
		getNumberOfElements : WebGL_ShapeModel.prototype.getNumberOfElements,
		
		render : WebGL_ShapeModel.prototype.render,

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
			this.segments.dispose();
		},
		
		transform : function(affine, target, offset){
			this.vertices.transformVertices(affine, target.vertices);
			this.normals.transformNormals(affine, target.normals);
			this.elements.shift(offset, target.elements);
		}
};


