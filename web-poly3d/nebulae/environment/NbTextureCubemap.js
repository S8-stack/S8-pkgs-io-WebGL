import { gl } from "../nebular";


/**
 * 
 */
export class NbTextureCubeMap {


	/**
	 * For initializing
	 * @param {string} pathname 
	 * @param {string} extension 
	 * @param {string} nbLevels 
	 * @returns 
	 */
	static create(pathname, extension, nbLevels){
		let cubeMap = new NbTextureCubeMap();
		cubeMap.pathname = pathname;
		cubeMap.extension = extension;
		cubeMap.nbLevels = nbLevels;
		cubeMap.load();
		return cubeMap;
	}


	constructor(){
		this.isLoaded = false;
	}

	BOHR_set(code, value){
		switch(code){
			case 0x02 : this.pathname = value; break;
			case 0x03 : this.extension = value; break;
			case 0x04 : this.nbLevels = value; break;
			default : throw "Unsupported code";
		}
	}

	BOHR_render(){
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
			if(nbLevels>1){
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);	
			}
			else{
				gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
			
			// magnification filter (no effect on mipmap)
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			
			// define level of details for cubemap
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_BASE_LEVEL, 0);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, nbLevels-1);
			
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	
			let target;
			for (let face = 0; face<6; face++) {
				target = targets[face];
				for (let lod = 0; lod<this.nbLevels; lod++) {
					this.loadFace(target, lod, this.pathname+'_'+lod+'_'+faceSuffixes[face]+this.extension);
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
}

