
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
function WebGL_ObjectModel(){
	this.isInitialized = false;
}


WebGL_ObjectModel.prototype = {
	
	load : function(id){
		this.id = id;
		var model = this;
		ctx.request("webGL.getObjectModel:id="+this.id, function (response){
			
			//eval must define the shape, i.e. renderables
			// settings is defined in the context of the response eval
			model.shapes = eval(response.responseText);
			model.compile();
		});
	},
		
	compile : function(){
		if(!this.isInitialized){
			// compile renderables
			for(let shape of this.shapes){
				shape.compile();
			}
			this.isInitialized = true;
		}
	},
	
	dispose : function(){
		for(let shape of this.shapes){
			shape.dispose();
		}
	}
};


function WebGL_ObjectModels(grahicSettings){
	
	// map for model storage
	this.map = new Map();
}


WebGL_ObjectModels.prototype = {
	
	push : function(model){
		this.map.set(model.id, model);
	},
		
	/**
	 * get shape
	 */
	get : function(id){
		var objectModel = this.map.get(id);
		
		// if shape is not present, we create it
		if(objectModel==undefined){
			objectModel = new WebGL_ObjectModel();	
			objectModel.load(id);
			this.map.set(id, objectModel);
		}
		return objectModel;
	}
};


