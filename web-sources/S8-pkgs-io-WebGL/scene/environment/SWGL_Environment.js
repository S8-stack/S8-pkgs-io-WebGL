
import { NeObject } from '/S8-core-bohr-neon/NeObject.js';

import { gl } from '/S8-pkgs-io-WebGL/swgl.js';

import * as V3 from '/S8-pkgs-io-WebGL/maths/SWGL_Vector3d.js';

import { SWGL_DirectionalLight } from './lights/SWGL_DirectionalLight.js';
import { SWGL_TextureCubeMap } from './SWGL_TextureCubeMap.js';
import { SWGL_View } from '/S8-pkgs-io-WebGL/scene/view/SWGL_View.js';




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
    constructor() {
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
    S8_set_directionalLights(lights) {
        this.directionalLights = lights;
    }


    /**
     * 
     * @param {SWGL_TextureCubeMap} cubeMap 
     */
    S8_set_radiance(cubeMap) {
        this.radiance = cubeMap;
    }


    /**
  * 
  * @param {SWGL_TextureCubeMap} cubeMap 
  */
    S8_set_irradiance(cubeMap) {
        this.irradiance = cubeMap;
    }


    /**
    * Normalize vector 
    */
    update() {

        // update lights
        this.directionalLights.forEach(light => light.update(this.view.matrix_View));
    }


    dim(factor) {

        // dim background
        gl.clearColor(factor, factor, factor, 1.0);

        // dim lights
        this.directionalLights.forEach(light => light.dim(factor));
    }



    S8_render() {
    }


    S8_dispose() {
    }


    /* presets */




    static createEnvironment(name) {
        switch (name) {
            default:
            case "env0": return this.create_Env0();
            case "env2": return this.create_Env2();
        }
    }


    static create_Env0() {
        let environment = new SWGL_Environment("PRESET");

        environment.directionalLights = new Array(8);

        let dPhi = Math.PI * 1.8 / 5;
        let ambient = [0.2, 0.2, 0.2];
        let diffuse = [0.3, 0.3, 0.3];
        let specular = [1.0, 1.0, 1.0];

        for (let i = 0; i < 5; i++) {
            let direction = V3.create();
            V3.spherical_radial(1.0, i * dPhi, Math.PI * 0.25, direction);
            let light = new SWGL_DirectionalLight("PRESET");
            light.ambient = ambient;
            light.diffuse = diffuse;
            light.specular = specular;
            light.direction = direction;

            environment.directionalLights[i] = light;
        }

        dPhi = Math.PI * 1.8 / 3;
        ambient = [0.0, 0.0, 0.0];
        diffuse = [0.4, 0.4, 0.4];
        specular = [1.0, 1.0, 1.0];
        for (let i = 0; i < 3; i++) {
            let direction = V3.create();
            V3.spherical_radial(1.0, Math.PI * 0.45 + i * dPhi, Math.PI * 0.65, direction);
            let light = new SWGL_DirectionalLight("PRESET");
            light.ambient = ambient;
            light.diffuse = diffuse;
            light.specular = specular;
            light.direction = direction;
            environment.directionalLights[5 + i] = light;
        }

        // environment
        let rootPathname = "/S8-pkgs-io-WebGL/assets/skycube/std3";
        environment.S8_set_radiance(SWGL_TextureCubeMap.create(rootPathname + "/radiance/face", ".png", 8));
        environment.S8_set_irradiance(SWGL_TextureCubeMap.create(rootPathname + "/irradiance/face", ".png", 1));

        return environment;
    }








    /**
     * @type{SWGL_Environment}
     */
    static create_Env2() {

        let environment = new SWGL_Environment("PRESET");

        /** @type{Array<SWGL_DirectionalLight>} */
        const lights = new Array();

        let dPhi = Math.PI * 1.8 / 5.0;

        let ambientLightColor = [0.2, 0.2, 0.2, 0.0];
        let diffuseLightColor = [0.3, 0.3, 0.3, 0.0];
        let specularLightColor = [1.0, 1.0, 1.0, 0.0];

        for (let i = 0; i < 5; i++) {
            /** @type{SWGL_DirectionalLight} */
            const light = new SWGL_DirectionalLight();
            light.S8_set_ambient(ambientLightColor);
            light.S8_set_diffuse(diffuseLightColor);
            light.S8_set_specular(specularLightColor);
            light.setSphericalDirection(i * dPhi, Math.PI * 0.25);

            lights.push(light);
        }

        dPhi = Math.PI * 1.8 / 3;
        ambientLightColor = [0.0, 0.0, 0.0, 0.0];
        diffuseLightColor = [0.4, 0.4, 0.4, 0.0];
        specularLightColor = [1.0, 1.0, 1.0, 0.0];
        for (let i = 0; i < 3; i++) {
            /** @type{SWGL_DirectionalLight} */
            const light = new SWGL_DirectionalLight();
            light.S8_set_ambient(ambientLightColor);
            light.S8_set_diffuse(diffuseLightColor);
            light.S8_set_specular(specularLightColor);
            light.setSphericalDirection(Math.PI * 0.45 + i * dPhi, Math.PI * 0.65);

            lights.push(light);
        }

        // set lights
        environment.S8_set_directionalLights(lights);

        // environment
        let rootPathname = "/S8-pkgs-io-WebGL/assets/skycube/std3";
        environment.S8_set_radiance(SWGL_TextureCubeMap.create(rootPathname + "/radiance/face", ".png", 8));
        environment.S8_set_irradiance(SWGL_TextureCubeMap.create(rootPathname + "/irradiance/face", ".png", 1));

        return environment;
    }

}
