

import { gl } from '/s8-io-swgl/swgl.js';

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';


import { SWGL_Mesh, VertexAttributes } from "/s8-io-swgl/models/SWGL_Mesh.js";
import { MaterialUniform } from '/s8-io-swgl/materials/MaterialUniform.js';
import { SWGL_Environment } from '/s8-io-swgl/environment/SWGL_Environment.js';
import { SWGL_View } from '/s8-io-swgl/view/SWGL_View.js';
import { SWGL_Program } from "/s8-io-swgl/appearances/SWGL_Program.js";
import { Mat01Appearance } from "/s8-io-swgl/appearances/mat01/Mat01Appearance.js";
import { DirectionalLightUniform } from "/s8-io-swgl/lights/DirectionalLightUniform.js";



/**
 * 
 */
export class Mat01Program extends SWGL_Program {


	static NB_DIRECTIONAL_LIGHTS = 4;


	/**
	 * @type {DirectionalLightUniform[]}
	 */
	lightUniforms;


	/**
	 * @type {MaterialUniform}
	 */
	materialUniform;


	/**
	 * 
	 */
	constructor() {
		super("/s8-io-swgl/appearances/mat01");
		this.lightUniforms = new Array();
		for (let i = 0; i < Mat01Program.NB_DIRECTIONAL_LIGHTS; i++) {
			this.lightUniforms[i] = new DirectionalLightUniform();
		}
		this.materialUniform = new MaterialUniform();
	}


	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
		this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
		for (let i = 0; i < Mat01Program.NB_DIRECTIONAL_LIGHTS; i++) {
			this.lightUniforms[i].link(this.handle, `lights[${i}]`);
		}
		this.materialUniform.link(this.handle, "material");
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
	 * @param {SWGL_Environment} environment 
	 */
	bindEnvironment(environment) {
		for (var i = 0; i < Mat01Program.NB_DIRECTIONAL_LIGHTS; i++) {
			this.lightUniforms[i].bind(environment.directionalLights[i]);
		}
	}


	/**
	 * 
	 * @param {Mat01Appearance} appearance 
	 */
	bindAppearance(appearance) {
		this.materialUniform.bind(appearance.material);
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
		M4.multiply(view.matrix_View, matrix_Model, this.matrix_ViewModel);
		M4.transposeInverse(this.matrix_ViewModel, this.matrix_Normal);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, this.matrix_ViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_N, false, this.matrix_Normal);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(VertexAttributes.POSITIONS, this.pointAttributeLocation);
		model.bindVertexAttributes(VertexAttributes.NORMALS, this.normalAttributeLocation);
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

}

