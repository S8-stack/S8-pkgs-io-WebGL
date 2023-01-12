

import { S8Orbital } from '/s8/S8';

import * as M4 from '../../../maths/SWGL_Matrix4d';

import { NbShape } from '../NbShape';


/**
 * 
 */
export class NbShGen extends S8Orbital {


    /** @type {Float32Array} matrix (0x02) position matrix */
    matrix = M4.createIdentity();

    /** @type {boolean} isObjectCachingEnabled (0x03) settings flag for caching object */
    isObjectCachingEnabled = true;

    /** @type {boolean} object */
    hasChanged = false;

    /** @type {boolean} object */
    isObjectGenerated = false;

    /** @type {NbShape} object */
    shape = null;

    /** @type {*} consumer */
    consumer = null;


    /**
     * @param {string} id 
     */
    constructor(id) {
        super(id);
    }




    S8_render(){
        if(this.hasChanged){
             // reportChanges
            if (this.consumer) {
                this.consumer.notifyPropertiesChanged();
            }
            this.hasChanged = false;
        }
    }


    notifyPropertiesChanged() {
        this.hasChanged = false;

        // reportChanges
        if (this.consumer) {
            this.consumer.notifyPropertiesChanged();
        }
    }


    /**
     * @param {NbScene} scene 
     * @returns {NbShape}
     */
    generate(scene) {
        return null;
    }
}