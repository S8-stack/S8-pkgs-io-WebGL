

import { S8Orbital } from '../../s8/S8.js';

import { gl } from '../nebulae.js.js';
import * as M4 from '../maths/NbMatrix4d';
import * as V3 from '../maths/NbVector3d';

export class DirectionalNbLight extends S8Orbital {

	constructor(id){
		super(id);
		this.direction = V3.create();
		this.inWorldDirection = V3.create();
	}

	S8_set(code, value){
		switch(code){
			case 0x20: this.ambient = value; break;
			case 0x21: this.diffuse = value; break;
			case 0x22: this.specular = value; break;
			case 0x23: this.direction = value; break;
		}
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
	
	bind(handle){
		gl.uniform4fv(handle.loc_Uniform_light_ambient, this.ambient);
		gl.uniform4fv(handle.loc_Uniform_light_diffuse, this.diffuse);
		gl.uniform4fv(handle.loc_Uniform_light_specular, this.specular);
		gl.uniform3fv(handle.loc_Uniform_light_direction, this.inWorldDirection);	
	}
};