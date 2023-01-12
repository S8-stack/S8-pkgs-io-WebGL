

import { gl } from '/s8-io-swgl/swgl.js';

import * as M4 from '/s8-io-swgl/maths/SWGL_Matrix4d.js';


import { MaterialUniform } from '/s8-io-swgl/materials/MaterialUniform.js';
import { SWGL_Environment } from '/s8-io-swgl/scene/environment/SWGL_Environment.js';
import { SWGL_View } from '/s8-io-swgl/scene/view/SWGL_View.js';
import { SWGL_Program } from "../SWGL_Program.js";
import { Mat01Appearance } from "./Mat01Appearance.js";
import { DirectionalLightUniform } from "/s8-io-swgl/scene/environment/lights/DirectionalLightUniform.js";

import { SWGL_Model } from "/s8-io-swgl/scene/models/SWGL_Model.js";
import { VertexAttributes } from '/s8-io-swgl/scene/models/SWGL_Mesh.js';



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
		super("/mat01");
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
	 * @param {SWGL_Model} model 
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

}

