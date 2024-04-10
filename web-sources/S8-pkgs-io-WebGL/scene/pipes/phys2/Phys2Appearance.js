
import { GL } from "/S8-pkgs-io-WebGL/swgl.js";

import { SWGL_Appearance } from "../SWGL_Appearance.js";
import { Phys2Material } from "./Phys2Material.js";






/**
 * @type {number} number of squares 
 */
export const TEXTURE_SIZE = 1024;


export const MAX_RANGE = 1024 * 1024;



/**
 * CAD_Engine
 * 
 */
export class Phys2Appearance extends SWGL_Appearance {


	/**
	 * @type {Phys2Material[]}
	 */
	materials;

	/**
	 * @type {Phys2Texture2d}
	 */
	emissiveColorsTex = new Phys2Texture2d(TEXTURE_SIZE);

	/**
	 * @type {Phys2Texture2d}
	 */
	diffuseColorsTex = new Phys2Texture2d(TEXTURE_SIZE);

	/**
	 * @type {Phys2Texture2d}
	 */
	specularColorsTex = new Phys2Texture2d(TEXTURE_SIZE);

	/**
	 * @type {Phys2Texture2d}
	 */
	propsTex = new Phys2Texture2d(TEXTURE_SIZE);




	/**
	 * 
	 */
	constructor() {
		super();
	}


	/** 
	 * @param {Phys2Material[]} materials 
	 */
	setMaterials(materials) {

			console.log("[Phys2App] setMaterials");
			//this.materials = materials;

			let nbMaterials = materials.length;
			if (nbMaterials > MAX_RANGE) { throw "error: too many materials"; }


			let n = TEXTURE_SIZE * TEXTURE_SIZE * PIXEL_BYTECOUNT;
			let emissiveColors = new Uint8Array(n);
			let diffuseColors = new Uint8Array(n);
			let specularColors = new Uint8Array(n);
			let props = new Uint8Array(n);

			let offset = 0;
			for (let i = 0; i < nbMaterials; i++) {
				const material = materials[i];

				/* emissive */
				let emissiveColor = material.emissiveColor;
				emissiveColors[offset + 0] = emissiveColor[0];
				emissiveColors[offset + 1] = emissiveColor[1];
				emissiveColors[offset + 2] = emissiveColor[2];
				emissiveColors[offset + 3] = emissiveColor[3];

				/* diffuse */
				let diffuseColor = material.diffuseColor;
				diffuseColors[offset + 0] = diffuseColor[0];
				diffuseColors[offset + 1] = diffuseColor[1];
				diffuseColors[offset + 2] = diffuseColor[2];
				diffuseColors[offset + 3] = diffuseColor[3];

				/* specular */
				let specularColor = material.specularColor;
				specularColors[offset + 0] = specularColor[0];
				specularColors[offset + 1] = specularColor[1];
				specularColors[offset + 2] = specularColor[2];
				specularColors[offset + 3] = specularColor[3];

				/* props */
				props[offset + 0] = material.roughness;
				props[offset + 1] = 0;
				props[offset + 2] = 0;
				props[offset + 3] = 0;

				offset += 4;
			}


			const gl = this.gl;
			this.emissiveColorsTex.setData(gl, emissiveColors);
			this.diffuseColorsTex.setData(gl, diffuseColors);
			this.specularColorsTex.setData(gl, specularColors);
			this.propsTex.setData(gl, props);

	}


	/**
	* 
	* @param {number} x tex-coords xCoordinate
	* @param {number} y tex-coords yCoordinate
	* @param {Phys2Material} material 
	*/
	setMaterial(x, y, material) {
		
			console.log("[Phys2App] start setting Material");
			const props = new Uint8Array(4);
			props[0] = material.roughness;
			

			const gl = this.gl;
			this.emissiveColorsTex.setSubData(gl, x, y, material.emissiveColor);
			this.diffuseColorsTex.setSubData(gl, x, y, material.diffuseColor);
			this.specularColorsTex.setSubData(gl, x, y, material.specularColor);
			this.propsTex.setSubData(gl, x, y, props);
			console.log("[Phys2App] end setting Material");
		
	}


