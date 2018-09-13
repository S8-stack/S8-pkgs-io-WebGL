
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
	
	// define renderables
	this.renderables = [];
	
	this.isInitialized = false;
	
	// start initialization
	var model = this;
	request("webGL.getShapeModel:id="+this.id, function (response){

		//eval must define the shape, i.e. renderables
		eval(response.responseText);
		
		// compile renderables
		for(let renderable of model.renderables){
			renderable.compile();
		}
		
		model.isInitialized = true;
	});
}


WebGL_ShapeModel.prototype = {
	
	dispose : function(){
		for(let renderable of renderables){ renderable.dispose(); }
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
		var shapeModel = this.map.get(id);
		
		// if shape is not present, we create it
		if(shapeModel==undefined){
			shapeModel =new WebGL_ShapeModel(id);	
			this.map.set(id, shapeModel);
		}
		return shapeModel;
	}

};


