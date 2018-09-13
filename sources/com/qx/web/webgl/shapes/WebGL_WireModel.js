


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireModel(){

	// vertices
	this.vertices = new WebGL_Vector3Buffer();
	
	// elements
	this.elements = new WebGL_SegmentBuffer();
	
}


WebGL_WireModel.prototype = {

	compile : function(){
		this.vertices.compile();
		this.elements.compile();
	},

	dispose : function(){
		this.vertices.dispose();
		this.elements.dispose();
	}	
};

