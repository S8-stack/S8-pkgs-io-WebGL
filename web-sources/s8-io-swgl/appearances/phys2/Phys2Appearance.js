import { SWGL_Texture2d } from "textures/SWGL_Texture2d.js";
import { SWGL_Appearance } from "/s8-io-swgl/appearances/SWGL_Appearance.js";

/**
 * CAD_Engine
 * 
 */
export class Phys2Appearance extends SWGL_Appearance {


	/**
	 * @type {SWGL_Texture2d}
	 */
	matDiffuseColors;
	
	/**
	 * @type {SWGL_Texture2d}
	 */
	matSpecularColors;
	
	
	/**
	 * @type {SWGL_Texture2d}
	 */
	matProperties;


	/**
	 * 
	 */
	constructor() {
		super();
	}



	/** 
	 * @param {SWGL_Texture2d} texture 
	 */
	S8_set_matDiffuseColors(texture){
		this.matDiffuseColors = texture;
	}


	/** 
	 * @param {SWGL_Texture2d} texture
	 */
	S8_set_matSpecularColors(texture){
		this.matSpecularColors = texture;
	}


	/** 
	 * @param {SWGL_Texture2d} texture 
	 */
	S8_set_matProperties(texture){
		this.matProperties = texture;
	}


	S8_render(){

	}

	S8_dispose(){

	}
}