	S8_render() {

	}

	S8_dispose() {
		this.emissiveColorsTex.dispose();
		this.diffuseColorsTex.dispose();
		this.specularColorsTex.dispose();
		this.props.dispose();
	}
}




const PIXEL_BYTECOUNT = 4;


export class Phys2Texture2d {


	isInitialized = false;

	/**
	 * @type { WebGLTexture }
	 */
	baseTexture = null;


	/**
	 * @type {number} base dimension
	 */
	size;


	xdOffset;

	ydOffset;

	/**
	 * 
	 * @param {size} nSquares
	 */
	constructor(size = TEXTURE_SIZE) {
		this.size = size;
		this.xdOffset = PIXEL_BYTECOUNT;
		this.ydOffset = size * PIXEL_BYTECOUNT;
	}


	/**
	 * 
	 * @param{WebGL2RenderingContext} gl
	 * @param {Uint8Array} data 
	 */
	setData(gl, pixels) {

		/* create if does not exist yet */
		if (this.baseTexture == null) { this.baseTexture = gl.createTexture(); }

		/* bind */
		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);

		/* push data */
		gl.texImage2D(gl.TEXTURE_2D, /* target */
			0, /* level */
			gl.RGBA, /* internalformat */
			this.size, /* width */
			this.size, /* height */
			0, /* border: always 0 */
			gl.RGBA, /* format */
			gl.UNSIGNED_BYTE, /* type */
			pixels); /* pixels */

		/* settings */
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

		/* unbind */
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.isInitialized = true;
	}



	/**
	 * 
	 * @param{WebGL2RenderingContext} gl
	 * @param {Object} must have a getColor returning a float[4]
	 */
	store(gl, colorlambda) {

		if (this.baseTexture == null) {
			this.baseTexture = gl.createTexture();
		}

		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);

		/* Flips the source data along its vertical axis if true.	*/
		//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		let pixels = new Uint8Array(this.size * this.size * PIXEL_BYTECOUNT);

		let offset = 0;
		let index = 0;
		for (let iy = 0; iy < this.size; iy++) {
			for (let ix = 0; ix < this.size; ix++) {

				let color = colorlambda(index++);

				/* pixels */
				pixels[offset + 0] = color[0];
				pixels[offset + 1] = color[1];
				pixels[offset + 2] = color[2];
				pixels[offset + 3] = color[3];

				offset += PIXEL_BYTECOUNT;
			}
		}




		gl.texImage2D(gl.TEXTURE_2D, /* target */
			0, /* level */
			gl.RGBA, /* internalformat */
			this.size, /* width */
			this.size, /* height */
			0, /* border: always 0 */
			gl.RGBA, /* format */
			gl.UNSIGNED_BYTE, /* type */
			pixels); /* pixels */

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.isInitialized = true;
	}



	/**
	 * @param{WebGL2RenderingContext} gl
	 * @param {number} x 
	 * @param {number} y 
	 * @param {Uint8Array} pixel 
	 */
	setSubData(gl, x, y, pixel) {
		if (this.baseTexture) {

			/* bind texture */
			gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);

			/* change pixel */
			gl.texSubImage2D(gl.TEXTURE_2D, /* target */
				0, /* level */
				x, y, 1, 1,
				gl.RGBA, /* format */
				gl.UNSIGNED_BYTE, /* type */
				pixel); /* pixels */

			/* unbind texture */
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}



	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 * @param {*} index 
	 */
	bind(gl, index) {
		if (this.isInitialized) {

			// activate texture unit
			gl.activeTexture(GL.TEXTURE0 + index);

			// bind texture data (for previously selected texture unit)
			gl.bindTexture(GL.TEXTURE_2D, this.baseTexture);

		}
	}

	/**
	 * 
	 * @param{WebGL2RenderingContext} gl
	 */
	dispose(gl) {
		if (this.baseTexture != null) {
			gl.deleteTexture(this.baseTexture);
		}
	}
}