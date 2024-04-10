



import * as M4 from '/S8-pkgs-io-WebGL/maths/SWGL_Matrix4d.js';

import { SWGL_Environment } from "/S8-pkgs-io-WebGL/scene/environment/SWGL_Environment.js";
import { SWGL_Program, VertexAttributesShaderLayout } from "../SWGL_Program.js";
import { SWGL_View } from "/S8-pkgs-io-WebGL/scene/view/SWGL_View.js";

import { SWGL_Model } from "/S8-pkgs-io-WebGL/scene/models/SWGL_Model.js";
import { Phys2Appearance } from './Phys2Appearance.js';


export const RADIANCE_TEXTURE_INDEX = 0;
export const IRRADIANCE_TEXTURE_INDEX = 1;

export const PROPERTIES_TEXTURE_INDEX = 2;
export const EMISSIVE_COLORS_TEXTURE_INDEX = 3;
export const DIFFUSE_COLORS_TEXTURE_INDEX = 4;
export const SPECULAR_COLORS_TEXTURE_INDEX = 5;

/**
 * 
 */
export class Phys2Program extends SWGL_Program {

	/**
	 * 
	 */
	constructor() {
		super("/phys2");
	}

	/**
	 * @param{WebGL2RenderingContext} gl
	 */
	link() {

		const gl = this.gl;

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
		

		//this.loc_Uniform_material_glossiness = gl.getUniformLocation(this.handle, "matGlossiness");
		/* </uniforms> */

		/* <attributes> */
		//this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		//this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
		/* </attributes> */
	}


	/**
	 */
	enable() {

		const gl = this.gl;

		// bind shader program
		gl.useProgram(this.handle);


		/* <enable-attributes> */
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.NORMALS_LOCATION);
		gl.enableVertexAttribArray(VertexAttributesShaderLayout.TEX_COORDS_LOCATION);
		/* </enable-attributes> */

		gl.uniform1i(this.loc_Uniform_radiance, RADIANCE_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_irradiance, IRRADIANCE_TEXTURE_INDEX);

		gl.uniform1i(this.loc_Uniform_matProperties, PROPERTIES_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matEmissiveColors, EMISSIVE_COLORS_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matDiffuseColors, DIFFUSE_COLORS_TEXTURE_INDEX);
		gl.uniform1i(this.loc_Uniform_matSpecularColors, SPECULAR_COLORS_TEXTURE_INDEX);
	}



	/**
	 * 
	 * @param {WebGL2RenderingContext} gl 
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment(environment) {
		const gl = this.gl;

		if (environment.radiance != null) {
			environment.radiance.bind(RADIANCE_TEXTURE_INDEX);
		}

		if (environment.irradiance != null) {
			environment.irradiance.bind(IRRADIANCE_TEXTURE_INDEX);
		}
	}


	/**
	 * 
	 * @param {Phys2Appearance} appearance 
	 */
	bindAppearance(appearance) {

		const gl = this.gl;

		/* <bind-textures> */
		appearance.propsTex.bind(gl, PROPERTIES_TEXTURE_INDEX);
		appearance.emissiveColorsTex.bind(gl, EMISSIVE_COLORS_TEXTURE_INDEX);
		appearance.diffuseColorsTex.bind(gl, DIFFUSE_COLORS_TEXTURE_INDEX);
		appearance.specularColorsTex.bind(gl, SPECULAR_COLORS_TEXTURE_INDEX);
		/* </bind-textures> */
	}



	/**
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
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, matrix_Model);
		gl.uniform3fv(this.loc_Uniform_eyePosition, view.eyePosition);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.positionVertexAttributes.bind(gl);
		model.normalVertexAttributes.bind(gl);
		model.texCoordsVertexAttributes.bind(gl);
		/* </bind-attributes> */

		/* <bind-elements> */
		model.elementIndices.bind(gl);
		/* </bind-elements> */
	}



	/**
	 * @param{WebGL2RenderingContext} gl
	 */
	disable() {

		const gl = this.gl;

		/* <disable-attributes> */
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.POSITIONS_LOCATION);
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.NORMALS_LOCATION);
		gl.disableVertexAttribArray(VertexAttributesShaderLayout.TEX_COORDS_LOCATION);
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

