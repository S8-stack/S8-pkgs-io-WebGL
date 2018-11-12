


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
	this.affines = [new Math3d_Affine()];

	// model
	this.model = null;
}

//single position pattern
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
					 * 
					 */

					// single position pattern
					var affine = new Math3d_Affine();
					affine.setCoefficients(positionCoefficients, 0);
					instance.affines = [affine];

					// build model
					instance.model = scene.objectModels.get(modelId);

					// refresh
					scene.render();
				}
			});
		},


		initialize : function(){
			if(!this.isInitialized && this.model!=null && this.model.isInitialized){

				this.shapes = new Array();
				var shape;
				for(let shapeModel of this.model.shapes){
					shape = new WebGL_ShapeInstance(this, shapeModel);
					this.shapes.push(shape);
					shape.start();
				}
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
			this.toBeInitialized.iterate(function(instance){
				if(instance.initialize()){
					instance.entry.isRemoved = true;
				}
			});
		},


		/**
		 * 
		 */
		push : function(instance){
			this.map.set(instance.id, instance);
			this.toBeInitialized.append(instance);
		},


		/**
		 * get shape
		 */
		get : function(id){
			var instance = this.map.get(id);

			// if shape is not present, we create it
			if(instance==undefined){
				instance = new WebGL_ObjectInstance(id, this.scene);
				instance.load();
				this.push(instance);
			}
			return instance;
		},

		remove : function(id){
			this.map.remove(id);
		},

		clear : function(){
			//TODO
		}

};

