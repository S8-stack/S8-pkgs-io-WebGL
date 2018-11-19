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
		render : function(matrixStack, program){
			if(this.isInitialized){
				
				// load style uniforms
				program.attachStyle(this);

				this.shapesInstances.iterate(function(entry){
					entry.renderable.render(matrixStack, program);	
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




/**
 * Texture
 */

function WebGL_Texture(pathname){
	this.texture = gl.createTexture();
	this.image = new Image();
	var _this = this;
	this.image.onload = function() {
		_this.initialize();
	};
	this.image.src = pathname;
};

WebGL_Texture.prototype = {

		initialize : function(){
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.bindTexture(gl.TEXTURE_2D, null);
		},

		bind : function(location, index){
			gl.activeTexture(gl.TEXTURE0+index);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(location, index);
		},

		dispose : function(){
			gl.deleteTexture(this.texture);
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

