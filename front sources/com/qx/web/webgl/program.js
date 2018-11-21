



function WebGL_RenderingPipe(scene, id){
	this.scene = scene;
	this.program = WebGL_programs.get(id);
	this.program.appendListener(scene);
	this.program.load();
	this.list = new STRUCT_Chain();
}

WebGL_RenderingPipe.prototype = {

		render : function(view, environment){
			var prgm = this.program;
			if(prgm.isInitialized){

				// setup settings
				prgm.bind(view, environment);

				// render renderables
				this.list.iterate(function(entry){ 
					entry.renderable.render(view, prgm);
				});

				// reset to default
				prgm.unbind();
			}
		},
		
		append : function(renderable){
			var entry = this.list.append();
			entry.renderable = renderable;
			return entry;
		}
}


/*
 * prgm DB
 */
var WebGL_programs = {
		map : new Map(),
		get : function(id){
			var program = this.map.get(id);
			if(program==undefined){
				var program = new WebGL_Program(id);
				// add the newly created program to the list
				this.map.set(id, program);
			}
			return program;
		}
};


/*
 * an id is required to build the program
 */
function WebGL_Program(id){
	this.id = id;
	this.isInitialized = false;
	this.toBeNotified = new STRUCT_Chain();
}

WebGL_Program.prototype = {

		load : function(){
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

				// notify to listener
				program.notify();
				//onload();
			});
		},
		
		/* notify load to instances */
		notify : function(){
			this.toBeNotified.iterate(function(entry){
				entry.ref.render();
				entry.isRemoved = true;
			})
		},
		
		appendListener : function(scene){
			var entry = this.toBeNotified.append();
			entry.ref = scene;
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


/*
function WebGL_GraphicPipe(){

	// map for allocation of styles
	this.programs = new Array();
}


WebGL_GraphicPipe.prototype = {

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

		render : function(view, environment){
			// render the programs -> styles -> shapes

			for(let prgm of this.programs){

				if(prgm.isInitialized){

					// setup settings
					prgm.bind(view, environment);

					// render renderables
					for(let style of prgm.displayList){
						style.render(view, prgm);
					}

					// reset to default
					prgm.unbind();
				}
			}
		},

		clear : function(){
			// render the programs -> styles -> shapes
			for(var i in this.programs){
				this.programs[i].clear();
			}
		}

};
*/



