import { NeObject } from "/s8-io-bohr-neon/NeObject.js";


import { SWGL_View } from "../scene/view/SWGL_View.js";

import * as V3 from "/s8-io-swgl/maths/SWGL_Vector3d.js";




const DEG_to_RAD = Math.PI / 180.0;


/**
 * 
 */
export class StaticViewController extends NeObject {


    /** @type {number} */
    r;

    /** @type {number} */
    phi;

    /** @type {number} */
    theta;



    constructor(){
        super();
    }


    /** @param {number} r */
    S8_set_r(r){ this.r = r; }


    /** @param {number} phi */
    S8_set_phi(phi){ this.phi = phi; }


    /** @param {number} theta */
    S8_set_theta(theta){ this.theta = theta; }

    
    /**
     * 
     * @param {SWGL_View} view 
     */
    control(view){
        
        // compute new eye position
        V3.eyeVector(this.r, this.phi * DEG_to_RAD, this.theta * DEG_to_RAD, view.eyeVector);
 
    }

}