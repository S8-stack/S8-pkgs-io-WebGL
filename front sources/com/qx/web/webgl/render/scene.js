

/** Scene */
function WebGL_Scene(){

	// list of programs
	this.pipes = new Map();

	// store of shapes instances
	this.objectInstances = new WebGL_ObjectInstances(this);

	//create MVP view
	this.view = new WebGL_ProjectionViewModel(gl.viewportWidth, gl.viewportHeight);

	// create control
	this.control = new WebGL_MouseControl(this, this.view);
	this.control.start();

	//create environment
	this.environment = new WebGL_Environment(this);


	// <initialize rendering>

	//OpenGL initialization

	gl.clearStencil(128);

	//Set-up canvas parameters
	gl.enable(gl.DEPTH_TEST);

	// </initialize rendering>

	this.totalRenderingTime = 0;
	this.nbRenderings = 0;

	// create picking module and link it
	this.picking = new WebGL_PickingModule(this);
}


WebGL_Scene.prototype = {


		getPipe : function(id){
			var pipe = this.pipes.get(id);
			if(pipe==undefined){
				pipe = new WebGL_RenderingPipe(this, id);
				this.pipes.set(id, pipe);
			}
			return pipe;
		},


		/**
		 * [WebGL_Scene API method]
		 * setPickingCallback allows to specify a behaviour if the event of a picking click.
		 * The shape id is passed to the callback function when a picking click occurs.
		 */
		setPickingCallback : function(callback){
			this.picking.callback = callback;

			// do a rendering pass to apply changes
			this.render();
		},


		/**
		 * [WebGL_Scene API method]
		 * clear scene by deleting all shapes
		 */
		clear : function(){

			// remove all instances, keep programs, styles and models
			this.shapeInstances.clear();

			// do a rendering pass to apply changes
			this.render();
		},

		/**
		 * Render
		 */
		render : function(){

			// unbind picking fbo if active
			this.picking.unbind();

			// timer
			var startTime = performance.now(); 

			// update view
			this.view.update();
			this.environment.update();

			gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.clearColor(1.0, 1.0, 1.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

			this.objectInstances.update();

			this.pipes.forEach(value => value.render(this.view, this.environment));


			/*
			// Recommended pattern for frame animation
			var _this = this;
			window.requestAnimFrame(function(){_this.render();}, canvas);
			 */

			// FPS computations
			this.totalRenderingTime+=(performance.now() - startTime);
			this.nbRenderings++;
			var averareRenderingTime = this.totalRenderingTime/this.nbRenderings;
			logNode.innerHTML = "rendering time: "+averareRenderingTime+" ms"
			+"nb renderings: "+this.nbRenderings;
		}

};



/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
		window.setTimeout(callback, 1000/60);
	};
})();

