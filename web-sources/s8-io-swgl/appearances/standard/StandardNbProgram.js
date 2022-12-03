


import { gl } from '../../nebulae.js';

import * as M4 from '../../maths/NbMatrix4d.js';

import { NbMesh } from "../../models/NbMesh.js";
import { NbEnvironment } from "/s8-ng-geo/nebulae/environment/NbEnvironment.js";
import { NbProgram } from "/s8-ng-geo/nebulae/appearances/NbProgram.js";
import { StandardNbAppearance } from "/s8-ng-geo/nebulae/appearances/standard/StandardNbAppearance.js";
import { NbView } from "/s8-ng-geo/nebulae/view/NbView.js";


/**
 * 
 */
export class StandardNbProgram extends NbProgram {

	/**
	 * 
	 */
	constructor() {
		super("/s8-ng-geo/nebulae/appearances/standard");
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
		this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
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
		gl.enableVertexAttribArray(this.normalAttributeLocation);
		/* </enable-attributes> */
	}



	/**
	 * 
	 * @param {NbEnvironment} environment 
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
	 * @param {StandardNbAppearance} appearance 
	 */
	bindAppearance(appearance) {
		// material
		gl.uniform1f(this.loc_Uniform_material_glossiness, appearance.glossiness);
		gl.uniform1f(this.loc_Uniform_material_roughness, appearance.roughness);
		gl.uniform4fv(this.loc_Uniform_material_specularColor, appearance.specularColor);
		gl.uniform4fv(this.loc_Uniform_material_diffuseColor, appearance.diffuseColor);
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
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, matrix_Model);
		gl.uniform3fv(this.loc_Uniform_eyePosition, view.eyePosition);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindPointVertexAttributes(this.pointAttributeLocation);
		model.bindNormalVertexAttributes(this.normalAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		model.bindElements();
		/* </bind-elements> */
	}



	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.pointAttributeLocation);
		gl.disableVertexAttribArray(this.normalAttributeLocation);
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

