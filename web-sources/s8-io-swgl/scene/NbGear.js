

import { S8Orbital } from '/s8/S8';
import { SWGL_Appearance } from '../appearances/SWGL_Appearance';

import { NbShGen } from '../models/generators/NbShGen';
import { SWGL_Model } from '../models/SWGL_Model';
import { NbScene } from '../utilities/demos/NbDemoWindow';

import * as M4 from '../maths/SWGL_Matrix4d';

/**
 * 
 */
export class NbGear extends S8Orbital {


    /** @type {NbScene} scene */
    scene = null;

    /** @type {boolean}  */
    hasShapeChanged = false;

    /** @type {boolean} */
    isShapeSceneInserted = false;

    /** @type {number} */
    shapeIndex = false;

    /** @type {NbShGen} */
    shapeGenerator = null;

    /** @type {Float32Array} modelMatrix for the model generated */
    modelMatrix = M4.createIdentity();

    /** @type {Map<string, SWGL_Model>} */
    models = null;

    constructor(id){
        super(id);
    }


    /**
     * 
     * @param {number} code 
     * @param {*} value 
     */
    S8_set(code, value){
        switch(code){
            case 0x02 : this.shapeGenerator = value; break;
            case 0x04 : this.modelMatrix = value; break;
        }
    }


    setObjectGenerator(gen){
        if(this.shapeGenerator){
            this.shapeGenerator.clearCache();
        }

        this.shapeGenerator = gen;
        this.shapeGenerator.consumer = this;
    }

    notifyPropertiesChanged(){
        this.hasShapeChanged = true;
    }

    S8_render(){
        
        // update
    }


    update() {
        if(this.hasShapeChanged){

            // dispose previous models
            if(this.models){
                this.models.forEach((model, appearanceName) => {
                    /** @type {SWGL_Appearance} */
                    let appearance = this.scene.getAppearance(appearanceName);
                    
                    // retrieve index
                    let index = model.index;

                    // remove the model from appearance models list
                    if(index>=0){ appearance.models.splice(index, 1); }
                });
            }

            // build shape
            let shape = this.shapeGenerator.generate(scene);

            // compile shape's meshes into models
            this.models = shape.buildModels();


            this.models.forEach((model, appearanceName) => {
                /** @type {SWGL_Appearance} */
                let appearance = this.scene.getAppearance(appearanceName);

                // bind matrix
                model.matrix = this.modelMatrix;
                
                // append the model to the appearance models list
                model.index = appearance.models.push(model)-1;
            });
            
            // false
            this.hasShapeChanged = false;
        }
    }



}