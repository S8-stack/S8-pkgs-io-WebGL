

export class WebGL_RenderingPipe {

	constructor(scene, id) {
		this.scene = scene;
		this.program = WebGL_programs.get(id);
		this.program.appendListener(scene);
		this.program.load();
		this.list = new STRUCT_Chain();
	}



	render(view, environment) {
		let prgm = this.program;
		if (prgm.isInitialized) {

			// bind
			prgm.bind();

			// set view
			prgm.setView(view);

			// set env
			prgm.setEnvironment(environment);

			// render renderables
			this.list.iterate(function (entry) {
				entry.renderable.render(view, prgm);
			});

			// reset to default
			prgm.unbind();
		}
	}

	append(renderable) {
		var entry = this.list.append();
		entry.renderable = renderable;
		return entry;
	}
}


/*
 * prgm DB
 */
export const WebGL_programs = {
	map: new Map(),
	get: function (id) {
		var program = this.map.get(id);
		if (program == undefined) {
			var program = new WebGL_Program(id);
			// add the newly created program to the list
			this.map.set(id, program);
		}
		return program;
	}
};



/*
 * prgm DB
 */
var WebGL_textures = {
	map: new Map(),
	get: function (pathname) {
		var texture = this.map.get(pathname);
		if (texture == undefined) {
			var texture = new WebGL_Texture(pathname);
			// add the newly created program to the list
			this.map.set(pathname, texture);
		}
		return texture;
	}
};




class WebGL_Program_Sources {

	constructor() {

	}

	parse(input) {

		// Build vertex shader
		this.vertex_shader_source = input.getStringUTF8();

		// Build fragment shader
		this.fragment_shader_source = input.getStringUTF8();

		// setup other functions
		this.js_source = input.getStringUTF8();
	}

	resolve(objects) {
		// nothing to resolve
	}

	build(objects) {
		// nothing to resolve
	}
};


export class WebGL_Program {


	/*
	 * an id is required to build the program
	 */
	constructor(id, pathname) {
		this.id = id;
		this.shaderRootPathname = pathname;

		// pass index for rendering sort (default is 1)
		this.pass = 1;

		// matrices
		this.isModelViewProjectionMatrixEnabled = false;
		this.isModelViewMatrixEnabled = false;
		this.isNormalMatrixEnabled = false;

		// attributes
		this.isVertexAttributeEnabled = false;
		this.isNormalAttributeEnabled = false;
		this.isTexCoordAttributeEnabled = false;
		this.isColorAttributeEnabled = false;
		this.isTangentsAttributeEnabled = false;

	
		this.uniformElements = [];

		// build status
		this.isVertexShaderLoaded = false;
		this.isFragmentShaderLoaded = false;
		this.isInitialized = false;

		this.toBeNotified = new STRUCT_Chain();
	}

	load() {
		if(!this.isInitialized){
			let program = this;

			S8.sendRequest_GET(
				"/poly3d/webgl/programs/" + this.shaderRootPathname + "/vertex.vsh", 
				"text", 
				function (source) { program.buildVertexShader(source); });
	
			S8.sendRequest_GET(
				"/poly3d/webgl/programs/" + this.shaderRootPathname + "/fragment.fsh",
				"text", 
				function (source) { program.buildFragmentShader(source); });
		}
	}


	buildVertexShader(source){
		this.vertexShader = new WebGL_Shader(gl.VERTEX_SHADER, source);
		this.isVertexShaderLoaded = true;
		this.buildProgram();
	}

	buildFragmentShader(source){
		this.fragmentShader = new WebGL_Shader(gl.FRAGMENT_SHADER, source);
		this.isFragmentShaderLoaded = true;
		this.buildProgram();
	}

	buildProgram(){
		if (!this.isInitialized && 
			this.isVertexShaderLoaded && this.isVertexShaderLoaded) {
			// Create shader program
			this.handle = gl.createProgram();

			// Attach vertex shader
			gl.attachShader(this.handle, this.vertexShader.handle);

			// Attach vertex shader
			gl.attachShader(this.handle, this.fragmentShader.handle);

			// Link shader program
			gl.linkProgram(this.handle);
			if (!gl.getProgramParameter(this.handle, gl.LINK_STATUS)) {
				alert("Could not initialise shaders : linking problem");
			}

			// setup
			this.initialize();

			// program is ready to render!
			this.isInitialized = true;

			// notify to listener
			this.notify();
		}
	}

	link(){

		// Get uniforms locations
	
		// MVP
		if(this.isModelViewProjectionMatrixEnabled) {
			this.loc_Uniform_matrix_MVP = 
				gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		}

		// MV
		if(this.isModelViewMatrixEnabled) {
			this.loc_Uniform_matrix_MV = 
				gl.getUniformLocation(this.handle, "ModelView_Matrix");
		}

		if(this.isNormalMatrixEnabled) {
			this.loc_Uniform_matrix_N = 
				gl.getUniformLocation(this.handle, "Normal_Matrix");
		}

		// Get attributes locations
		if(this.isVertexAttributeEnabled){
			this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
		}
	
		if(this.isNormalAttributeEnabled){
			this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");
		}

		if(this.isTexCoordAttributeEnabled){
			this.loc_Attribute_texCoord = gl.getAttribLocation(this.handle, "texCoord");
		}

		if(this.isColorAttributeEnabled){
			this.loc_Attribute_color = gl.getAttribLocation(this.handle, "color");	
		}

		if(this.isTangentsAttributeEnabled){
			this.loc_Attribute_uTangent = gl.getAttribLocation(this.handle, "uTangent");
			this.loc_Attribute_vTangent = gl.getAttribLocation(this.handle, "vTangent");
		}
	}


