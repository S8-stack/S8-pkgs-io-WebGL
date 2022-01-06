



style.initialize = function(){
	
	this.programId = "tex01";

	this.texture0 = new WebGL_Texture("/webgl/graphics/texture2d/tex_markup.png", gl.TEXTURE0);
};


style.dispose = function(){
	this.texture.dispose();
};