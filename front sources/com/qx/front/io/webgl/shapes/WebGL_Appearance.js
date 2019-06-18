
/**
 * CAD_Engine
 * 
 */
function WebGL_Appearance(){

	// Material
	
	/** the default program for wire rendering */
	this.wireProgramId = "color2";
	
	/** default value for shape material */
	this.wireColor = [0.12, 0.12, 0.12, 1.0];

	/** the default program for wire rendering */
	this.surfaceProgramId = "standard";
	
	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceGlossiness = 0.7;
	
	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceRoughness = 0.5;
	
	/** default value for shape material -> Phong shading */
	this.surfaceShininess = 0.5;
	
	/** default value for shape material -> multi-purposes */
	this.surfaceSpecularColor = [0.12, 0.8, 0.8, 1.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceDiffuseColor = [0.12, 0.8, 0.8, 1.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceAmbientColor = [0.1, 0.1, 0.1, 1.0];
	
	/** the textures */
	this.surfaceTexture0 = null;
	this.surfaceTexture1 = null;
	this.surfaceTexture2 = null;
	this.surfaceTexture3 = null;
	
}


WebGL_Appearance.prototype = {

		
};
