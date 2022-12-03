

import { NbProgram } from "/s8-ng-geo/nebulae/appearances/NbProgram.js";
import { Color2NbAppearance } from "/s8-ng-geo/nebulae/appearances/color2/Color2NbAppearance.js";
import { NbEnvironment } from "/s8-ng-geo/nebulae/environment/NbEnvironment.js";
import { gl } from "/s8-ng-geo/nebulae/nebulae.js";

import * as M4 from '../../maths/NbMatrix4d.js';

import { NbMesh, NbVertexAttributes } from "../../models/NbMesh.js";
import { NbView } from "/s8-ng-geo/nebulae/view/NbView.js";


/**
 * 
 */
export class Color2NbProgram extends NbProgram {


	/**
	 * 
	 */
	constructor() {
		super("/s8-ng-geo/nebulae/appearances/color2");
	}


	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link(){

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

		this.loc_Uniform_color = gl.getUniformLocation(this.handle, `color`);
		/* </uniforms> */

		/* <attributes> */
		this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		/* </attributes> */
	}


	/**
	 * To be overidden
	 */
	enable() {
		// bind shader program
		gl.useProgram(this.handle);

		/* <enable-attributes> */
		gl.enableVertexAttribArray(this.pointAttributeLocation);
		/* </enable-attributes> */
	}

	
	/**
	 * 
	 * @param {NbEnvironment} environment 
	 */
	bindEnvironment(environment) {
		// environment
	}


	/**
	 * 
	 * @param {Color2NbAppearance} appearance 
	 */
	bindAppearance(appearance) {
		// material
		gl.uniform4fv(this.loc_Uniform_color, appearance.color);
	}
	

	/**
	 * @param {NbView} view 
	 * @param {NbMesh} model 
	 */
	bindModel(view, model) {
		/* <matrices> */
		// re-compute everything...
		let matrix_Model = model.matrix;
		M4.multiply(view.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(NbVertexAttributes.POSITIONS, this.pointAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		model.bindElements();
		/* </bind-elements> */
	}

	
	disable() {
		
		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.pointAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(null);
	}
	
}
