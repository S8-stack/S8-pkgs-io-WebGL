

/*
 * Picking module
 */

function WebGL_OffScreenRenderingUnit(width, height){

	this.width = width;
	this.height = height;

	// setup FBO
	this.fbo = new WebGL_FrameBufferObject(this.width, this.height, 1);
	this.fbo.initialize();

	// Create a 2D canvas to store the result
	this.canvas2d = document.createElement("canvas");
	this.canvas2d.width = this.width;
	this.canvas2d.height = this.height;
	this.context2d = this.canvas2d.getContext('2d');

}


WebGL_OffScreenRenderingUnit.prototype = {

		/**
		 * Render
		 */
		render : function(scene){

			// <initialize rendering>


			this.fbo.bind();

			//this.fbo.bind();
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			//this.environment.setBackgroundColor();
			gl.clearStencil(128);
			//this.fbo.unbind();
			
			//Set-up canvas parameters
			gl.enable(gl.DEPTH_TEST);
			

			gl.viewport(0, 0, this.width, this.height);

			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
			//OpenGL initialization


			// </initialize rendering>
			
			
			scene.draw(this.environment);


			// read data out of FBO
			var data = new Uint8Array(4 * this.width * this.height);
			gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);


			gl.clearColor(1.0, 1.0, 1.0, 1.0);
			this.fbo.unbind();

			// Copy the pixels to a 2D canvas
			var imageData = this.context2d.createImageData(this.width, this.height);
			imageData.data.set(data);
			this.context2d.putImageData(imageData, 0, 0);

			//background-image = 
			scene.node.style.backgroundImage = "url('"+this.canvas2d.toDataURL()+"')";
		}
};




/*
 * Picking module
 */

function WebGL_OffScreenScene(unit, node){

	this.unit = unit;
	
	this.node = node;
	
	//	rendering pipes	
	this.pipes = new Map();

	// store of shapes instances
	this.objectInstances = new WebGL_ObjectInstances(this);

	// view
	this.view = new WebGL_ProjectionViewModel(unit.width, unit.height);
	
	//create environment
	this.environment = new WebGL_Environment(this);

}


WebGL_OffScreenScene.prototype = {


		getPipe : function(id){
			var pipe = this.pipes.get(id);
			if(pipe==undefined){
				pipe = new WebGL_RenderingPipe(this, id);
				this.pipes.set(id, pipe);
			}
			return pipe;
		},

		render : function(){
			this.unit.render(this);
		},

		/**
		 * Render
		 */
		draw : function(){

			// update view
			this.environment.update();
			this.view.update();
			this.objectInstances.update();
			this.pipes.forEach(value => value.render(this.view, this.environment));
		}
};


