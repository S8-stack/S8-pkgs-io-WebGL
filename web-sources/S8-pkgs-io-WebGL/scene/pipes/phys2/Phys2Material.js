import { S8Object } from "/S8-api/S8Object.js";


export class Phys2Material extends S8Object {


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




	static createGlow0(){
		const material = new Phys2Material();

		function toArrayUint8(red, green, blue, alpha){
			const array = new Uint8Array(4);
			array[0] = red;
			array[1] = green;
			array[2] = blue;
			array[3] = alpha;
			return array;
		}
		
		material.emissiveColor = toArrayUint8(128, 128, 0, 255);
		material.diffuseColor = toArrayUint8(128, 128, 0, 255);
		material.specularColor = toArrayUint8(200, 200, 200, 255);
		material.glossiness = 0.5;
		material.roughness = 2.5;
		
		return material;
	}

}


