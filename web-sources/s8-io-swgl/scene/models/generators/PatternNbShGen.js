
import * as M4 from '../../../maths/SWGL_Matrix4d';
import { SWGL_Scene } from '../../SWGL_Scene';
import { NbShGen } from './NbShGen';
import { NbShape } from '../NbShape';


/**
 * 
 */
export class PatternNbShGen extends NbShGen {


    /** @type {NbShGen} text */
    seedGenerator = null;

    /** @type {number} x0 starting position x */
    x0 = 0.0;

    /** @type {number} */
    nx = 1;

    /** @type {number} */
    dx = 0.0;

    /** @type {number} */
    y0 = 0.0;
    
    /** @type {number} */
    ny = 1;
    
    /** @type {number} */
    dy = 0.0;

    /** @type {number} */
    z0 = 0.0; 
    
    /** @type {number} */
    nz = 1; 
    
    /** @type {number} */
    dz = 0.0;
    
    /** @type {number} */
    theta0 = 0.0; 
    
    /** @type {number} */
    nTheta = 1; 
    
    /** @type {number} */
    dTheta = 0;


    /**
     * 
     * @param {*} id 
     */
    constructor(id) {
        super(id);
    }


    S8_set(code, value){
        switch(code){

            // super
            case 0x02: this.matrix = value; break;
            case 0x04: this.isObjectCachingEnabled = value; break;

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
            case 0x51: this.nTheta = value; break;
            case 0x52: this.dTheta = value; break;
            default : throw "Unsupported code: "+code;
        }

        // clear object
        this.hasChanged = true;
    }


    /**
     * 
     * @param {NbObjGen} seed 
     */
    setSeedGenerator(seed){
        this.seedGenerator = seed;
        seed.consumer = this;
    }


    clearCache(){
        if(this.seedGenerator){
            this.seedGenerator.clearCache();
        }
        this.isObjectGenerated = false;
    }
  

    /**
     * @param {SWGL_Scene} scene 
     * @returns { NbShape }
     */
    generate(scene) {
        if(!this.isObjectGenerated){
            let seedShape = this.seedGenerator.generate(scene);
    
            let props = seedShape.getProperties();
            let nInstances = this.nx * this.ny * this.nz * this.nTheta;
            props = props.clone(nInstances);


            this.shape = new NbShape(props);

            let x, y, z, theta, m = M4.createIdentity();
    
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
                            this.shape.append(seedShape, m);
                        }
                    }
                }
            }

            // is object generated
            if(this.isObjectCachingEnabled){
                this.isObjectGenerated = true;
            }
        }

        // object
        return this.shape;
    }
}