/**
 * 
 * Shader program constructor
 * 
 * @param gl : OpenGL context
 * @param serializedShader : XML-based description of the shader
 * 
 */
function WebGL_Style(id){

	this.id = id;
	// display list if the scene
	this.displayList = [];
	
	
	this.isInitialized = false;

	// start initialization
	var style = this;
	
	request("service=WebGL; action=GetStyle; id="+id, function (response){
		eval(response.responseText);
		/*
		 * eval must define:
		 * 		programId
		 *      <Uniforms>
		 * 		(function) this.dispose()	
		 */

		style.initialize();
		style.isInitialized = true;
		
		// from now on, the program is ready to render!
		scene.getProgram(style.programId).displayList.push(style);
		
	});
}


WebGL_Style.prototype = {

		/**
		 * render the styles and shapes
		 */
		render : function(program){
			if(this.isInitialized){
				// load style uniforms
				program.loadStyle(this);

				// render shapes
				for(var i=0; i<this.displayList.length; i++){
					this.displayList[i].render(program);
				}	
			}
		},


		/*
		 * append shape
		 */
		addShape : function(shape){
			this.displayList.push(shape);
			shape.style = this;
		},


		/*
		 * get shape
		 */
		getShape : function(id){
			for(var i=0; i<this.displayList.length; i++){
				if(this.displayList[i].id == id){
					return this.displayList[i];
				}
			}
			return null;
		},


		/*
		 * detach form current style 
		 */ 
		removeShape : function(id){
			this.displayList.splice(this.getShapeIndex(id), 1);
		},
		
		
		getShapeIndex : function(id){
			var i=0; n=this.displayList.length;
			for(var i=0; i<n; i++){
				if(this.displayList[i].id == id){
					return i;
				}
			}
		}
};




/**
 * Texture
 */

function WebGL_Texture(pathname){
	this.texture = gl.createTexture();
	this.image = new Image();
	var _this = this;
	this.image.onload = function() {
		_this.initialize();
	};
	this.image.src = pathname;
};

WebGL_Texture.prototype = {

		initialize : function(){
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.bindTexture(gl.TEXTURE_2D, null);
		},

		bind : function(location, index){
			gl.activeTexture(gl.TEXTURE0+index);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(location, index);
		},

		dispose : function(){
			gl.deleteTexture(this.texture);
		}
};





function WebGL_TextureCubeMap(pathname, extension){
	this.load(pathname, extension);
	this.targets = [0,0,0,0,0,0];
};


WebGL_TextureCubeMap.prototype = {



		load : function(pathname, extension) {

			var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			               gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			               gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			               gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			               gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			               gl.TEXTURE_CUBE_MAP_NEGATIVE_Z ];


			var suffixes = [ "_negx", "_posx", "_posy", "_negy", "_posz", "_negz"];


			this.cubeTexture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

			for (var i = 0; i<6; i++) {
				WebGL_TextureCubeMap.loadFace(pathname + suffixes[i] + extension, targets[i], this.cubeTexture);
			}

		},


		bind : function(location, index){
			gl.activeTexture(gl.TEXTURE0+index);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
			gl.uniform1i(location, index);
		},

};


WebGL_TextureCubeMap.loadFace = function(pathName, target, cubeTexture){
	var cubeImage = new Image();
	cubeImage.onload = function() {
		WebGL_TextureCubeMap.loadImage(target, cubeImage, cubeTexture);
	};
	cubeImage.src = pathName;
};

WebGL_TextureCubeMap.loadImage = function(target, cubeImage, cubeTexture){
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
	gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cubeImage);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
};

