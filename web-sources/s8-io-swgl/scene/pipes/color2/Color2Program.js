

import { SWGL_Program } from "../SWGL_Program.js";
import { Color2Appearance } from "./Color2Appearance.js";
import { SWGL_Environment } from "/s8-io-swgl/scene/environment/SWGL_Environment.js";
import { gl } from "/s8-io-swgl/swgl.js";

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { SWGL_View } from "/s8-io-swgl/scene/view/SWGL_View.js";

import { SWGL_Model } from "/s8-io-swgl/scene/models/SWGL_Model.js";
import { VertexAttributes } from "/s8-io-swgl/scene/models/SWGL_Mesh.js";


/**
 * 
 */
export class Color2Program extends SWGL_Program {


	/**
	 * 
	 */
	constructor() {
		super("/color2");
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
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		/* </attributes> */
	}


	/**
	 * To be overidden
	 */
	enable() {
		// bind shader program
		gl.useProgram(this.handle);

		/* <enable-attributes> */
		gl.enableVertexAttribArray(VertexAttributes.POSITIONS_LOCATION);
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
	 * @param {SWGL_Model} model 
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
		model.mesh.positionVertexAttributes.bind();
		/* </bind-attributes> */

		/* <bind-elements> */
		model.mesh.elementIndices.bind();
		/* </bind-elements> */
	}

	
	disable() {
		
		/* <disable-attributes> */
		gl.disableVertexAttribArray(VertexAttributes.POSITIONS_LOCATION);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(null);
	}
	
}
