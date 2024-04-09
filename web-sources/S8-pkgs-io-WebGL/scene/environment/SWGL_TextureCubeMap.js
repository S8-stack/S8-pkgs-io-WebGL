
import { NeObject } from "/S8-core-bohr-neon/NeObject.js";

import { GL } from "/S8-pkgs-io-WebGL/swgl.js";



const FACE_TARGETS = [
	GL.TEXTURE_CUBE_MAP_POSITIVE_X,
	GL.TEXTURE_CUBE_MAP_NEGATIVE_X,
	GL.TEXTURE_CUBE_MAP_POSITIVE_Y,
	GL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
	GL.TEXTURE_CUBE_MAP_POSITIVE_Z,
	GL.TEXTURE_CUBE_MAP_NEGATIVE_Z];


/**
	 * @type{string[]}
	 */
const FACE_SUFFIXES = [
	"posx",
	"negx",
	"posy",
	"negy",
	"posz",
	"negz"];

/**
 * 
 */
export class SWGL_TextureCubeMap extends NeObject {


	isLoaded = false;

	isLoadingInitiated = false;

	/** @type {string} */
	pathname;

	/** @type {string} */
	extension;

	/** @param {number} */
	nbLevels;

	/**
	 * @param {WebGLTexture}
	 */
	cubeTexture = null;

	/**
	 * 
	 * @param {*} id 
	 */
	constructor() {
		super();
	}


	/** @param {string} pathname */
	S8_set_pathname(pathname) {
		this.pathname = pathname;
	}

	/** @param {string} extension */
	S8_set_extension(extension) {
		this.extension = extension;
	}

	/** @param {number} nbLevels */
	S8_set_nbLevels(nbLevels) {
		this.nbLevels = nbLevels;
	}

	S8_render() {
		this.load();
	}


	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 */
	load(gl) {
		if (!this.isLoaded && !this.isLoadingInitiated) {
			
			let _this = this;
			new TextureCubeMapLoader(this.pathname, this.extension, this.nbLevels, function(faceImages){
				_this.assemble(gl, faceImages);
			}).load();

			this.isLoadingInitiated = true;
		}
	}


	/**
	 * @param {WebGL2RenderingContext} gl
	 * @param {Image[]} faceImages 
	 */
	assemble(gl, faceImages){
		this.cubeTexture = gl.createTexture();
		gl.bindTexture(GL.TEXTURE_CUBE_MAP, this.cubeTexture);

		// minification filter -> must hint mip-map processing if necessary
		if (this.nbLevels > 1) {
			gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
		}
		else {
			gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		}

		// magnification filter (no effect on mipmap)
		gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);

		// define level of details for cubemap
		gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_BASE_LEVEL, 0);
		gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_LEVEL, this.nbLevels - 1);


		for (let lod = 0; lod < this.nbLevels; lod++) {
			for (let iFace = 0; iFace < 6; iFace++) {
				let target = FACE_TARGETS[iFace];
				let image = faceImages[ 6 * lod + iFace];				
				gl.texImage2D(target, lod, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
			}
		}
		gl.bindTexture(GL.TEXTURE_CUBE_MAP, null);
		this.isLoaded = true;
	}


	/**
	 * @param {WebGL2RenderingContext} gl 
	 * @param {*} index 
	 */
	bind(gl, index) {
		if(this.isLoaded){
			gl.activeTexture(GL.TEXTURE0 + index);
			gl.bindTexture(GL.TEXTURE_CUBE_MAP, this.cubeTexture);
			//gl.uniform1i(location, index);
		}
	}


	S8_dispose() {
	}


	/**
	 * For initializing
	 * @param {string} pathname 
	 * @param {string} extension 
	 * @param {string} nbLevels 
	 * @returns 
	 */
	static create(pathname, extension, nbLevels) {
		let cubeMap = new SWGL_TextureCubeMap();
		cubeMap.pathname = pathname;
		cubeMap.extension = extension;
		cubeMap.nbLevels = nbLevels;
		//cubeMap.load();
		return cubeMap;
	}


}




class TextureCubeMapLoader {



	/** 
	 * @type{string}
	*/
	rootPathname;

	/**
	 * @type{string}
	 */
	extension;

	/**
	 * @type{number}
	 */
	nbLevels;


	/**
	 * @type {boolean}
	 */
	isLoaded;

	/**
	 * @type{boolean[]} 
	 */
	isFaceLoaded;


	/**
	 * @type{Image[]}
	 */
	faceImages;

	/**
	 * @type {function}
	 */
	callback;


	constructor(rootPathname, extension, nbLevels, callback) {
		this.rootPathname = rootPathname;
		this.extension = extension;
		this.nbLevels = nbLevels;
		this.callback = callback;
	}


	/**
	 * 
	 */
	load() {

		this.isFaceLoaded = new Array(6 * this.nbLevels);
		this.faceImages = new Array(6 * this.nbLevels);
		for (let lod = 0; lod < this.nbLevels; lod++) {
			for (let iFace = 0; iFace < 6; iFace++) {

				let index = 6 * lod + iFace;

				let image = new Image();
				this.faceImages[index] = image;

				let that = this;
				image.onload = function () {

					// report face has been loaded
					that.isFaceLoaded[index] = true;
					if (that.areAllFacesLoaded()) {
						that.isLoaded = true;
						that.callback(that.faceImages);
					}
				};

				// trigger load
				let pathname = this.rootPathname + '_' + lod + '_' + FACE_SUFFIXES[iFace] + this.extension;
				image.src = pathname;
			}
		}
	}

	areAllFacesLoaded() {
		let n = 6 * this.nbLevels;
		for (let i = 0; i < n; i++) {
			if (!this.isFaceLoaded[i]) {
				return false;
			}
		}
		return true;
	}

}