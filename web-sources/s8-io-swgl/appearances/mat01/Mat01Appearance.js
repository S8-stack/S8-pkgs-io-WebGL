import { SWGL_Appearance } from "../SWGL_Appearance.js";
import { NbMaterial } from "/s8-ng-geo/nebulae/materials/NbMaterial.js";


/**
 * 
 */
export class Mat01NbAppearance extends SWGL_Appearance {


    /**
     * @type {NbMaterial}
     */
    material;


    constructor(){
        super();
    }



    /**
     * 
     * @param {NbMaterial} material 
     */
    S8_set_material(material) {
        this.material = material;
    }


    S8_render(){
    }


    S8_dispose(){
    }

}
