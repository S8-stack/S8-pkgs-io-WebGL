
import { S8 } from "/S8-api/S8Context.js";
import { GL } from "/S8-pkgs-io-WebGL/swgl.js";

/**
 * 
 * 
 * Copyright Pierre Convert (convert.pierre@gmail.com). All rights reserved.
 */
export class Shader {


	/**
	 * @type{WebGL2RenderingContext}
	 */
	gl;

	/**
	 * @type {string}
	 * Pathname
	 */
	pathname;

	/**
	 * @type {string}
	 * Can only be one of : ["vertex", "fragment"]
	 */
	type;

	/**
	 * @type {WebGLShader}
	 */
	handle;


	/**
	 * @type {boolean}
	 */
	isInitiated = false;

	/**
	 * @type {boolean}
	 * Tells whether this shader has been loaded
	 */
	isBuilt = false;

	constructor(pathname, type) {

		// type
		this.type = type;

		// pathname
		switch (this.type) {
			case "vertex": this.pathname = pathname+ "/vertex.vsh"; break;
			case "fragment": this.pathname = pathname + "/fragment.fsh"; break;
			default: throw "Type can only be one of : {vertex, fragment}";
		}
	}

	    /** @param {WebGL2RenderingContext} gl */
		WebGL_relink(gl){
			this.gl = gl;
		}
	

	getWebGLShaderType() {
		switch (this.type) {
			case "vertex": return GL.VERTEX_SHADER;
			case "fragment": return GL.FRAGMENT_SHADER;
			default: throw "Type can only be one of : {vertex, fragment}";
		}
	}


	/**
	 * @param {WebGL2RenderingContext} gl
	 * @param {*} onBuilt 
	 */
	build(onBuilt) {
		if (!this.isInitiated) {

			// lock build access
			this.isInitiated = true;
			let _this = this;

			S8.server.sendRequest_HTTP2_GET(this.pathname, "text",
				function (source) {
					_this.compile(source, onBuilt);
				});
		}
	}


	/**
	 * 
	 * @param {WebGL2RenderingContext} gl
	 * @param {string} source 
	 * @param {Function} onBuilt 
	 */
	compile(source, onBuilt) {

		// Create shader
		this.handle = this.gl.createShader(this.getWebGLShaderType());

		// Attach source code to the shader
		this.gl.shaderSource(this.handle, source);

		// Compile shader
		this.gl.compileShader(this.handle);

		// Check if shader compiles
		if (!this.gl.getShaderParameter(this.handle, GL.COMPILE_STATUS)) {
			console.log(this.type + "-SHADER COMPILE ERRORS");
			console.log(this.gl.getShaderInfoLog(this.handle));
		}

		this.isBuilt = true;

		// run callback
		onBuilt();
	}



	/* </build-section> */



	/**  
	 * Dispose the shader 
	 * @param {WebGL2RenderingContext} gl
	 */
	dispose() {
		this.gl.deleteShader(this.handle);
	}

}
