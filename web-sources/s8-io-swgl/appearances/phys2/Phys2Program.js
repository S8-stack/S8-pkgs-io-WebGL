


import { gl } from '/s8-io-swgl/swgl.js';

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';

import { SWGL_Environment } from "/s8-io-swgl/environment/SWGL_Environment.js";
import { SWGL_Program } from "/s8-io-swgl/appearances/SWGL_Program.js";
import { StandardAppearance } from "/s8-io-swgl/appearances/standard/StandardAppearance.js";
import { SWGL_View } from "/s8-io-swgl/view/SWGL_View.js";

import { SWGL_Model } from "/s8-io-swgl/models/SWGL_Model.js";
import { VertexAttributes } from '/s8-io-swgl/models/SWGL_Mesh.js';
import { Phys2Appearance } from 'appearances/phys2/Phys2Appearance.js';



export const PROPERTIES_TEXTURE_INDEX = 0;
export const EMISSIVE_COLORS_TEXTURE_INDEX = 1;
export const DIFFUSE_COLORS_TEXTURE_INDEX = 2;
export const SPECULAR_COLORS_TEXTURE_INDEX = 3;

/**
 * 
 */
export class StandardProgram extends SWGL_Program {

	/**
	 * 
	 */
	constructor() {
		super("/s8-io-swgl/appearances/phys2");
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

		// properties, diffuse, specular
		this.loc_Uniform_matProperties = gl.getUniformLocation(this.handle, "matProperties");
		this.loc_Uniform_matEmissiveColors = gl.getUniformLocation(this.handle, "matEmissiveColors");
		this.loc_Uniform_matDiffuseColors = gl.getUniformLocation(this.handle, "matDiffuseColors");
		this.loc_Uniform_matSpecularColors = gl.getUniformLocation(this.handle, "matSpecularColors");

		this.loc_Uniform_material_glossiness = gl.getUniformLocation(this.handle, "matGlossiness");
		this.loc_Uniform_material_roughness = gl.getUniformLocation(this.handle, "matRoughness");
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
		gl.enableVertexAttribArray(VertexAttributes.TEX_COORDS_LOCATION);
		/* </enable-attributes> */


		/* <enable-textures> */
		gl.uniform1i(this.loc_Uniform_matProperties, PROPERTIES_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matDiffuseColors, EMISSIVE_COLORS_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matDiffuseColors, DIFFUSE_COLORS_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matSpecularColors, SPECULAR_COLORS_TEXTURE_INDEX);
		/* </enable-textures> */
	}



	/**
	 * 
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment(environment) {
		if (environment.radiance != null) {
			environment.radiance.bind(this.loc_Uniform_radiance, 0);
		}

		if (environment.irradiance != null) {
			environment.irradiance.bind(this.loc_Uniform_irradiance, 1);
		}
	}


	/**
	 * 
	 * @param {Phys2Appearance} appearance 
	 */
	bindAppearance(appearance) {

		// material
		appearance.propsTex.bind(PROPERTIES_TEXTURE_INDEX);
		appearance.emissiveColorsTex.bind(EMISSIVE_COLORS_TEXTURE_INDEX);
		appearance.diffuseColorsTex.bind(DIFFUSE_COLORS_TEXTURE_INDEX);
		appearance.specularColorsTex.bind(SPECULAR_COLORS_TEXTURE_INDEX);
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
		model.mesh.texCoordsVertexAttributes.bind();
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

	S8_dispose() {
	}
}

