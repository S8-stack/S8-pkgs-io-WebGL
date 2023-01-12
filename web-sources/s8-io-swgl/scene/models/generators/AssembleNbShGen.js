
import { SWGL_Scene } from '../../SWGL_Scene';
import { NbShape } from '../NbShape';
import { NbShapeProperties } from '../NbShapeProperties';
import { NbShGen } from './NbShGen.js';

/**
 * 
 */
export class AssembleNbShGen extends NbShGen {



    /** @type { NbShGen[] } generators */
    gens = [];


    constructor(id) { super(id); }


    /**
     * 
     * @param {number} code 
     * @param {*} value 
     */
    S8_set(code, value) {
        switch (code) {
            
            // super
            case 0x02: this.matrix = value; break;
            case 0x04: this.isObjectCachingEnabled = value; break;

            // subs
            case 0x22: this.setGenerators(value); break;

            default: throw `Unsupported code: ${code}`;
        }
        this.hasChanged;
    }


    setGenerators(gens){
        gens.forEach(gen => {gen.consumer = this; });
        this.gens = gens;
    }


    /**
     * 
     */
    S8_render(){
    }


    clearCache(){

        // clear sub caches
        if(this.gens){
            this.gens.forEach(gen => gen.clearCache());
        }
        this.isObjectGenerated = false;
    }

    /**
     * 
     * @param {SWGL_Scene} scene 
     * @returns {NbShape}
     */
    generate(scene) {
        if(!this.isObjectGenerated){
            let shapes = new Array();
            let properties = new NbShapeProperties();
           
            this.gens.forEach(gen => {
                let shape = gen.generate(scene);
                shapes.push(shape);
                properties.append(shape.getProperties());
            });


            this.shape = new NbShape(properties);

            shapes.forEach(subShape => this.shape.append(subShape, this.matrix));

            if(this.isObjectCachingEnabled){
                this.isObjectGenerated = true;
            }
        }
        return this.shape;
    }
}