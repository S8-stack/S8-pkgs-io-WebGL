

import { SWGL_Scene } from '../../SWGL_Scene';
import { NbShGen } from './NbShGen';

import * as M4 from '../../../maths/SWGL_Matrix4d';
import { SWGL_Model } from '../SWGL_Model';
import { NbShape } from '../NbShape';
import { NbShapeProperties } from '../NbShapeProperties';


/**
 * 
 */
export class ElementaryNbShGen extends NbShGen {


    /** @type {Float32Array} */
    matrix = M4.createIdentity();

    /** @type {boolean} */
    isObjCachingEnabled = false;

    /** @type {string} */
    appearanceName = null;

    /** @type {SWGL_Model} */
    mesh = null;

    constructor(id) { 
        super(id); 
    }


    /**
     * 
     * @param {number} code 
     * @param {*} value 
     */
    BOHR_set(code, value){
        switch(code) {
            
            // super
            case 0x02: this.matrix = value; break;
            case 0x04: this.isObjCachingEnabled = value; break;

            case 0x22 : this.appearanceName = value; break;
            case 0x24 : this.mesh = value; break;
            default : throw `Unsupported code ${code}`;
        }
        this.hasChanged = true;
    }


    setMatrix(matrix){
        this.matrix = matrix;
        this.isObjectGenerated = false;
    }
  
    clearCache(){
        this.isObjectGenerated = false;
    }

    /**
     * 
     * @param {SWGL_Scene} scene 
     * @returns {NbShape}
     */
    generate(scene) {
        // caching not applicable here

        let program = scene.getAppearance(this.appearanceName).program;
        let properties = NbShapeProperties.createSingleton(this.appearanceName, program.meshProperties.clone());
        let shape = new NbShape(properties);
        let mesh = shape.getMesh(this.appearanceName);
        mesh.append(this.mesh, this.matrix);
        return shape;
    }

}