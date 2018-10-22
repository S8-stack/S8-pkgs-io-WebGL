


/**
 * WebGL Wire object. Sub-part of a shape
 */
function WebGL_SurfaceModel(nbVertices=0, nbElements=0){

	// vertices
	this.vertices = new WebGL_Vector3Buffer(nbVertices);

	// normals
	this.normals = new WebGL_Vector3Buffer(nbVertices);

	// tex coords
	this.texCoords = new WebGL_Vector2Buffer(nbVertices);

	// elements
	this.elements = new WebGL_TriangleBuffer(nbElements);

}


WebGL_SurfaceModel.prototype = {


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

