import { NbMaterial } from "../../materials/NbMaterial.js";
import { NbAppearance } from "/s8-ng-geo/nebulae/appearances/NbAppearance.js";



export class Matex01NbAppearance extends NbAppearance {


    /**
     * @type {NbMaterial}
     */
    material;



    constructor() {
    }

    /**
     * 
     * @param {NbMaterial} material 
     */
    S8_set_material(material) {
        this.material = material;
    }

}