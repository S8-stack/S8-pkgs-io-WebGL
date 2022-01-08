

import { S8Orbital } from '../../s8/S8.js';
import { NbObject } from '../NbObject.js';


/**
 * 
 */
export class ElementaryNbGenerator extends S8Orbital {

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
            case 0x02 : this.appearanceName = value; break;
            case 0x04 : this.matrix = value; break;
            case 0x06 : this.mesh = value; break;
            default : throw `Unsupported code ${code}`;
        }
    }

 
    /**
     * 
     * @param {NbRenderingContext} context 
     */
    generate(context) {
        let object = new NbObject(context);
        let mesh = object.getMesh(this.appearanceName);
        mesh.append(this.matrix, this.mesh);
        return object;
    }

}