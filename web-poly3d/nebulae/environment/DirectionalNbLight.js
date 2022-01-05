

export class DirectionalNbLight {

	constructor(){
	}

	BOHR_set(code, value){
		switch(code){
			case 0x20: this.ambient = value; break;
			case 0x21: this.diffuse = value; break;
			case 0x22: this.specular = value; break;
			case 0x23: this.worldDirection = direction; break;
		}
	}

	BOHR_render(){
		
	}


	computeDirection(matrix_View){
		this.direction = this.matrix_View.dotVector3(this.worldDirection.c);	
	}
	
	bind(handle){
		gl.uniform4fv(handle.loc_Uniform_light_ambient, this.ambient);
		gl.uniform4fv(handle.loc_Uniform_light_diffuse, this.diffuse);
		gl.uniform4fv(handle.loc_Uniform_light_specular, this.specular);
		gl.uniform3fv(handle.loc_Uniform_light_direction, this.direction);	
	}
};




function WebGL_TextureCubeMap(pathname, extension, nbLevels){
	this.load(pathname, extension, nbLevels);
};


WebGL_TextureCubeMap.prototype = {


		load : function(pathname, extension, nbLevels) {

			var targets = [
				gl.TEXTURE_CUBE_MAP_POSITIVE_X,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
				gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
				gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
				gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ];

			var faceSuffixes = [
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

			var pathname, target, faceImage, that=this;
			for (var face = 0; face<6; face++) {
				target = targets[face];
				for (var lod = 0; lod<nbLevels; lod++) {
					this.loadFace(target, lod, pathname+'_'+lod+'_'+faceSuffixes[face]+extension)
				}
			}
		},
		
		
		loadFace : function(target, lod, pathname){
			var image = new Image(), that = this;
			image.onload = function() { that.loadImage(target, lod, image); };
			image.src = pathname;	
		},

		loadImage : function(target, lod, image){
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
			gl.texImage2D(target, lod, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		},
		

		bind : function(location, index){
			gl.activeTexture(gl.TEXTURE0+index);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
			gl.uniform1i(location, index);
		}

};


