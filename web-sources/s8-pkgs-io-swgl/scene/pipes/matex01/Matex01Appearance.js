import { SWGL_Material } from "../../materials/SWGL_Material.js";
import { NbAppearance } from "/s8-ng-geo/nebulae/appearances/NbAppearance.js";



export class Matex01NbAppearance extends NbAppearance {


    /**
     * @type {SWGL_Material}
     */
    material;



    constructor() {
    }

    /**
     * 
     * @param {SWGL_Material} material 
     */
    S8_set_material(material) {
        this.material = material;
    }

}