
/**
 * WebGL Shape constructor, methods and utilities
 */
function WebGL_ShapeModel(){

}


WebGL_ShapeModel.prototype = {


		/**
		 * 
		 */
		createRenderables : function(instanceAffines){
			var renderables = new Array(4);
			for(var i=0; i<4; i++){
				renderables[i] = this.meshes[i].createRenderable(instanceAffines);
			}
			return renderables;
		},
		
		compile : function(){
			for(var i=0; i<4; i++){
				this.meshes[i].compile();
			}
		},

		dispose : function(){
			for(var i=0; i<4; i++){
				this.meshes[i].dispose();
			}
		}
};


/**
 * WebGL_WireModel
 */
function WebGL_WireModel(){
	WebGL_ShapeModel.call();

	// level of details
	this.meshes = new Array(4);
	for(var i=0; i<4; i++){
		this.meshes[i] = new WebGL_WireMesh();
	}
}

WebGL_WireModel.prototype = {
		createRenderables : WebGL_ShapeModel.prototype.createRenderables,
		compile : WebGL_ShapeModel.prototype.compile,
		dispose : WebGL_ShapeModel.prototype.dispose
};





/**
 * WebGL_SurfaceModel
 */
function WebGL_SurfaceModel(){
	WebGL_ShapeModel.call();

	// level of details
	this.meshes = new Array(4);
	for(var i=0; i<4; i++){
		this.meshes[i] = new WebGL_SurfaceMesh();
	}
}

WebGL_SurfaceModel.prototype = {
		createRenderables : WebGL_ShapeModel.prototype.createRenderables,
		compile : WebGL_ShapeModel.prototype.compile,
		dispose : WebGL_ShapeModel.prototype.dispose
};

