/**
 * 
 * Shader program constructor
 * 
 * @param gl : OpenGL context
 * @param serializedShader : XML-based description of the shader
 * 
 */
function WebGL_Style(id){

	this.id = id;

	this.shapesInstances = new STRUCT_Chain();

	this.isInitialized = false;

	// start initialization
	var style = this;

	ctx.request("webGL.getStyle:id="+id, function (response){
		eval(response.responseText);
		/*
		 * eval must define:
		 * 		programId
		 *      <Uniforms>
		 * 		(function) this.dispose()	
		 */

		style.initialize();
		style.isInitialized = true;

		// from now on, the program is ready to render!
		scene.pipe.get(style.programId).append(style);

		scene.render();
	});
}


WebGL_Style.prototype = {

		/**
		 * render the styles and shapes
		 */
		render : function(view, program){
			if(this.isInitialized){
				
				// load style uniforms
				program.attachStyle(this);

				this.shapesInstances.iterate(function(entry){
					entry.renderable.render(view, program);	
				});
			}
		},


		/*
		 * append shape
		 */
		append : function(){
			return this.shapesInstances.append();
		},

		remove : function(renderableId){
			// append to chain
			this.shapesInstances.remove(renderable.id);
		},

		clear : function(){
			// append to chain
			this.shapesInstances.clear(renderable.id);
		}
};












function WebGL_Styles(){

	// map for allocation of styles
	this.map = new Map();
}

WebGL_Styles.prototype = {

		/**
		 * get style
		 */
		get : function(id){

			var style = this.map.get(id);
			if(style==undefined){
				// if style is not present, we create it
				style=new WebGL_Style(id);
				this.map.set(id, style);	
			}
			return style;
		}
};

