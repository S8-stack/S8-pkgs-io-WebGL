import { SWGL_Appearance } from "../SWGL_Appearance.js";

/**
 * CAD_Engine
 * 
 */
export class StandardAppearance extends SWGL_Appearance {

	/** default value for shape material -> "Standard" Unity-style shading */
	glossiness = 0.7;

	/** default value for shape material -> "Standard" Unity-style shading */
	roughness = 0.5;

	/** default value for shape material -> Phong shading */
	shininess = 0.5;

	/** default value for shape material -> multi-purposes */
	specularColor = [0.12, 0.8, 0.8, 1.0];

	/** default value for shape material -> multi-purposes */
	diffuseColor = [0.12, 0.8, 0.8, 1.0];

	/** default value for shape material -> multi-purposes */
	ambientColor = [0.1, 0.1, 0.1, 1.0];


	/**
	 * 
	 */
	constructor() {
		super();
	}



	/** @param {number} value */
	S8_set_glossiness(value){
		this.glossiness = value;
	}


	/** @param {number} value */
	S8_set_roughness(value){
		this.roughness = value;
	}


	/** @param {Float32Array} color */
	S8_set_specularColor(color){
		this.specularColor = color;
	}


	/** @param {Float32Array} color */
	S8_set_diffuseColor(color){
		this.diffuseColor = color;
	}


	/** @param {Float32Array} color */
	S8_set_ambientColor(color){
		this.ambientColor = color;
	}


	S8_render(){

	}

	S8_dispose(){

	}
}

