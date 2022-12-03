
import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { gl } from "/s8-io-swgl/swgl.js";


/**
 * 
 */
export class SWGL_TextureCubeMap extends NeObject {


	/** @type {string} */
	pathname;

	/** @type {string} */
	extension;

	/** @param {number} */
	nbLevels;


	/**
	 * 
	 * @param {*} id 
	 */
	constructor(){
		super();
		this.isLoaded = false;
	}


	/** @param {string} pathname */
	S8_set_pathname(pathname){
		this.pathname = pathname;
	}

	/** @param {string} extension */
	S8_set_extension(extension){
		this.extension = extension;
	}

	/** @param {number} nbLevels */
	S8_set_nbLevels(nbLevels){
		this.nbLevels = nbLevels;
	}

	S8_render(){
		this.load();
	}


	load() {
		if(!this.isLoaded){
			let targets = [
				gl.TEXTURE_CUBE_MAP_POSITIVE_X,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
				gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
				gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ];
	
			let faceSuffixes = [
				"posx",
				"negx",
				"posy",
				"negy",
				"posz",
				"negz"];
	
			this.cubeTexture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
	
			// minification filter -> must hint mip-map processing if necessary
			if(this.nbLevels>1){
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);	
			}
			else{
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
			
			// magnification filter (no effect on mipmap)
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			
			// define level of details for cubemap
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_BASE_LEVEL, 0);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, this.nbLevels-1);
			
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	
			let target;
			for (let iFace = 0; iFace<6; iFace++) {
				target = targets[iFace];
				for (let lod = 0; lod<this.nbLevels; lod++) {
					this.loadFace(target, lod, this.pathname+'_'+lod+'_'+faceSuffixes[iFace]+this.extension);
				}
			}

			this.isLoaded = true;
		}
	}

		
	loadFace(target, lod, pathname){
		let image = new Image(), that = this;
		image.onload = function() { 
			that.loadImage(target, lod, image); 
		};
		image.src = pathname;	
	}

	loadImage(target, lod, image){
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
		gl.texImage2D(target, lod, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}
	
	bind(location, index){
		gl.activeTexture(gl.TEXTURE0+index);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
		gl.uniform1i(location, index);
	}


	/**
	 * For initializing
	 * @param {string} pathname 
	 * @param {string} extension 
	 * @param {string} nbLevels 
	 * @returns 
	 */
	 static create(pathname, extension, nbLevels){
		let cubeMap = new SWGL_TextureCubeMap("PRESET");
		cubeMap.pathname = pathname;
		cubeMap.extension = extension;
		cubeMap.nbLevels = nbLevels;
		cubeMap.load();
		return cubeMap;
	}


	S8_dispose(){
	}

}
