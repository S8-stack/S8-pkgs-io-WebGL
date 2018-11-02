

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
	this.matrixStack = scene.matrixStack;

	this.pickables = new Chain();

	// program
	this.program = new WebGL_Program("picking");
	this.program.load(function(){
		// nothing to on loaded
	});

	// style hack
	this.program.draw = function(){

		if(this.isInitialized){
			// bind shader program
			gl.useProgram(this.handle);
			
			_this.program.bindSettings();
			
			_this.pickables.crawl(function(instance){

				/*
				 * bind shape
				 */
				gl.uniform3fv(_this.program.loc_Uniform_pickingColor, instance.pickingColor);
				
				// go through renderables of the instance
				for(let shape of instance.shapes){
					// update
					//shape.update();

					// render if OK
					if(shape.isInitialized){
						shape.render(_this.matrixStack, _this.program);
					}
				}
			});

			// reset to default
			_this.program.unbindSettings();
		}
	};


	// setup FBO
	this.width = gl.viewportWidth;
	this.height = gl.viewportHeight;

	/*
	 * 	Build Frame Buffer Object
	 */ 

	// create a framebuffer object 
	this.fbo = gl.createFramebuffer();

	// attach the texture and the render buffer to the frame buffer */ 
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo); 

	/*
	 * Build COLOR_ATTACHMENT0 of Frame Buffer Object
	 */

	/* generate a texture id */ 
	this.tex = gl.createTexture();

	/* bind the texture */ 
	gl.bindTexture(gl.TEXTURE_2D, this.tex);

	/* create the texture in the GPU */ 
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null); 

	/* set texture parameters */ 
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	/* unbind the texture */ 
	gl.bindTexture(gl.TEXTURE_2D, null); 

	/* attach the texture and the render buffer to the frame buffer */ 
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);


	/*
	 * Build DEPTH_ATTACHMENT of Frame Buffer Object
	 */

	/* create a renderbuffer object for the depth buffer */ 
	this.rbo = gl.createRenderbuffer();

	/* bind the texture */ 
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);

	/* create the render buffer in the GPU */ 
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height); 

	/* unbind the render buffer */ 
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.rbo); 

	/*
	 * Error checking
	 */


	if (!gl.isFramebuffer(this.fbo)) {
		throw("Invalid framebuffer");
	}

	var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	switch (status) {
	case gl.FRAMEBUFFER_COMPLETE:
		break;
	case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
		throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
		break;
	case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
		throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
		break;
	case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
		throw("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
		break;
	case gl.FRAMEBUFFER_UNSUPPORTED:
		throw("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
		break;
	default:
		throw("Incomplete framebuffer: " + status);
	}

	/* handle an error : frame buffer incomplete */ 
	/* return to the default frame buffer */ 
	gl.bindFramebuffer(gl.FRAMEBUFFER, null); 




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

}


WebGL_PickingModule.prototype = {


		indexOffset : 32,


		/**
		 * picking
		 */
		pick : function(x, y){

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

			//gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			// render the shapes (in environment=null)
			this.program.draw();

			var pickedColor = new Uint8Array(4); 
			gl.readPixels(x, gl.viewportHeight-y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pickedColor);

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			//alert("r="+pickedColor[0]+", g="+pickedColor[1]+", b="+pickedColor[2]);
			var index = pickedColor[0]+pickedColor[1]*255+pickedColor[2]*65025-this.indexOffset;
			return this.pickables.get(index);
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
			this.pickables.append(this.getPickingIndex(), instance);
			this.incrementIndex();
		}
};

