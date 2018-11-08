


/**
 *
 */
function WebGL_ObjectInstance(id, scene){

	// id
	this.id = id;
	
	// mode
	this.mode = 0;

	this.isInitialized = false;
	this.isDisposed = false;

	// identity pattern
	this.affine = new Math3d_Affine();
}

// single position pattern
function createSinglePattern(positionCoefficients){
	var affine = new MathAffine3();
	affine.setCoefficients(positionCoefficients, 0);
	return function(targetMatrix, callback){
		affine.copy(targetMatrix);
		callback();
	};
}


WebGL_ObjectInstance.prototype = {
		
		
		load : function(){
			var instance = this;
			ctx.request("webGL.getObjectInstance:id="+instance.id, function (response){

				if(!instance.isDisposed){
					
					eval(response.responseText);
					
					/*
					 * eval must define:
					 * var modelId
					 * var position (float[16])
					 * var styles (String[8][nbRenderables])
					 * 
					 */
					
					// single position pattern
					instance.affine.setCoefficients(positionCoefficients, 0);

					// build model
					instance.model = scene.objectModels.get(modelId);
					
					// set styles
					instance.setStyles(styles);
				}
			});
		},
		
		
		initialize : function(){
			if(!this.isInitialized){
				
				
				this.isInitialized = true;
			}
			return this.isInitialized;
		},
		
		setStyles : function(styles){
			
			// build renderables
			this.shapes = new Array();
			for(var index in styles){
				this.shapes.push(new WebGL_ShapeInstance(this, index, styles[index]));
			}

			// done...
			this.isInitialized = true;
			
			// update modes for display
			for(let shape of this.shapes){
				shape.setMode(this.mode);
			}
			
			// update picking
			scene.picking.append(this);
		},

		setMode : function(mode){
			if(mode!=this.mode){
				for(var index in this.shapes){
					this.shapes[index].setMode(mode);
				}
				this.mode = mode;

				// refresh
				scene.render();
			}
		},
		

		dispose : function(){
			if(this.isInitialized){
				for(var index in this.shapes){
					this.shapes[index].dispose();
				}
			}
			this.isDisposed = true;
		}
}



function WebGL_ObjectInstances(scene){
	
	// map
	this.map = new Map();
	this.toBeInitialized = new STRUCT_Chain();

	// keep reference of scene
	this.scene = scene;
}


WebGL_ObjectInstances.prototype = {

		/**
		 * update all instances
		 */
		update : function(){
			var isInitialized;
			this.toBeInitialized.iterate(function(instance){
				if(instance.initialize()){
					instance.entry.isRemoved = true;
				}
			});
		},
		
		
		/**
		 * 
		 */
		push(instance){
			this.toBeBuilt.append(instance.id, instance);
		},

		
		/**
		 * get shape
		 */
		get : function(id){
			var instance = this.chain.get(id);

			// if shape is not present, we create it
			if(instance==undefined){
				instance = new WebGL_ObjectInstance(id, this.scene);
				instance.load();
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

