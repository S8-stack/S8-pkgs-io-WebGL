



import * as M4 from '/S8-pkgs-io-WebGL/maths/SWGL_Matrix4d.js';

import { SWGL_Environment } from "/S8-pkgs-io-WebGL/scene/environment/SWGL_Environment.js";
import { SWGL_Program, VertexAttributesShaderLayout } from "../SWGL_Program.js";
import { SWGL_View } from "/S8-pkgs-io-WebGL/scene/view/SWGL_View.js";

import { SWGL_Model } from "/S8-pkgs-io-WebGL/scene/models/SWGL_Model.js";
import { PickingAppearance } from './PickingAppearance.js';


/**
 * 
 */
export class PickingProgram extends SWGL_Program {

	/**
	 * 
	 */
	constructor() {
		super("/picking");
	}

	
	/**
	 * @param{WebGL2RenderingContext} gl
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link(gl) {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		
		//this.loc_Uniform_material_glossiness = gl.getUniformLocation(this.handle, "matGlossiness");
		/* </uniforms> */

		/* <attributes> */
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		//this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
		/* </attributes> */
	}


	/**
	 * @param{WebGL2RenderingContext} gl
	 * To be overidden
	 */
	enable(gl) {
		// bind shader program
		gl.useProgram(this.handle);

		/* <enable-attributes> */
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.COLORS_LOCATION);
		/* </enable-attributes> */

	}



	/**
	 * 
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment() {

	}


	/**
	 * 
	 * @param {PickingAppearance} appearance 
	 */
	bindAppearance() {

	}



	/**
	 * @param {WebGL2RenderingContext} gl 
	 * @param {SWGL_View} view 
	 * @param {SWGL_Model} model 
	 */
	bindModel(gl, view, model) {
		/* <matrices> */
		// re-compute everything...
		let matrix_Model = model.matrix;
		M4.multiply(view.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.positionVertexAttributes.bind(gl);
		model.colorVertexAttributes.bind(gl);
		/* </bind-attributes> */

		/* <bind-elements> */
		model.elementIndices.bind(gl);
		/* </bind-elements> */
	}



	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 */
	disable(gl) {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.COLORS_LOCATION);
		/* </disable-attributes> */

		// unbind shader program
		/*
		From WebGL2.0 doc: "If program is zero, then the current rendering 
		state refers to an invalid program object and the results of shader execution are undefined" */
		//gl.useProgram(null);
	}

	S8_dispose() {
	}
}

