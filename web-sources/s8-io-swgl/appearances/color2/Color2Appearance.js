import { SWGL_Appearance } from "../SWGL_Appearance.js";


/**
 * 
 */
export class Color2Appearance extends SWGL_Appearance {


    /**
     * @type {Float32Array}
     */
    color;


    constructor(){
        super();
    }



    /**
     * 
     * @param {Float32Array} color 
     */
    S8_set_color(color) {
        this.color = color;
    }


    S8_render(){
    }


    S8_dispose(){
    }

}
