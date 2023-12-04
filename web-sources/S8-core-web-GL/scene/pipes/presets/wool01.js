



style.initialize = function(){
	
	this.programId = "matex01";
	this.ambient = 	[0.2, 0.2, 0.2, 0.0];
	this.diffuse = 	[0.8, 0.8, 0.8, 0.0];
	this.specular = [0.3, 0.2, 0.8, 0.0];
	this.shininess = 20;

	this.texture0 = new WebGL_Texture("/webgl/graphics/texture2d/wool01.png", gl.TEXTURE0);
};


style.dispose = function(){
	this.texture.dispose();
};