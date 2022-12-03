

import { gl } from '../../nebulae.js';

import * as M4 from '../../maths/NbMatrix4d.js';


import { NbMesh, NbVertexAttributes } from "../../models/NbMesh.js";
import { NbMaterialUniform } from '/s8-ng-geo/nebulae/materials/NbMaterialUniform.js';
import { NbEnvironment } from '/s8-ng-geo/nebulae/environment/NbEnvironment.js';
import { NbView } from '/s8-ng-geo/nebulae/view/NbView.js';
import { NbProgram } from "/s8-ng-geo/nebulae/appearances/NbProgram.js";
import { Mat01NbAppearance } from "/s8-ng-geo/nebulae/appearances/mat01/Mat01NbAppearance.js";
import { DirectionalNbLightUniform } from "/s8-ng-geo/nebulae/lights/DirectionalNbLightUniform.js";



/**
 * 
 */
export class Mat01NbProgram extends NbProgram {


	static NB_DIRECTIONAL_LIGHTS = 4;


	/**
	 * @type {DirectionalNbLightUniform[]}
	 */
	lightUniforms;


	/**
	 * @type {NbMaterialUniform}
	 */
	materialUniform;


	/**
	 * 
	 */
	constructor() {
		super("/s8-ng-geo/nebulae/appearances/mat01");
		this.lightUniforms = new Array();
		for (let i = 0; i < Mat01NbProgram.NB_DIRECTIONAL_LIGHTS; i++) {
			this.lightUniforms[i] = new DirectionalNbLightUniform();
		}
		this.materialUniform = new NbMaterialUniform();
	}


	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
		this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
		for (let i = 0; i < Mat01NbProgram.NB_DIRECTIONAL_LIGHTS; i++) {
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
	 * @param {NbEnvironment} environment 
	 */
	bindEnvironment(environment) {
		for (var i = 0; i < Mat01NbProgram.NB_DIRECTIONAL_LIGHTS; i++) {
			this.lightUniforms[i].bind(environment.directionalLights[i]);
		}
	}


	/**
	 * 
	 * @param {Mat01NbAppearance} appearance 
	 */
	bindAppearance(appearance) {
		this.materialUniform.bind(appearance.material);
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
		M4.multiply(view.matrix_View, matrix_Model, this.matrix_ViewModel);
		M4.transposeInverse(this.matrix_ViewModel, this.matrix_Normal);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, this.matrix_ViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_N, false, this.matrix_Normal);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(NbVertexAttributes.POSITIONS, this.pointAttributeLocation);
		model.bindVertexAttributes(NbVertexAttributes.NORMALS, this.normalAttributeLocation);
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

