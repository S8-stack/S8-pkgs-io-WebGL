import { NeObject } from "/s8-io-bohr-neon/NeObject.js";


export class Phys2Material extends NeObject {


	/**
	 * @type{Uint8Array}
	 */
	emissiveColor;
	
	/**
	 * @type{Uint8Array}
	 */
	diffuseColor;


	/**
	 * @type{Uint8Array}
	 */
	specularColor;


	/**
	 * @type{number}
	 */
	glossiness;


	/**
	 * @type{number}
	 */
	roughness;


	/**
	 * @type{number}
	 */
	xTexCoords;

	/**
	 * @type{number}
	 */
	yTexCoords;


	constructor(){
		super();
	}


	/**
	 * @param{Uint8Array} color
	 */
	S8_set_emissiveColor(color){
		this.emissiveColor = color;
	}
	
	/**
	 * @param{Uint8Array} color
	 */
	S8_set_diffuseColor(color){
		this.diffuseColor = color;
	}

	/**
	 * @param{Uint8Array} color
	 */
	S8_set_specularColor(color){
		this.specularColor = color;
	}


	/**
	 * @param{number} scalar
	 */
	S8_set_roughness(scalar){
		this.roughness = scalar;
	}


	S8_render(){}
	S8_dispose(){}
}

