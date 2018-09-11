


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_SurfaceModel(){

	// vertices
	this.vertices = new WebGL_Vector3Buffer();
	
	// normals
	this.normals = new WebGL_Vector3Buffer();
	
	// tex coords
	this.texCoords = new WebGL_Vector2Buffer();
	
	// triangles
	this.triangles = new WebGL_TriangleBuffer();
	
}


WebGL_SurfaceModel.prototype = {

		compile : function(){
			this.vertices.compile();
			this.normals.compile();
			this.texCoords.compile();
			this.triangles.compile();
		}
		
};

