

import { gl } from '../nebulae.js';




/*
 * prgm DB
 */
var WebGL_textures = {
	map: new Map(),
	get: function (pathname) {
		var texture = this.map.get(pathname);
		if (texture == undefined) {
			var texture = new TextureNbUniform(pathname);
			// add the newly created program to the list
			this.map.set(pathname, texture);
		}
		return texture;
	}
};


/**
 * Texture
 */


 export class TextureNbUniform {

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



export class DirectionalLightNbUniform {

	constructor(name) {
		this.name = name;
	}

	link(handle) {
		this.loc_Uniform_light_ambient = gl.getUniformLocation(handle, `${this.name}.ambient`);
		this.loc_Uniform_light_diffuse = gl.getUniformLocation(handle, `${this.name}.diffuse`);
		this.loc_Uniform_light_specular = gl.getUniformLocation(handle, `${this.name}.specular`);
		this.loc_Uniform_light_direction = gl.getUniformLocation(handle, `${this.name}.direction`);
	}


	bind(light) {
		gl.uniform4fv(this.loc_Uniform_light_ambient, light.ambient);
		gl.uniform4fv(this.loc_Uniform_light_diffuse, light.diffuse);
		gl.uniform4fv(this.loc_Uniform_light_specular, light.specular);
		gl.uniform3fv(this.loc_Uniform_light_direction, light.direction);
	}
}



export class MaterialNbUniform {

	constructor(name) {
		this.name = name;
	}

	link(handle) {
		// material
		this.loc_Uniform_material_ambient = gl.getUniformLocation(handle, `${this.name}.ambient`);
		this.loc_Uniform_material_diffuse = gl.getUniformLocation(handle, `${this.name}.diffuse`);
		this.loc_Uniform_material_specular = gl.getUniformLocation(handle, `${this.name}.specular`);
		this.loc_Uniform_material_shininess = gl.getUniformLocation(handle, `${this.name}.shininess`);
	}

	bind(material) {
		gl.uniform4fv(this.loc_Uniform_material_ambient, material.ambient);
		gl.uniform4fv(this.loc_Uniform_material_diffuse, material.diffuse);
		gl.uniform4fv(this.loc_Uniform_material_specular, material.specular);
		gl.uniform1f(this.loc_Uniform_material_shininess, material.shininess);
	}
}
