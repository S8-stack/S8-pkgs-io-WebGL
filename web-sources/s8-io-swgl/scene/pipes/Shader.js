import { S8 } from "/s8-io-bohr-atom/S8.js";
import { gl } from "/s8-io-swgl/swgl.js";

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
			case "vertex": return gl.VERTEX_SHADER;
			case "fragment": return gl.FRAGMENT_SHADER;
			default: throw "Type can only be one of : {vertex, fragment}";
		}
	}


	/**
	 * 
	 * @param {*} onBuilt 
	 */
	build(onBuilt) {
		if (!this.isInitiated) {

			// lock build access
			this.isInitiated = true;
			let _this = this;

			S8.sendRequest_HTTP2_GET(this.pathname, "text",
				function (source) {
					_this.compile(source, onBuilt);
				});
		}
	}


	/**
	 * 
	 * @param {string} source 
	 * @param {Function} onBuilt 
	 */
	compile(source, onBuilt) {

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
	 */
	dispose() {
		gl.deleteShader(this.handle);
	}

}
