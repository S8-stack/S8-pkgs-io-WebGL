
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


BOHR_TYPES.set(WEBGL_BOHR_PREFIX+201, WebGL_Appearance);


WebGL_Appearance.prototype = {

		parse : function(input){

			// RGBA reading function
			function readRGBA8(input){
				var color = new Array(4);
				color[0] = input.getUInt8()/255.0; // r
				color[1] = input.getUInt8()/255.0; // g
				color[2] = input.getUInt8()/255.0; // b
				color[3] = input.getUInt8()/255.0; // a
				return color;
			};

			// <material>
			this.wireProgram = input.getStringUTF8();
			this.wireColor = readRGBA8(input);

			this.surfaceProgram = input.getStringUTF8();
			this.surfaceGlossiness = input.getFloat32();
			this.surfaceRoughness = input.getFloat32();
			this.surfaceShininess = input.getFloat32();
			this.surfaceSpecularColor = readRGBA8(input);
			this.surfaceDiffuseColor = readRGBA8(input);
			this.surfaceAmbientColor = readRGBA8(input);

			let texPathname;
			if((texPathname = input.getStringUTF8())!=null){
				this.surfaceTexture0 = WebGL_textures.get(texPathname);
			}
			if((texPathname = input.getStringUTF8())!=null){
				this.surfaceTexture1 = WebGL_textures.get(texPathname);
			}
			if((texPathname = input.getStringUTF8())!=null){
				this.surfaceTexture2 = WebGL_textures.get(texPathname);
			}
			if((texPathname = input.getStringUTF8())!=null){
				this.surfaceTexture3 = WebGL_textures.get(texPathname);
			}
			// </material>
		},

		resolve : function(objects){
			// nothing to resolve
		},
		
		build : function(){
			// nothing to build
		}
};
