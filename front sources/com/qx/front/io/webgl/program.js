

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

				// bind
				prgm.bind();
				
				// set view
				prgm.setView(view);
				
				// set env
				prgm.setEnvironment(environment);

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


function WebGL_Program_Sources(){
}

BOHR_TYPES.set(WEBGL_BOHR_PREFIX+0x2, WebGL_Program_Sources);

WebGL_Program_Sources.prototype = {

		parse : function(input){

			// Build vertex shader
			this.vertex_shader_source = input.getStringUTF8();

			// Build fragment shader
			this.fragment_shader_source = input.getStringUTF8();

			// setup other functions
			this.js_source = input.getStringUTF8();
		},

		resolve : function(objects){
			// nothing to resolve
		},

		build : function(objects){
			// nothing to resolve
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

			let request = new POST_BohrRequest(ctx, glBkAddress, 0x08, 64);
			request.putStringUTF8(this.id);

			request.send(function(response){

				// Build vertex shader
				program.vertexShader = 
					new WebGL_Shader(gl.VERTEX_SHADER, response.vertex_shader_source);

				// Build fragment shader
				program.fragmentShader = 
					new WebGL_Shader(gl.FRAGMENT_SHADER, response.fragment_shader_source);

				// add missing methods
				eval(response.js_source);

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
 * prgm DB
 */
var WebGL_textures = {
		map : new Map(),
		get : function(pathname){
			var texture = this.map.get(pathname);
			if(texture==undefined){
				var texture = new WebGL_Texture(pathname);
				// add the newly created program to the list
				this.map.set(pathname, texture);
			}
			return texture;
		}
};




/**
 * Texture
 */

function WebGL_Texture(pathname){
	this.isInitialized = false;
	this.texture = gl.createTexture();
	this.image = new Image();
	var that = this;
	this.image.onload = function() {
		that.initialize();
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
			this.isInitialized = true;
		},

		bind : function(location, index){
			if(this.isInitialized){
				gl.activeTexture(gl.TEXTURE0+index);
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.uniform1i(location, index);	
			}
		},

		dispose : function(){
			gl.deleteTexture(this.texture);
		}
};

