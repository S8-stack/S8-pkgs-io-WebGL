

/*
 * Picking module
 */

function WebGL_PickingModule(scene){

	// index generator
	this.pc0=this.indexOffset;
	this.pc1=0;
	this.pc2=0;

	// pointer to the scene
	this.scene = scene;
	this.view = scene.view;

	this.pickables = new STRUCT_Chain();
	this.map = new Map();

	// program
	var prgm = WebGL_programs.get("picking");
	prgm.appendListener(this);
	prgm.load();
	this.program = prgm;

	// setup FBO
	this.fbo = new WebGL_FrameBufferObject(gl.viewportWidth, gl.viewportHeight);
	this.fbo.initialize();
	

	// buffer array for picked color
	this.pickedColor = new Uint8Array(4); 


	// default callback
	this.callback = function(event, instance){
		alert("The shape picked has id:"+instance.id);
	}

	var _this = this;
	canvas.addEventListener('click', function(event) { 
		if(event.shiftKey){
			_this.callback(event, _this.pick(event.clientX, event.clientY));	
		}
	}, false);

	this.isPickable = false;
}


WebGL_PickingModule.prototype = {


		indexOffset : 32,

		bind : function(){
			this.fbo.bind();
		},

		unbind : function(){
			/* return to the default frame buffer */ 
			this.fbo.unbind();
			this.isPickable = false;
		},

		render : function(){
			//gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			// render the shapes (in environment=null)
			var _this = this, prgm = this.program;
			if(prgm.isInitialized){

				prgm.bind();

				_this.pickables.iterate(function(handle){

					var instance = handle.instance;
					/*
					 * bind shape
					 */
					gl.uniform3fv(prgm.loc_Uniform_pickingColor, instance.pickingColor);

					// go through renderables of the instance
					for(let shape of instance.shapes){
						shape.render(_this.view, prgm);
					}
				});

				// reset to default
				prgm.unbind();

				this.isPickable = true;	
			}
		},


		/**
		 * picking
		 */
		pick : function(x, y){
			
			if(!this.isPickable){
				this.bind();
				this.render();
			}
			
			if(this.isPickable){
				this.fbo.pick(this.pickedColor, x, y);

				//alert("r="+pickedColor[0]+", g="+pickedColor[1]+", b="+pickedColor[2]);
				var index = this.pickedColor[0]+this.pickedColor[1]*255+this.pickedColor[2]*65535-this.indexOffset;
				return this.map.get(index);	
			}
			else{
				return null;
			}
		},

		incrementIndex : function(){
			this.pc0++;
			if(this.pc0==255){
				this.pc0=0;
				this.pc1++;
				if(this.pc1==255){
					this.pc1=0;
					this.pc2++;
					if(this.pc2==255){
						this.pc2= this.indexOffset;
					}
				}
			}
		},

		getPickingColor : function(){
			return [this.pc0/255.0, this.pc1/255.0, this.pc2/255.0];
		},


		getPickingIndex : function(){
			return this.pc0+this.pc1*255+this.pc2*65025-this.indexOffset;
		},

		append : function(instance){
			instance.pickingColor = this.getPickingColor();

			// append in the picking display list
			var handle = this.pickables.append();
			instance.hPicking = handle;
			handle.instance = instance;

			this.map.set(this.getPickingIndex(), instance);
			this.incrementIndex();
		}
};

