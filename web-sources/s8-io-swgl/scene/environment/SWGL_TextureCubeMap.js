
import { NeObject } from "/s8-io-bohr-neon/NeObject.js";
import { gl } from "/s8-io-swgl/swgl.js";



const FACE_TARGETS = [
	gl.TEXTURE_CUBE_MAP_POSITIVE_X,
	gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
	gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
	gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
	gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
	gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];


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


	load() {
		if (!this.isLoadingInitiated) {
			
			let _this = this;
			new TextureCubeMapLoader(this.pathname, this.extension, this.nbLevels, function(faceImages){
				_this.assemble(faceImages);
			}).load();

			this.isLoadingInitiated = true;
		}
	}


	/**
	 * 
	 * @param {Image[]} faceImages 
	 */
	assemble(faceImages){
		this.cubeTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);

		// minification filter -> must hint mip-map processing if necessary
		if (this.nbLevels > 1) {
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		}
		else {
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}

		// magnification filter (no effect on mipmap)
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		// define level of details for cubemap
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_BASE_LEVEL, 0);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, this.nbLevels - 1);


		for (let lod = 0; lod < this.nbLevels; lod++) {
			for (let iFace = 0; iFace < 6; iFace++) {
				let target = FACE_TARGETS[iFace];
				let image = faceImages[ 6 * lod + iFace];				
				gl.texImage2D(target, lod, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			}
		}
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		this.isLoaded = true;
	}


	bind(index) {
		if(this.isLoaded){
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
			//gl.uniform1i(location, index);
		}
	}


	/**
	 * For initializing
	 * @param {string} pathname 
	 * @param {string} extension 
	 * @param {string} nbLevels 
	 * @returns 
	 */
	static create(pathname, extension, nbLevels) {
		let cubeMap = new SWGL_TextureCubeMap("PRESET");
		cubeMap.pathname = pathname;
		cubeMap.extension = extension;
		cubeMap.nbLevels = nbLevels;
		cubeMap.load();
		return cubeMap;
	}


	S8_dispose() {
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