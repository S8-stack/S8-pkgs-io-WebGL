import { Phys2dMaterial } from "/s8-io-swgl/appearances/phys2/Phys2Material.js";
import { gl } from "swgl.js";
import { SWGL_Texture2d } from "textures/SWGL_Texture2d.js";
import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { SWGL_Appearance } from "/s8-io-swgl/appearances/SWGL_Appearance.js";






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
	 * @type {Phys2dMaterial[]}
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
	 * @param {Phys2dMaterial[]} materials 
	 */
	S8_set_materials(materials) {
		this.materials = materials;

		let nbMaterials = materials.length;
		if (nbMaterials > MAX_NB_MATERIALS) { throw "error: too many materials"; }


		let n = TEXTURE_NB_SQUARES * TEXTURE_NB_SQUARES * PIXEL_BYTECOUNT;
		let emissiveColors = new Uint8Array(n);
		let diffuseColors = new Uint8Array(n);
		let specularColors = new Uint8Array(n);
		let props = new Uint8Array(n);

		let offset = 0;
		for (let i = 0; i < nbMaterials; i++) {
			let material = materials[i];

			let emissiveColor = material.emissiveColor;
			emissiveColors[offset + 0] = emissiveColor[0];
			emissiveColors[offset + 1] = emissiveColor[1];
			emissiveColors[offset + 2] = emissiveColor[2];
			emissiveColors[offset + 3] = emissiveColor[3];

			let diffuseColor = material.diffuseColor;
			diffuseColors[offset + 0] = diffuseColor[0];
			diffuseColors[offset + 1] = diffuseColor[1];
			diffuseColors[offset + 2] = diffuseColor[2];
			diffuseColors[offset + 3] = diffuseColor[3];

			let specularColor = material.specularColor;
			specularColors[offset + 0] = specularColor[0];
			specularColors[offset + 1] = specularColor[1];
			specularColors[offset + 2] = specularColor[2];
			specularColors[offset + 3] = specularColor[3];

			props[offset + 0] = material.glossiness;
			props[offset + 1] = material.roughness;
			props[offset + 2] = 0;
			props[offset + 3] = 0;

			offset += 4;
		}

		this.emissiveColorsTex.store(emissiveColors);
		this.diffuseColorsTex.store(diffuseColors);
		this.specularColorsTex.store(specularColors);
		this.propsTex.store(props);
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



	/**
	 * @type { WebGLTexture }
	 */
	baseTexture;


	/**
	 * @type {number} base dimension
	 */
	n;


	dxOffset;

	dyOffset;

	/**
	 * 
	 * @param {*} nSquares 
	 * @param {*} squareSize 
	 */
	constructor(n = TEXTURE_SIZE) {
		this.n = n;
		this.dxOffset = PIXEL_BYTECOUNT;
		this.dyOffset = n * PIXEL_BYTECOUNT;
	}

	initialize() {
		this.baseTexture = gl.createTexture();
	}


	/**
	 * 
	 * @param {Object} must have a getColor returning a float[4]
	 */
	store(colorlambda) {

		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);

		/* Flips the source data along its vertical axis if true.	*/
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		let pixels = new Uint8Array(this.n * this.n * PIXEL_BYTECOUNT);

		let offset0 = 0;
		let index = 0;
		for (let iy = 0; iy < this.n; iy++) {
			let offset = offset0;
			for (let ix = 0; ix < this.n; ix++) {

				let color = colorlambda(index++);

				/* pixels */
				pixels[offset + 0] = color[0];
				pixels[offset + 1] = color[1];
				pixels[offset + 2] = color[2];
				pixels[offset + 3] = color[3];

				offset += this.dxOffset;
			}
			offset0 += this.dyOffset;
		}


		gl.texImage2D(gl.TEXTURE_2D, /* target */
			0, /* level */
			gl.RGBA, /* internalformat */
			width /* width */, height /* height */, 0/* border: always 0 */,
			gl.RGBA, /* format */
			gl.UNSIGNED_BYTE, /* type */
			pixels); /* pixels */

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.isInitialized = true;
	}

	bind(index) {
		gl.activeTexture(gl.TEXTURE0 + index);
		gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);
	}

	dispose() {
		gl.deleteTexture(this.baseTexture);
	}
}