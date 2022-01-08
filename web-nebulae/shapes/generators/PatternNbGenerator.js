

import { S8Orbital } from '../../s8/S8.js';
import { NbObject } from '../NbObject.js';
import * as M4 from '../maths/NbMatrix4d';


/**
 * 
 */
export class PatternNbGenerator extends S8Orbital {

    constructor(id) {
        super(id); 
    
        this.matrix = M4.create();
        M4.identity(this.matrix);


        this.x0 = 0.0; this.nx = 1; this.dx = 0.0;
        this.y0 = 0.0; this.ny = 1; this.dy = 0.0;
        this.z0 = 0.0; this.nz = 1; this.dz = 0.0;
        this.theta0 = 0.0; this.nTheta = 1;  this.dTheta = 0;
    }


    S8_set(code, value){
        switch(code){

            case 0x20: this.x0 = value; break;
            case 0x21: this.nx = value; break;
            case 0x22: this.dx = value; break;

            case 0x30: this.y0 = value; break;
            case 0x31: this.ny = value; break;
            case 0x32: this.dy = value; break;

            case 0x40: this.z0 = value; break;
            case 0x41: this.nz = value; break;
            case 0x42: this.dz = value; break;

            case 0x50: this.theta0 = value; break;
            case 0x51: this.dTheta = value; break;
            case 0x52: this.dTheta = value; break;
            default : throw "Unsupported code: "+code;
        }
    }

    /**
     * 
     * @param {NbAppearance} appearance 
     * @param {Float32Array} matrix 
     * @param {NbMesh} target for instance { sMeshes: NbMesh[], dMeshes: NbMesh[] }
     */
    generate(context) {
        let object = new NbObject(context);
        let seedObject = seedGenerator.generate(context);

        let x, y, z, theta, m = M4.create();

        for(let ix = 0; ix<this.nx; ix++){ // x-loop
            for(let iy = 0; iy<this.ny; iy++){  // y-loop
                for(let iz = 0; iz<this.nz; iz++){  // z-loop
                    for(let iTheta = 0; iTheta<this.nTheta; iTheta++){ // theta-loop
            
                        // computing variables
                        x = this.x0 + ix * this.dx;
                        y = this.y0 + iy * this.dy;
                        z = this.z0 + iz * this.dz;
                        theta = this.theta0 + iTheta*this.dTheta;

                        M4.multiply(this.matrix, M4.pattern(x, y, z, theta), m);
                        object.append(m, seedObject);
                    }
                }
            }   
        }
        return object;
    }
}