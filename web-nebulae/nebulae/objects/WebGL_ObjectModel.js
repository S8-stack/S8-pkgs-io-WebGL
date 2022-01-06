
/**
 * WebGL Shape constructor, methods and utilities
 */


var WebGL_objectModels = {

		map : new Map(),

		push : function(model){
			this.map.set(model.id, model);
		},

		get : function(id){
			var objectModel = this.map.get(id);

			// if shape is not present, we create it
			if(objectModel==undefined){
				objectModel = new WebGL_ObjectModel(id);
				this.map.set(id, objectModel);
			}
			return objectModel;
		}
};




/**
 * Constructor
 *  Dimension is set-up by the length of the array passed as argument. This dimension cannot be changed later on.
 *  
 *  Potential attributes are: vertex, normal, uTangent, vTangent, texCoord, color
 *  
 */
function WebGL_ObjectModel(id){
	this.id = id;
	this.isInitialized = false;
	this.toBeNotified = new STRUCT_Chain();
}


WebGL_ObjectModel.prototype = {

		/*

	model loading is to be defined by client

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
		 */

		compile : function(){
			for(let shape of this.shapes){
				shape.compile();
			}

		},

		/* notify load to instances */
		notify : function(){
			this.toBeNotified.iterate(function(entry){
				entry.ref.render();
				entry.isRemoved = true;
			})
		},

		appendListener : function(instance){
			var entry = this.toBeNotified.append();
			entry.ref = instance;
		},

		dispose : function(){
			for(let shape of this.shapes){
				shape.dispose();
			}
		}
};


