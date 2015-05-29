




/*
 * an id is required to build the program
 */
function WebGL_Program(id){
	this.id = id;
	this.isInitialized = false;
	this.displayList = [];
	
	
	var program = this;
	
	request("service=WebGL; action=GetProgram; id="+id, function (response){
		
		eval(response.responseText);
		/*
		 * eval must define:
		 *      (String) vertex_shader_source,
		 *      (String) fragment_shader_source
		 *      (function) this.loadContext()
		 * 		(function) this.loadStyle()	
		 */
		
		
		// Build vertex shader
		program.vertexShader = new WebGL_Shader(gl.VERTEX_SHADER, vertex_shader_source);

		// Build fragment shader
		program.fragmentShader = new WebGL_Shader(gl.FRAGMENT_SHADER, fragment_shader_source);

		// Create shader program
		program.handle = gl.createProgram();

		// Attach vertex shader
		gl.attachShader(program.handle, program.vertexShader.handle);

		// Attach vertex shader
		gl.attachShader(program.handle, program.fragmentShader.handle);

		// Link shader program
		gl.linkProgram(program.handle);
		if (!gl.getProgramParameter(program.handle, gl.LINK_STATUS)) {
			alert("Could not initialise shaders : linking problem");
		}
		
		// setup
		program.initialize();
		
		// program is ready to render!
		program.isInitialized = true;
		
		// resort program
		scene.sortProgramPass();
		
		// trigger a render to refresh
		scene.render();
		
	});
	
	
}

WebGL_Program.prototype = {
		
		/*
		 * render the styles and shapes
		 */
		render : function(view, environment){
			if(this.isInitialized){
				// bind shader program
				gl.useProgram(this.handle);
				
				// load context uniforms
				this.bind(view, environment);
			
				// render renderables
				for(var i=0; i<this.displayList.length; i++){
					this.displayList[i].render(this);
				}
				
				// reset to default
				this.unbind();
				
				// unbind program
				//gl.useProgram(0);
			}
		},
		
		
		/*
		 * get shape
		 */
		getStyle : function(id){
			for(var i=0; i<this.displayList.length; i++){
				if(this.displayList[i].id == id){
					return this.displayList[i];
				}
			}
			return null;
		},

		
		/* dispose program-related disposable */
		dispose : function() {
			this.vertexShader.dispose();
			this.fragmentShader.dispose();
			gl.glDeleteProgram(programHandle);
		}
};






/**
 * Shader. For Vertex and Fragment shader
 */
function WebGL_Shader(type, source){

	// Create shader
	this.handle = gl.createShader(type);

	// Attach source code to the shader
	gl.shaderSource(this.handle, source);

	// Compile shader
	gl.compileShader(this.handle);

	// Check if shader compiles
	if (!gl.getShaderParameter(this.handle, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(this.handle));
	}
}


WebGL_Shader.prototype = {
		/**  Dispose the shader */
		dispose : function() {
			gl.glDeleteShader(this.handle);
		}
};

