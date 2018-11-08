

/** Scene */
function WebGL_Scene(){
	
	// list of programs
	this.programs = new WebGL_Programs();

	// store of styles
	this.styles = new WebGL_Styles();

	// store of shapes models
	this.objectModels = new WebGL_ObjectModels();

	// store of shapes instances
	this.objectInstances = new WebGL_ObjectInstances(this);

	//create view
	this.view = new WebGL_View(this);

	//create environment
	this.environment = new WebGL_Environment(this);


	// <initialize rendering>

	//OpenGL initialization

	//gl.clearColor(0.5, 0.5, 0.8, 1.0);
	this.environment.setBackgroundColor();
	gl.clearStencil(128);

	//Set-up canvas parameters
	gl.enable(gl.DEPTH_TEST);

	// </initialize rendering>
	
	this.matrixStack = new WebGL_MatrixStack(this.view);
	
	this.totalRenderingTime = 0;
	this.nbRenderings = 0;
	this.logNode = document.getElementById("log64");
	
	// create picking module and link it
	this.picking = new WebGL_PickingModule(this);
}


WebGL_Scene.prototype = {


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
		render : function(lod=0){
			
			// timer
			var startTime = performance.now(); 

			// update view
			this.view.update();
			this.environment.update();

			gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

			this.objectInstances.update();
			
			this.programs.render(this.view, this.environment, this.matrixStack, lod);
			// Recommended pattern for frame animation
			
			/*
			var _this = this;
			window.requestAnimFrame(function(){_this.render();}, canvas);
			*/
			

			this.totalRenderingTime+=(performance.now() - startTime);
			this.nbRenderings++;
			var averareRenderingTime = this.totalRenderingTime/this.nbRenderings;
			this.logNode.innerHTML = "rendering time: "+averareRenderingTime+" ms"
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

