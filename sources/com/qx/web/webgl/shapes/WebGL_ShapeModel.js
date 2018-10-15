
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
function WebGL_ShapeModel(id, graphicSettings, define){
	
	// id
	this.id = id;
	this.graphicSettings = graphicSettings;
	
	// define renderables
	this.renderables = [];
	
	this.isInitialized = false;
	
	// start initialization
	
	
	// server-side definition
	if(define==undefined){ 
		var model = this;
		request("webGL.getShapeModel:id="+this.id, function (response){

			// load settings for geometry eval
			var settings = model.graphicSettings;

			//eval must define the shape, i.e. renderables
			eval(response.responseText);
			
			model.compile();
		});	
	}
	// client-side definition
	else{ 
		define(this);
		this.compile();
	}
}


WebGL_ShapeModel.prototype = {
		
		
	compile : function(){
		// compile renderables
		for(let renderable of this.renderables){
			renderable.compile();
		}
		
		this.isInitialized = true;	
	},
	
	dispose : function(){
		for(let renderable of renderables){ renderable.dispose(); }
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
			shapeModel = new WebGL_ShapeModel(id, this.graphicSettings);	
			this.map.set(id, shapeModel);
		}
		return shapeModel;
	}

};


