import { NbAppearance } from "../NbAppearance.js";


/**
 * 
 */
export class Color2NbAppearance extends NbAppearance {


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
