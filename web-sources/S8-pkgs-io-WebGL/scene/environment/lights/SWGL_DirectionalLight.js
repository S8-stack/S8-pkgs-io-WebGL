
import { NeObject } from '/S8-core-bohr-neon/NeObject.js';


import * as M4 from '/S8-pkgs-io-WebGL/maths/SWGL_Matrix4d.js';
import * as V3 from '/S8-pkgs-io-WebGL/maths/SWGL_Vector3d.js';


export class SWGL_DirectionalLight extends NeObject {



    /**
     * @type {Float32Array}
     */
	 ambient;

	 /**
	  * @type {Float32Array}
	  */
	 diffuse;
 
	 /**
	  * @type {Float32Array}
	  */
	 specular;
 
	 /**
	  * @type {Float32Array}
	  */
	 direction;
	 

	constructor(){
		super();
		this.direction = V3.create();
		this.inWorldDirection = V3.create();
	}


	/**
	 * 
	 * @param {Float32Array} color 
	 */
	S8_set_ambient(color){
		this.ambient = color;
	}

	/**
	 * 
	 * @param {Float32Array} color 
	 */
	 S8_set_diffuse(color){
		this.diffuse = color;
	}


	/**
	 * 
	 * @param {Float32Array} color 
	 */
	 S8_set_specular(color){
		this.specular = color;
	}


	/**
	 * 
	 * @param {Float32Array} vector 
	 */
	 S8_set_direction(vector){
		this.direction = vector;
	}


	/**
	 * 
	 * @param {number} phi 
	 * @param {number} theta 
	 */
	setSphericalDirection(phi, theta){
		const vector = new Float32Array(3);
		vector[0] = Math.cos(phi) * Math.sin(theta);
		vector[1] = Math.sin(phi) * Math.sin(theta);
		vector[2] = Math.cos(theta);
		this.direction = vector;
	}
	

	S8_render(){
		// nothing to do here
	}


	/**
	 * 
	 * @param {Float32Array} matrix_View 
	 */
	update(matrix_View){
		M4.transformVector3d(matrix_View, this.direction, this.inWorldDirection);	
	}
	

	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 * @param {*} handle 
	 */
	bind(gl, handle){
		gl.uniform4fv(handle.loc_Uniform_light_ambient, this.ambient);
		gl.uniform4fv(handle.loc_Uniform_light_diffuse, this.diffuse);
		gl.uniform4fv(handle.loc_Uniform_light_specular, this.specular);
		gl.uniform3fv(handle.loc_Uniform_light_direction, this.inWorldDirection);	
	}


	S8_render(){ /* nothing to do */ }

    S8_dispose(){ /* nothing to do */ }
};