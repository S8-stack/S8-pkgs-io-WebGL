

import { SWGL_Program } from "/s8-io-swgl/appearances/SWGL_Program.js";
import { Color2Appearance } from "/s8-io-swgl/appearances/color2/Color2Appearance.js";
import { SWGL_Environment } from "/s8-io-swgl/environment/SWGL_Environment.js";
import { gl } from "/s8-io-swgl/swgl.js";

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { SWGL_Mesh, VertexAttributes } from "/s8-io-swgl/models/SWGL_Mesh.js";
import { SWGL_View } from "/s8-io-swgl/view/SWGL_View.js";


/**
 * 
 */
export class Color2Program extends SWGL_Program {


	/**
	 * 
	 */
	constructor() {
		super("/s8-io-swgl/appearances/color2");
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
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment(environment) {
		// environment
	}


	/**
	 * 
	 * @param {Color2Appearance} appearance 
	 */
	bindAppearance(appearance) {
		// material
		gl.uniform4fv(this.loc_Uniform_color, appearance.color);
	}
	

	/**
	 * @param {SWGL_View} view 
	 * @param {SWGL_Mesh} model 
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
		model.bindVertexAttributes(VertexAttributes.POSITIONS, this.pointAttributeLocation);
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
