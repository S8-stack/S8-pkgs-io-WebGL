import { SWGL_Material } from "/s8-io-swgl/materials/SWGL_Material.js";
import { SWGL_Appearance } from "../SWGL_Appearance.js";


/**
 * 
 */
export class Mat01Appearance extends SWGL_Appearance {


    /**
     * @type {SWGL_Material}
     */
    material;


    constructor(){
        super();
    }



    /**
     * 
     * @param {SWGL_Material} material 
     */
    S8_set_material(material) {
        this.material = material;
    }


    S8_render(){
    }


    S8_dispose(){
    }

}
