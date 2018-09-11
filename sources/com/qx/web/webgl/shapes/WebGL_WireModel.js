


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_WireModel(){

	// vertices
	this.vertices = new WebGL_Vector3Buffer();
	
	// segments
	this.segments = new WebGL_SegmentBuffer();
	
}


WebGL_WireModel.prototype = {

		compile : function(){
			this.vertices.compile();
			this.segments.compile();
		}
		
};

