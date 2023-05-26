
import { NeObject } from '/s8-io-bohr-neon/NeObject.js';

import { gl } from '/s8-io-swgl/swgl.js';

import * as V3 from '/s8-io-swgl/maths/SWGL_Vector3d.js';

import { SWGL_DirectionalLight } from './lights/SWGL_DirectionalLight.js';
import { SWGL_TextureCubeMap } from './SWGL_TextureCubeMap.js';
import { SWGL_View } from '/s8-io-swgl/scene/view/SWGL_View.js';




/**
 * WebGL Shape constructor, methods and utilities
 */
export class SWGL_Environment extends NeObject {


    /** @type {SWGL_View} (Bound by scene) */
    view;


    /**
     * @type {SWGL_DirectionalLight[]} 
     */
    directionalLights;


    /**
     * @type {SWGL_TextureCubeMap} 
     */
    radiance = null;

/**
     * @type {SWGL_TextureCubeMap} 
     */
    irradiance = null;

    /**
     * 
     */
    constructor(){
        super();

        this.scene = null; // must be bound to scene

        this.directionalLights = [];

        // cube maps
       // this.radiance = new NbTextureCubeMap("PRESET");
        //this.irradiance = new NbTextureCubeMap("PRESET");
    }


    /**
     * 
     * @param {SWGL_DirectionalLight[]} lights 
     */
    S8_set_directionalLights(lights){
        this.directionalLights = lights;
    }

    
    /**
     * 
     * @param {SWGL_TextureCubeMap} cubeMap 
     */
    S8_set_radiance(cubeMap){
        this.radiance = cubeMap;
    }


       /**
     * 
     * @param {SWGL_TextureCubeMap} cubeMap 
     */
    S8_set_irradiance(cubeMap){
         this.irradiance = cubeMap;
    }


	/**
	* Normalize vector 
	*/
	update(){

        // update lights
        this.directionalLights.forEach(light => light.update(this.view.matrix_View));
	}
		
		
	dim(factor){
			
		// dim background
		gl.clearColor(factor, factor, factor, 1.0);
			
		// dim lights
        this.directionalLights.forEach(light => light.dim(factor));
	}



    S8_render(){
    }


    S8_dispose(){
    }

    static initPreset(){
        let environment = new SWGL_Environment("PRESET");
    
        environment.directionalLights = new Array(8);
    
        let dPhi = Math.PI*1.8/5;
        let ambient = [0.2, 0.2, 0.2];
        let diffuse = [0.3, 0.3, 0.3];
        let specular = [1.0, 1.0, 1.0];
        
        for(let i=0; i<5; i++){
            let direction = V3.create();
            V3.spherical_radial(1.0, i*dPhi, Math.PI*0.25, direction);
            let light = new SWGL_DirectionalLight("PRESET");
            light.ambient = ambient;
            light.diffuse = diffuse;
            light.specular = specular;
            light.direction = direction;
    
            environment.directionalLights[i] = light;
        }
        
        dPhi = Math.PI*1.8/3; 
        ambient = [0.0, 0.0, 0.0];
        diffuse = [0.4, 0.4, 0.4];
        specular = [1.0, 1.0, 1.0];
        for(let i=0; i<3; i++){
            let direction = V3.create();
            V3.spherical_radial(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65, direction);	
            let light = new SWGL_DirectionalLight("PRESET");
            light.ambient = ambient;
            light.diffuse = diffuse;
            light.specular = specular;
            light.direction = direction;
            environment.directionalLights[5+i] = light;
        }
    
            // environment
        let rootPathname = "/s8-io-swgl/assets/skycube/std3";
        environment.radiance = SWGL_TextureCubeMap.create(rootPathname+"/radiance/face", ".png", 8);
        environment.irradiance = SWGL_TextureCubeMap.create(rootPathname+"/irradiance/face", ".png", 1);
    
        return environment;
    }
}
