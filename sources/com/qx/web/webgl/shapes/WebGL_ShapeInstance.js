


/**
 *
 */
function WebGL_ShapeInstance(id, scene){

	// id
	this.id = id;
	
	// mode
	this.mode = 0;

	this.isInitialized = false;
	this.isDisposed = false;

	// model matrix to position object
	this.matrix_Model = new WebGL_Matrix4();
	this.matrix_Model.identity();

	// normal matrix (for shader rendering of normals)
	this.matrix_Normal = new WebGL_Matrix3();

	// projection view matrix
	this.matrix_ProjectionViewModel = new WebGL_Matrix4();

	// view model matrix
	this.matrix_ViewModel = new WebGL_Matrix4();

	// keep pointer
	this.matrix_ProjectionView = scene.view.matrix_ProjectionView;

	// keep pointer
	this.matrix_View = scene.view.matrix_View;


	// TODO : update picking
	//this.picking.updatePickingColors();

	var instance = this;

	request("webGL.getShapeInstance:id="+instance.id, function (response){

		if(!instance.isDisposed){
			
			eval(response.responseText);
			
			
			/*
			 * eval must define:
			 * var modelId
			 * var position (float[16])
			 * var styles (String[8][nbRenderables])
			 * 
			 */

			instance.matrix_Model.c = position;

			// build model
			instance.model = scene.shapeModels.get(modelId);

			// build renderables
			instance.renderables = new Array();
			for(var index in styles){
				instance.renderables.push(new WebGL_ShapeInstanceRenderable(instance, index, styles[index]));
			}

			// done...
			instance.isInitialized = true;
			
			// update modes
			for(var index in instance.renderables){
				instance.renderables[index].setMode(instance.mode);
			}
		}
	});
}


WebGL_ShapeInstance.prototype = {


		update : function(){

			// update matrices
			this.matrix_ProjectionViewModel.multiply(this.matrix_ProjectionView, this.matrix_Model);
			this.matrix_ViewModel.multiply(this.matrix_View, this.matrix_Model);
			this.matrix_Normal.transposeInverse4(this.matrix_ViewModel);
		},


		setMode : function(mode){
			if(mode!=this.mode){
				for(var index in this.renderables){
					this.renderables[index].setMode(mode);
				}
				this.mode = mode;

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
function WebGL_ShapeInstanceRenderable(instance, index, styles){

	// instance
	this.id = instance.id+'-'+index;

	// instance
	this.instance = instance;

	// index
	this.index = index;

	// flag 
	this.isInitialized = false;

	// mode styles
	this.styles = styles;
}


WebGL_ShapeInstanceRenderable.prototype = {

		update : function(){
			if(!this.isInitialized){
				if(this.instance.model.isInitialized){
					this.model = this.instance.model.renderables[this.index];
					this.isInitialized = true;
				}
			}
		},

		/**
		 * setStyle to a shape
		 */
		setMode : function(mode){

			// detach form current style if any
			if(this.style!=undefined){
				this.style.remove(this.id);	
			}

			// append to new style
			var styleId = this.styles[mode];
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
	this.chain = new Chain();
	
	this.scene = scene;
}


WebGL_ShapeInstances.prototype = {

		/**
		 * update all instances
		 */
		update : function(){
			this.chain.crawl(function(instance){
				instance.update();
			});
		},

		/**
		 * get shape
		 */
		get : function(id){
			var instance = this.chain.get(id);

			// if shape is not present, we create it
			if(instance==undefined){
				instance = new WebGL_ShapeInstance(id, this.scene);	
				this.chain.append(id, instance);
			}
			return instance;
		},

		remove : function(id){
			this.chain.remove(id);
		},

		clear : function(){
			//TODO
		}

};

