

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
	 */
	link(){

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = this.gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

		this.loc_Uniform_color = this.gl.getUniformLocation(this.handle, `color`);
		/* </uniforms> */

		/* <attributes> */
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		/* </attributes> */
	}


	/**
	 * @param{WebGL2RenderingContext} gl
	 */
	enable() {
		// bind shader program
		this.gl.useProgram(this.handle);

		/* <enable-attributes> */
		this.gl.enableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
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
	bindAppearance(appearance) {
		// material
		this.gl.uniform4fv(this.loc_Uniform_color, appearance.color);
	}
	

	/**
	 * @param{WebGL2RenderingContext} gl
	 * @param {SWGL_View} view 
	 * @param {SWGL_Model} model 
	 */
	bindModel(view, model) {

		const gl = this.gl;
		
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
	disable() {

		
		
		/* <disable-attributes> */
		this.gl.disableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		/* </disable-attributes> */

		// unbind shader program
		this.gl.useProgram(null);
	}
	
}
