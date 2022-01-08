
import { S8Orbital } from '../../s8/S8.js';

import { gl } from '../nebulae.js';
import * as M4 from '../maths/NbMatrix4d';
import * as V2 from '../maths/NbVector2d';
import * as V3 from '../maths/NbVector4d';
import * as V4 from '../maths/NbVector4d';
import { DirectionalNbLight } from './DirectionalNbLight.js';
import { NbTextureCubeMap } from './NbTextureCubemap.js';



/**
 * WebGL Shape constructor, methods and utilities
 */
export class NbEnvironment extends S8Orbital {

    /**
     * 
     * @param {*} id 
     */
    constructor(id){
        super(id);

        this.scene = null; // must be bound to scene

        this.directionalLights = [];

        // cube maps
        this.radiance = new NbTextureCubeMap("PRESET");
        this.irradiance = new NbTextureCubeMap("PRESET");
    }


    S8_set(code, value){
        switch(code){
            case 0x20 : this.directionalLights = value; break;
            case 0x21 : this.radiance = value; break;
            case 0x22 : this.irradiance = value; break;
        }
    }


	/**
	* Normalize vector 
	*/
	update(matrix_View){

        // update lights
        this.directionalLights.forEach(light => light.update(matrix_View));
	}
		
		
	dim(factor){
			
		// dim background
		gl.clearColor(factor, factor, factor, 1.0);
			
		// dim lights
        this.directionalLights.forEach(light => light.dim(factor));
	}

    static initPreset(){
        let environment = new NbEnvironment("PRESET");
    
        environment.directionalLights = new Array(8);
    
        let dPhi = Math.PI*1.8/5;
        let ambient = [0.2, 0.2, 0.2];
        let diffuse = [0.3, 0.3, 0.3];
        let specular = [1.0, 1.0, 1.0];
        
        for(var i=0; i<5; i++){
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
        ambient = rgb(0.0, 0.0, 0.0);
        diffuse = rgb(0.4, 0.4, 0.4);
        specular = rgb(1.0, 1.0, 1.0);
        for(var i=0; i<3; i++){
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
        environment.radiance = NbTextureCubeMap.create("/webgl/graphics/skycube/std2/radiance/face", ".png", 6);
        environment.irradiance = NbTextureCubeMap.create("/webgl/graphics/skycube/std2/irradiance/face", ".png", 1);
    
        return environment;
    }
}
