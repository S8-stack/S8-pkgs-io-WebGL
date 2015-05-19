

/** Scene */
function WebGL_Scene(){

	// list of programs
	this.programs = [];

	// list of styles
	this.styles = [];

	// list of shapes
	this.shapes = [];

	//create view
	this.view = new WebGL_View(this);

	//create environment
	this.environment = new WebGL_Environment(this);

	// create picking module and link it
	this.picking = new WebGL_PickingModule(this);

	// <initialize rendering>

	//OpenGL initialization

	//gl.clearColor(0.5, 0.5, 0.8, 1.0);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clearStencil(128);

	//Set-up canvas parameters
	gl.enable(gl.DEPTH_TEST);

	// </initialize rendering>

}


WebGL_Scene.prototype = {



		/**
		 * [WebGL_Scene API method]
		 * setShapeStyle allows to start the rendering of a given shape with a specific style.
		 */
		setShapeStyle: function(shapeId, styleId){
			// retrieve shape
			var shape = this.getShape(shapeId);
			shape.setStyle(styleId);
			
			// do a rendering pass to apply changes
			this.render();
		},

		/**
		 * [WebGL_Scene API method]
		 * deleteShape allows to delete a shape. The shape is disposed and removed from current style displayList automatically.
		 */
		deleteShape : function(shapeId){
			// retrieve shape
			var shape = this.getShape(shapeId);

			// remove shape from style displayList
			shape.style.removeShape(shapeId);

			// remove shape from scene
			this.removeShape(shapeId);
			this.picking.updatePickingColors();

			// dispose object
			shape.dispose();
			
			// do a rendering pass to apply changes
			this.render();
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
		 * Render
		 */
		render : function(){

			// update view
			this.view.update();
			this.environment.update();

			gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

			// render the programs -> styles -> shapes
			for(var i=0; i<this.programs.length; i++){
				this.programs[i].render(this.view, this.environment);
			}

			// Recommended pattern for frame animation
			
			/*
			var _this = this;
			window.requestAnimFrame(function(){_this.render();}, canvas);
			*/
		},


		/**
		 * get program
		 */
		getProgram : function(id){
			for(var i=0; i<this.programs.length; i++){
				if(this.programs[i].id == id){
					return this.programs[i];
				}
			}

			// if style is not present, we create it
			var program = new WebGL_Program(id);
			this.programs.push(program);
			return program;
		},

		/**
		 * get style
		 */
		getStyle : function(id){
			for(var i=0; i<this.styles.length; i++){
				if(this.styles[i].id == id){
					return this.styles[i];
				}
			}

			// if style is not present, we create it
			var style=new WebGL_Style(id);
			this.styles.push(style);
			return style;
		},

		/**
		 * get shape
		 */
		getShape : function(id){
			for(var i=0; i<this.shapes.length; i++){
				if(this.shapes[i].id == id){
					return this.shapes[i];
				}
			}

			// if shape is not present, we create it
			var shape=new WebGL_Shape(id, this);
			this.shapes.push(shape);
			this.picking.updatePickingColors();
			return shape;
		},


		/**
		 * 
		 */
		removeShape : function(id){	
			i=0; n=this.shapes.length; index=-1;
			while(index==-1 && i<n){
				if(this.shapes[i].id == id){
					index = i;
				}
				else{
					i++;	
				}
			}
			this.shapes.splice(index, 1);
			this.picking.updatePickingColors();
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
