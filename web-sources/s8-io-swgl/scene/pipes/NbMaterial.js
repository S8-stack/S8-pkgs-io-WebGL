
import { NeObject } from "/s8-io-bohr-neon/NeObject.js";


/**
 * 
 */
export class MaterialNbUniform extends NeObject {

    constructor() {
    }

    /**
     * 
     * @param {Float32Array} colorComponents 
     */
    S8_set_ambient(colorComponents) {
        this.ambient = colorComponents;
    }


    /**
     * 
     * @param {Float32Array} colorComponents 
     */
    S8_set_diffuse(colorComponents) {
        this.diffuse = colorComponents;
    }


    /**
  * 
  * @param {Float32Array} colorComponents 
  */
    S8_set_specular(colorComponents) {
        this.specular = colorComponents;
    }

    /**
  * 
  * @param {number} factor 
  */
    S8_set_specular(factor) {
        this.shininess = factor;
    }

    link(handle) {
       
    }

    bind(material) {
      
    }
}
