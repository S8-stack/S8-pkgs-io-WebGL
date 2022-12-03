
import { S8Object } from '/s8-io-bohr/atom/S8Object.js';

import * as V3 from '../maths/NbVector3d.js';

import { DirectionalNbLight } from '../lights/DirectionalNbLight.js';
import { NbTextureCubeMap } from './NbTextureCubeMap.js';
import { NbView } from '../view/NbView.js';
import { gl } from '/s8-ng-geo/nebulae/nebulae.js';
import { NeObject } from '/s8-io-bohr/neon/NeObject.js';



/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbEnvironment extends NeObject {


    /** @type {NbView} (Bound by scene) */
    view;


    /**
     * @type {DirectionalNbLight[]} 
     */
    directionalLights;


    /**
     * @type {NbTextureCubeMap} 
     */
    radiance = null;

/**
     * @type {NbTextureCubeMap} 
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
     * @param {DirectionalNbLight[]} lights 
     */
    S8_set_directionalLights(lights){
        this.directionalLights = lights;
    }

    
    /**
     * 
     * @param {NbTextureCubeMap} cubeMap 
     */
    S8_set_radiance(cubeMap){
        this.radiance = cubeMap;
    }


       /**
     * 
     * @param {NbTextureCubeMap} cubeMap 
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
        let environment = new NbEnvironment("PRESET");
    
        environment.directionalLights = new Array(8);
    
        let dPhi = Math.PI*1.8/5;
        let ambient = [0.2, 0.2, 0.2];
        let diffuse = [0.3, 0.3, 0.3];
        let specular = [1.0, 1.0, 1.0];
        
        for(let i=0; i<5; i++){
            let direction = V3.create();
            V3.spherical_radial(1.0, i*dPhi, Math.PI*0.25, direction);
            let light = new DirectionalNbLight("PRESET");
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
            let light = new DirectionalNbLight("PRESET");
            light.ambient = ambient;
            light.diffuse = diffuse;
            light.specular = specular;
            light.direction = direction;
            environment.directionalLights[5+i] = light;
        }
    
            // environment
        let rootPathname = "/nebulae/assets/skycube";
        environment.radiance = NbTextureCubeMap.create(rootPathname+"/std2/radiance/face", ".png", 6);
        environment.irradiance = NbTextureCubeMap.create(rootPathname+"/std2/irradiance/face", ".png", 1);
    
        return environment;
    }
}
