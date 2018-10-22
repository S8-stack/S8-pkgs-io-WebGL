
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
	this.id = id;
	this.isInitialized = false;
}


WebGL_ShapeModel.prototype = {
	
	load : function(settings){
		var model = this;
		ctx.request("webGL.getShapeModel:id="+this.id, function (response){
			
			//eval must define the shape, i.e. renderables
			// settings is defined in the context of the response eval
			model.renderables = eval(response.responseText);
			model.compile();
		});
	},
		
	compile : function(){
		if(!this.isInitialized){
			// compile renderables
			for(let renderable of this.renderables){
				renderable.compile();
			}
			this.isInitialized = true;
		}
	},
	
	dispose : function(){
		for(let renderable of this.renderables){
			renderable.dispose();
		}
	}
};


function WebGL_ShapeModels(grahicSettings){
	
	// map for model storage
	this.map = new Map();
	
	this.graphicSettings = new WebGL_GraphicSettings();
}


WebGL_ShapeModels.prototype = {
	
	push : function(model){
		this.map.set(model.id, model);
	},
		
	/**
	 * get shape
	 */
	get : function(id){
		var shapeModel = this.map.get(id);
		
		// if shape is not present, we create it
		if(shapeModel==undefined){
			shapeModel = new WebGL_ShapeModel(id);	
			shapeModel.load(this.graphicSettings);
			this.map.set(id, shapeModel);
		}
		return shapeModel;
	}
};


