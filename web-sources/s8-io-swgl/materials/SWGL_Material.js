

import { NeObject } from "/s8-io-bohr-neon/NeObject.js";


/**
 * 
 */
export class SWGL_Material extends NeObject {



    /**
     * @type {Float32Array}
     */
    ambient;

    /**
     * @type {Float32Array}
     */
    diffuse;

    /**
     * @type {Float32Array}
     */
    specular;

    /**
     * @type {number}
     */
    shininess;


    constructor() {
        super();
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
    S8_set_shininess(factor) {
        this.shininess = factor;
    }


    S8_render() { /* nothing to do */ }

    S8_dispose() { /* nothing to do */ }

}
