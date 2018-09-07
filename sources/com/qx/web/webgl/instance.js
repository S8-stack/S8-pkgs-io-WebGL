


/**
 *
 */
function WebGL_ShapeInstance(id, scene){
	this.id = id;
	this.initialize(scene);
}


WebGL_ShapeInstance.prototype = {
	
	/** initialize the scene */
	initialize : function(scene){

		this.isInitialized = false;
		this.isDisposed = false;

		// model matrix to position object
		this.matrix_Model = new Matrix4();
		this.matrix_Model.identity();

		// normal matrix (for shader rendering of normals)
		this.matrix_Normal = new Matrix3();

		// projection view matrix
		this.matrix_ProjectionViewModel = new Matrix4();

		// view model matrix
		this.matrix_ViewModel = new Matrix4();

		// keep pointer
		this.matrix_ProjectionView = scene.view.matrix_ProjectionView;

		// keep pointer
		this.matrix_View = scene.view.matrix_View;
		
		
		// TODO : update picking
		//this.picking.updatePickingColors();
		
		var instance = this;
		
		request("webGL.getShapeInstance:id="+shape.id, function (response){

			if(!this.isDisposed){
				eval(response.responseText);
				/*
				 * eval must define:
				 * var position
				 * var modelId
				 * var modeStyles (String[8][nbRenderables])
				 * var position (float[16])
				 * 
				 */
				
				instance.matrix_Model.c = position;
				
				// build model
				instance.model = scene.shapeModels.get(instance.modelId);
				
				// build renderables
				instance.renderables = new Array();
				for(var index in modeStyles){
					instance.renderables[i] = new WebGL_Renderable(instance, index, modeStyles[index]);
				}
			
				// done...
				instance.isInitialized = true;	
			}
		});
	},
	
	update : function(){
		
		// update matrices
		this.matrix_ProjectionViewModel.multiply(this.matrix_ProjectionView, this.matrix_Model);
		this.matrix_ViewModel.multiply(this.matrix_View, this.matrix_Model);
		this.matrix_Normal.transposeInverse4(this.matrix_ViewModel);
	},
	
	
	setMode : function(modeIndex){
		if(this.modeIndex==undefined || modeIndex!=this.modeIndex){
			for(var index in this.renderables){
				renderables[index].setMode(modeIndex);
			}
			this.modeIndex = modeIndex;
			
			// refresh
			scene.render();
		}
	},
	
	dispose : function(){
		if(this.isInitialized){
			for(var index in this.renderables){
				renderables[index].setMode(modeIndex);
			}
		}
		this.isDisposed = true;
	}
}


/**
 * WebGL Surface object. Sub-part of a shape
 * a model must be defined
 * an instance must be defined
 */
function WebGL_Renderable(instance, index, modeStyles){

	// instance
	this.id = instance.id+'-'+index;
	
	// instance
	this.instance = instance;
	
	// index
	this.index = index;
	
	// flag 
	this.isInitialized = false;
	
	// mode styles
	this.modeStyles = modeStyles;
}


WebGL_Renderable.prototype = {
	
	update : function(){
		if(!this.isInitialized){
			if(this.instance.model.isRenderableModelsInitialized){
				this.model = this.instance.model.renderables[this.index];
				this.isInitialized = true;
			}
		}
	},

	/**
	 * setStyle to a shape
	 */
	setMode : function(modeIndex){

		// detach form current style if any
		if(this.style!=undefined){
			this.style.remove(this.id);	
		}

		// append to new style
		var styleId = this.modeStyles[modeIndex];
		this.style = scene.styles.get(styleId);
		this.style.append(this);
	},
	
	dispose : function(){
		// detach form current style if any
		if(this.style!=undefined){
			this.style.remove(this.id);	
		}
	}
};




function WebGL_ShapeInstances(scene){
	
	// keep reference of scene
	this.scene = scene;
	
	// map for Instance storage
	this.map = new Map();
	
	this.iterator = map.values();
}


WebGL_ShapeInstances.prototype = {
	
	/**
	 * get shape
	 */
	get : function(id){
		var shapeInstance = map.get(id);
		
		// if shape is not present, we create it
		if(shapeInstance==undefined){
			shapeInstance =new WebGL_Shape(id);	
			this.map.set(id, shapeInstance);
			this.iterator = map.values();
		}
		return shapeInstance;
	},
	
	
	delete : function(id){
		var instance = this.map.get(id);
		if(instance!=undefined){
			instance.dispose();
			this.map.delete(id);
			this.iterator = map.values();
		}	
	},

	
	/**
	 * update all instances
	 */
	update : function(){
		for(let instance of this.iterator){
			instance.update();
		}
	},
	
	clear : function(){
		for(let instance of this.iterator){
			instance.dispose();
		}
	}

};

