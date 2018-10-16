

/*
 * an id is required to build the program
 */
function WebGL_Program(id){
	this.id = id;
	this.isInitialized = false;
	this.displayList = [];
}

WebGL_Program.prototype = {
		
		load : function(onload){
			var program = this;
			
			ctx.request("webGL.getProgram:id="+this.id, function (response){
				
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
				
				onload();
			});
		},
		
		/*
		 * render the styles and shapes
		 */
		draw : function(view, environment){
			if(this.isInitialized){
				// bind shader program
				gl.useProgram(this.handle);
				
				// load context uniforms
				this.bind(view, environment);
			
				// render renderables
				for(var i in this.displayList){
					this.displayList[i].draw(this);
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
		append : function(style){
			this.displayList.push(style);
		},
		
		
		clear : function(){
			for(var i in this.displayList){
				this.displayList[i].clear();
			}
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



function WebGL_Programs(){

	// map for allocation of styles
	this.programs = new Array();
}


WebGL_Programs.prototype = {
	
	/**
	 * get program
	 */
	get : function(id){
		for(var i in this.programs){
			if(this.programs[i].id == id){
				return this.programs[i];
			}
		}
	
		// if style is not present, we create it
		var program = new WebGL_Program(id);
		var that = this;
		
		program.load(function(){
			// sort programs
			that.sort();
			
			// trigger a render to refresh
			scene.render();
		});
		
		// add the newly created program to the list
		this.programs.push(program);
		
		return program;
	},
	
	
	sort : function(){
		// sort the programs by pass index
		this.programs = this.programs.sort(function(a, b){ return a.pass-b.pass; });
	},
	
	draw : function(view, environment){
		// render the programs -> styles -> shapes
		for(var i in this.programs){
			this.programs[i].draw(view, environment);
		}
	},
	
	clear : function(){
		// render the programs -> styles -> shapes
		for(var i in this.programs){
			this.programs[i].clear();
		}
	}

};



