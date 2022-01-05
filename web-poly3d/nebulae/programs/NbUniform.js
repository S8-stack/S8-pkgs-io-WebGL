
import { NbModel } from '../meshes/NbModel.js';
import { gl } from '../nebular.js';
import * as M4 from '../maths/NbMatrix4d.js';



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
			var texture = new TextureNbUniform(pathname);
			// add the newly created program to the list
			this.map.set(pathname, texture);
		}
		return texture;
	}
};



export class NbRenderingPipe {

	constructor(){
	}

	BOHR_set(code, value){
		switch(code){
			case 0x02: this.prgmName = value; break;
			case 0x04: this.appearances = value; break;
			default: "Unsupported code: "+code;
		}
	}



	BOHR_render(code, value){
		// do nothing
	}

	render() {
		if (this.program.isBuilt) {
			// enable program
			this.program.enable();

			// render appearnce
			let nAppearances = this.appearances.length;
			for (let i = 0; i < nAppearances; i++) {
				this.appearances[i].render(this.program);
			}

			// disable program
			this.program.disable();
		}
		else {
			// start loading
			this.program.load();
		}		
	}

}








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






export class MaterialNbUniform {

	constructor(name) {
		this.name = name;
	}

	link(prgmHandle) {
		// material
		this.loc_Uniform_material_ambient = gl.getUniformLocation(prgmHandle, `${this.name}.ambient`);
		this.loc_Uniform_material_diffuse = gl.getUniformLocation(prgmHandle, `${this.name}.diffuse`);
		this.loc_Uniform_material_specular = gl.getUniformLocation(prgmHandle, `${this.name}.specular`);
		this.loc_Uniform_material_shininess = gl.getUniformLocation(prgmHandle, `${this.name}.shininess`);
	}

	set(material) {
		gl.uniform4fv(this.loc_Uniform_material_ambient, material.ambient);
		gl.uniform4fv(this.loc_Uniform_material_diffuse, material.diffuse);
		gl.uniform4fv(this.loc_Uniform_material_specular, material.specular);
		gl.uniform1f(this.loc_Uniform_material_shininess, material.shininess);
	}
}


export class NbAppearance {

	constructor(){
		this.models = [];
	}

	BOHR_set(code, value) {
		switch(code){
			case 0x02: this.models = value; break;
		}
	}


}