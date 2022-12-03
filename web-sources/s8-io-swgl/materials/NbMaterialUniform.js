import { NbMaterial } from "./NbMaterial.js";
import { gl } from "/s8-ng-geo/nebulae/nebulae.js";


/**
 * 
 */
export class NbMaterialUniform {


    /**
     * @type {WebGLUniformLocation}
     */
    loc_Uniform_material_ambient;
	
    /**
     * @type {WebGLUniformLocation}
     */
    loc_Uniform_material_diffuse;
	
    /**
     * @type {WebGLUniformLocation}
     */
    loc_Uniform_material_specular;

   /**
     * @type {WebGLUniformLocation}
     */
	loc_Uniform_material_shininess;

    
    constructor() {
    }
    
    /**
     * 
     * @param {WebGLProgram} handle 
     * @param {string} name
     */
    link(handle, name){
        // material
		this.loc_Uniform_material_ambient = gl.getUniformLocation(handle, `${name}.ambient`);
		this.loc_Uniform_material_diffuse = gl.getUniformLocation(handle, `${name}.diffuse`);
		this.loc_Uniform_material_specular = gl.getUniformLocation(handle, `${name}.specular`);
		this.loc_Uniform_material_shininess = gl.getUniformLocation(handle, `${name}.shininess`);
    }

    /**
     * 
     * @param {NbMaterial} material 
     */
    bind(material){
        gl.uniform4fv(this.loc_Uniform_material_ambient, material.ambient);
        gl.uniform4fv(this.loc_Uniform_material_diffuse, material.diffuse);
        gl.uniform4fv(this.loc_Uniform_material_specular, material.specular);
        gl.uniform1f(this.loc_Uniform_material_shininess, material.shininess);
    }

}
