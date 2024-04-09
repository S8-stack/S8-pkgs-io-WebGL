
import { S8 } from "/S8-api/S8Context.js";
import { GL } from "/S8-pkgs-io-WebGL/swgl.js";

/**
 * 
 * 
 * Copyright Pierre Convert (convert.pierre@gmail.com). All rights reserved.
 */
export class Shader {

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
	build(gl, onBuilt) {
		if (!this.isInitiated) {

			// lock build access
			this.isInitiated = true;
			let _this = this;

			S8.server.sendRequest_HTTP2_GET(this.pathname, "text",
				function (source) {
					_this.compile(gl, source, onBuilt);
				});
		}
	}


	/**
	 * 
	 * @param {WebGL2RenderingContext} gl
	 * @param {string} source 
	 * @param {Function} onBuilt 
	 */
	compile(gl, source, onBuilt) {

		// Create shader
		this.handle = gl.createShader(this.getWebGLShaderType());

		// Attach source code to the shader
		gl.shaderSource(this.handle, source);

		// Compile shader
		gl.compileShader(this.handle);

		// Check if shader compiles
		if (!gl.getShaderParameter(this.handle, gl.COMPILE_STATUS)) {
			console.log(this.type + "-SHADER COMPILE ERRORS");
			console.log(gl.getShaderInfoLog(this.handle));
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
	dispose(gl) {
		gl.deleteShader(this.handle);
	}

}
