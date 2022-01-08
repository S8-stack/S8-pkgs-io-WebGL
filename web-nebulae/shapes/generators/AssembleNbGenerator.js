
import { S8Orbital } from '../../s8/S8.js';
import { NbObject } from './NbObject.js.js';

/**
 * 
 */
export class AssembleNbGenerator extends S8Orbital {

    constructor(id) { super(id); }


    /**
     * 
     * @param {number} code 
     * @param {*} value 
     */
    S8_set(code, value) {
        switch (code) {
            
            // case 
            case 0x02: this.matrix = value; break;
            case 0x03: this.isMatrixAnimated = value; break;

            // subs
            case 0x22: this.subGenerators = value; break;


            default: throw `Unsupported code: ${code}`;
        }
    }


    /**
     * 
     */
    S8_render(){
    }

    /** @param {Set} set */
    collectAppearances(set){ 
        this.setSubGenerators.forEach(subGenerator => {
            subGenerator.collectAppearances(set);
        });
    }


    /**
     * 
     * @param {NbAppearance} appearance 
     * @param {Float32Array} matrix 
     * @param {NbMesh} target for instance { sMeshes: NbMesh[], dMeshes: NbMesh[] }
     */
    generate(context) {
        let object = new NbObject(context);
        this.subGenerators.forEach(subGenerator => object.append(this.matrix, subGenerator.generate(context)));
        return object;
    }
}