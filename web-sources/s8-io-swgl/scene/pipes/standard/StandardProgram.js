


import { gl } from '/s8-io-swgl/swgl.js';

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { SWGL_Environment } from "/s8-io-swgl/scene/environment/SWGL_Environment.js";
import { SWGL_Program } from "../SWGL_Program.js";
import { StandardAppearance } from "./StandardAppearance.js";
import { SWGL_View } from "/s8-io-swgl/scene/view/SWGL_View.js";

import { SWGL_Model } from "/s8-io-swgl/scene/models/SWGL_Model.js";
import { VertexAttributes } from '/s8-io-swgl/scene/models/SWGL_Mesh.js';


/**
 * 
 */
export class StandardProgram extends SWGL_Program {

	/**
	 * 
	 */
	constructor() {
		super("/standard");
	}

	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");

		this.loc_Uniform_eyePosition = gl.getUniformLocation(this.handle, "eyePosition");

		this.loc_Uniform_radiance = gl.getUniformLocation(this.handle, "radiance");
		this.loc_Uniform_irradiance = gl.getUniformLocation(this.handle, "irradiance");
	
		this.loc_Uniform_material_glossiness = gl.getUniformLocation(this.handle, "matGlossiness");
		this.loc_Uniform_material_roughness = gl.getUniformLocation(this.handle, "matRoughness");
		this.loc_Uniform_material_specularColor = gl.getUniformLocation(this.handle, "matSpecularColor");
		this.loc_Uniform_material_diffuseColor = gl.getUniformLocation(this.handle, "matDiffuseColor");
		/* </uniforms> */

		/* <attributes> */
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		//this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
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
		gl.enableVertexAttribArray(VertexAttributes.NORMALS_LOCATION);
		/* </enable-attributes> */
	}



	/**
	 * 
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment(environment) {
		if(environment.radiance != null){
			environment.radiance.bind(this.loc_Uniform_radiance, 0);
		}

		if(environment.irradiance != null){
			environment.irradiance.bind(this.loc_Uniform_irradiance, 1);
		}
	}


	/**
	 * 
	 * @param {StandardAppearance} appearance 
	 */
	bindAppearance(appearance) {
		// material
		gl.uniform1f(this.loc_Uniform_material_glossiness, appearance.glossiness);
		gl.uniform1f(this.loc_Uniform_material_roughness, appearance.roughness);
		gl.uniform4fv(this.loc_Uniform_material_specularColor, appearance.specularColor);
		gl.uniform4fv(this.loc_Uniform_material_diffuseColor, appearance.diffuseColor);
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
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, matrix_Model);
		gl.uniform3fv(this.loc_Uniform_eyePosition, view.eyePosition);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.mesh.positionVertexAttributes.bind();
		model.mesh.normalVertexAttributes.bind();
		/* </bind-attributes> */

		/* <bind-elements> */
		model.mesh.elementIndices.bind();
		/* </bind-elements> */
	}



	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(VertexAttributes.POSITIONS_LOCATION);
		gl.disableVertexAttribArray(VertexAttributes.NORMALS_LOCATION);
		/* </disable-attributes> */

		// unbind shader program
		/*
		From WebGL2.0 doc: "If program is zero, then the current rendering 
		state refers to an invalid program object and the results of shader execution are undefined" */
		//gl.useProgram(null);
	}

	S8_dispose(){
	}
}

