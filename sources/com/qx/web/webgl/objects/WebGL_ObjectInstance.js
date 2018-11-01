


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
	this.affines = [new MathAffine3()];
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
					instance.affines[0].setCoefficients(positionCoefficients, 0);

					// build model
					instance.model = scene.objectModels.get(modelId);
					
					// set styles
					instance.setStyles(styles);
				}
			});
		},
		
		setStyles : function(styles){
			

			// build renderables
			this.shapeInstances = new Array();
			for(var index in styles){
				this.shapeInstances.push(new WebGL_ShapeInstance(this, index, styles[index]));
			}

			// done...
			this.isInitialized = true;
			
			// update modes for display
			for(let shapeInstance of this.shapeInstances){
				shapeInstance.setMode(this.mode);
			}
			
			// update picking
			scene.picking.append(this);
		},

		setMode : function(mode){
			if(mode!=this.mode){
				for(var index in this.shapeInstances){
					this.shapeInstances[index].setMode(mode);
				}
				this.mode = mode;

				// refresh
				scene.render();
			}
		},
		

		dispose : function(){
			if(this.isInitialized){
				for(var index in this.shapeInstances){
					this.shapeInstances[index].dispose();
				}
			}
			this.isDisposed = true;
		}
}



function WebGL_ObjectInstances(scene){

	// keep reference of scene
	this.chain = new Chain();
	
	this.scene = scene;
}


WebGL_ObjectInstances.prototype = {

		/**
		 * update all instances
		 */
		update : function(){
			this.chain.crawl(function(instance){
				instance.update();
			});
		},
		
		
		push(instance){
			this.chain.append(instance.id, instance);
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