	bind(){
		// bind shader program
		gl.useProgram(this.handle);

		/* <attributes> */ 
		if(this.isVertexAttributeEnabled){
			gl.enableVertexAttribArray(this.loc_Attribute_vertex);
		}

		if(this.isNormalAttributeEnabled){
			gl.enableVertexAttribArray(this.loc_Attribute_normal);
		}
		
		if(this.isTexCoordAttributeEnabled){
			gl.enableVertexAttribArray(this.loc_Attribute_texCoord);
		}

		if(this.isColorAttributeEnabled){
			gl.enableVertexAttribArray(this.loc_Attribute_color);
		}
		/* </attributes> */
	}


	bindMesh(mesh){
		if(this.isVertexAttributeEnabled){
			mesh.vertices.bind(this.loc_Attribute_vertex);
		}

		if(this.isNormalAttributeEnabled){
			mesh.normals.bind(this.loc_Attribute_normal);
		}

		if(this.isTexCoordAttributeEnabled){
			mesh.texCoords.bind(this.loc_Attribute_texCoord);
		}

		if(this.isColorAttributeEnabled){
			mesh.colors.bind(this.loc_Attribute_color);
		}

		if(this.isTangentsAttributeEnabled){
			mesh.uTangents.bind(this.loc_Attribute_uTangent);
			mesh.vTangents.bind(this.loc_Attribute_vTangent);
		}
		
		// elements
		mesh.elements.bind();
	};


	bindEnvironment(environment){ // to be overridden... }

	bindView(view){
		if(this.isModelViewProjectionMatrixEnabled){
			gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
		}

		if(this.isModelViewMatrixEnabled){
			gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, view.matrix_ViewModel.c);
		}

		if(this.isNormalAttributeEnabled){
			gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, view.matrix_Normal.c);
		}
	};

	/* notify load to instances */
	notify() {
		this.toBeNotified.iterate(function (entry) {
			entry.ref.render();
			entry.isRemoved = true;
		})
	}

	appendListener(scene) {
		var entry = this.toBeNotified.append();
		entry.ref = scene;
	}


	unbind(){
			// unbind shader program
			gl.useProgram(0);

			/* <attributes> */ 
			if(this.isVertexAttributeEnabled){
				gl.disableVertexAttribArray(this.loc_Attribute_vertex);
			}
	
			if(this.isNormalAttributeEnabled){
				gl.disableVertexAttribArray(this.loc_Attribute_normal);
			}
			
			if(this.isTexCoordAttributeEnabled){
				gl.disableVertexAttribArray(this.loc_Attribute_texCoord);
			}

			if(this.isColorAttributeEnabled){
				gl.disableVertexAttribArray(this.loc_Attribute_color);
			}

			if(this.isTangentsAttributeEnabled){
				gl.disableVertexAttribArray(this.loc_Attribute_uTangent);
				gl.disableVertexAttribArray(this.loc_Attribute_vTangent);
			}
		/* </attributes> */ 
		
	};
	


	/* dispose program-related disposable */
	dispose() {
		this.vertexShader.dispose();
		this.fragmentShader.dispose();
		gl.glDeleteProgram(programHandle);
	}
};






/**
 * Shader. For Vertex and Fragment shader
 */
class WebGL_Shader {

	constructor(type, source) {

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


	/**  Dispose the shader */
	dispose() {
		gl.glDeleteShader(this.handle);
	}
}





/**
 * Texture
 */


export class WebGL_Texture {

	constructor(pathname) {
		super();
		this.isInitialized = false;
		this.texture = gl.createTexture();
		this.image = new Image();
		var that = this;
		this.image.onload = function () {
			that.initialize();
		};
		this.image.src = pathname;
	}

	initialize() {
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.isInitialized = true;
	}

	bind(location, index) {
		if (this.isInitialized) {
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(location, index);
		}
	}

	dispose() {
		gl.deleteTexture(this.texture);
	}
};



export class WebGL_DirectionalLightUniform {

	constructor(name){
		this.name = name;
	}

	link(prgmHandle){
		this.loc_Uniform_light_ambient = gl.getUniformLocation(prgmHandle, `${this.name}.ambient`);
		this.loc_Uniform_light_diffuse = gl.getUniformLocation(prgmHandle, `${this.name}.diffuse`);
		this.loc_Uniform_light_specular = gl.getUniformLocation(prgmHandle, `${this.name}.specular`);
		this.loc_Uniform_light_direction = gl.getUniformLocation(prgmHandle, `${this.name}.direction`);
	}


	set(light){
		gl.uniform4fv(this.loc_Uniform_light_ambient, light.ambient);
		gl.uniform4fv(this.loc_Uniform_light_diffuse, light.diffuse);
		gl.uniform4fv(this.loc_Uniform_light_specular, light.specular);
		gl.uniform3fv(this.loc_Uniform_light_direction, light.direction);	
	}
}



export class WebGL_MaterialUniform {

	constructor(name){
		this.name = name;
	}

	link(prgmHandle){
		// material
		this.loc_Uniform_material_ambient = gl.getUniformLocation(prgmHandle, `${this.name}.ambient`);	
		this.loc_Uniform_material_diffuse = gl.getUniformLocation(prgmHandle, `${this.name}.diffuse`);
		this.loc_Uniform_material_specular = gl.getUniformLocation(prgmHandle, `${this.name}.specular`);
		this.loc_Uniform_material_shininess = gl.getUniformLocation(prgmHandle, `${this.name}.shininess`);
	}

	set(material){
		gl.uniform4fv(this.loc_Uniform_material_ambient, material.ambient);
		gl.uniform4fv(this.loc_Uniform_material_diffuse, material.diffuse);
		gl.uniform4fv(this.loc_Uniform_material_specular, material.specular);
		gl.uniform1f(this.loc_Uniform_material_shininess, material.shininess);	
	}
}
