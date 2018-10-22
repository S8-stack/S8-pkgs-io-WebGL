


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireModel(nbVertices=0, nbElements=0){

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// elements
	this.elements = new WebGL_SegmentBuffer(nbElements);

}


WebGL_WireModel.prototype = {
		
		expand : function(nbVertices, nbElements){
			this.vertices.expand(nbVertices);
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

