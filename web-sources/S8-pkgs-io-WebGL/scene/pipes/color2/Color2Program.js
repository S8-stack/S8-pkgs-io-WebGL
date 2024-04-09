

import { SWGL_Program, VertexAttributesShaderLayout } from "../SWGL_Program.js";
import { Color2Appearance } from "./Color2Appearance.js";

import * as M4 from '/S8-pkgs-io-WebGL/maths/SWGL_Matrix4d.js';

import { SWGL_View } from "/S8-pkgs-io-WebGL/scene/view/SWGL_View.js";

import { SWGL_Model } from "/S8-pkgs-io-WebGL/scene/models/SWGL_Model.js";


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
	 * Linking of uniforms and attributes
	 * @param{WebGL2RenderingContext} gl
	 */
	link(gl){

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

		this.loc_Uniform_color = gl.getUniformLocation(this.handle, `color`);
		/* </uniforms> */

		/* <attributes> */
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		/* </attributes> */
	}


	/**
	 * @param{WebGL2RenderingContext} gl
	 */
	enable(gl) {
		// bind shader program
		gl.useProgram(this.handle);

		/* <enable-attributes> */
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		/* </enable-attributes> */
	}

	
	/**
	 */
	bindEnvironment() {
		// environment
	}


	/**
	 * @param{WebGL2RenderingContext} gl
	 * @param {Color2Appearance} appearance 
	 */
	bindAppearance(gl, appearance) {
		// material
		gl.uniform4fv(this.loc_Uniform_color, appearance.color);
	}
	

	/**
	 * @param{WebGL2RenderingContext} gl
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
		/* </bind-attributes> */

		/* <bind-elements> */
		model.elementIndices.bind(gl);
		/* </bind-elements> */
	}

	
	/**
	 * 
	 * @param{WebGL2RenderingContext} gl
	*/
	disable(gl) {
		
		/* <disable-attributes> */
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(null);
	}
	
}
