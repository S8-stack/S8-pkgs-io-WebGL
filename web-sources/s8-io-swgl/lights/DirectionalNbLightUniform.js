
import { DirectionalNbLight } from "/s8-ng-geo/nebulae/lights/DirectionalNbLight.js";
import { gl } from "/s8-ng-geo/nebulae/nebulae.js";


/**
 * 
 */
export class DirectionalNbLightUniform {

	/**
	 * @type {WebGLUniformLocation}
	*/
	loc_Uniform_light_ambient;

	/**
 * @type {WebGLUniformLocation}
 */
	loc_Uniform_light_diffuse;

	/**
 * @type {WebGLUniformLocation}
 */
	loc_Uniform_light_specular;


	/**
	 * @type {WebGLUniformLocation}
	 */
	loc_Uniform_light_direction;



	constructor() {
	}


	/**
	 * 
	 * @param {WebGLProgram} handle 
	 * @param {string} name
	 */
	link(handle, name) {
		this.loc_Uniform_light_ambient = gl.getUniformLocation(handle, `${name}.ambient`);
		this.loc_Uniform_light_diffuse = gl.getUniformLocation(handle, `${name}.diffuse`);
		this.loc_Uniform_light_specular = gl.getUniformLocation(handle, `${name}.specular`);
		this.loc_Uniform_light_direction = gl.getUniformLocation(handle, `${name}.direction`);
	}


	/**
	 * 
	 * @param {DirectionalNbLight} light 
	 */
	bind(light) {
		gl.uniform4fv(this.loc_Uniform_light_ambient, light.ambient);
		gl.uniform4fv(this.loc_Uniform_light_diffuse, light.diffuse);
		gl.uniform4fv(this.loc_Uniform_light_specular, light.specular);
		gl.uniform3fv(this.loc_Uniform_light_direction, light.direction);
	}

}