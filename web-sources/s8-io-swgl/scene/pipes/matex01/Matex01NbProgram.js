import { SWGL_Pipe } from "../SWGL_Pipe";
import { SWGL_Model } from "../../scene/models/SWGL_Model.js";
import { NbMaterialUniform } from "../../materials/MaterialUniform.js";
import { DirectionalLightNbUniform } from "../../lights/DirectionalLightUniform.js";
import { Matex01NbAppearance } from "/s8-ng-geo/nebulae/appearances/matex01/Matex01Appearance.js";


/**
 * 
 */
export class Matex01NbProgram extends SWGL_Pipe {


	/**
	 * @type {NbMaterialUniform}
	 */
	materialUniform;


	/**
	 * @type {DirectionalLightNbUniform[]}
	 */
	lightUniforms;

	constructor(id) {
		super(id, "matex01");

		this.materialUniform = new NbMaterialUniform("material");
		this.lightUniforms = new Array();
		for(let i=0; i<8; i++){ 
			this.lightUniforms.push(new DirectionalLightNbUniform(`light[${i}]`));
		}
	}

	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	 link() {

		/* <uniforms> */

		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
		this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
		
		for(let i=0; i<8; i++){ this.lightUniforms[i].link(this.handle); }

		this.materialUniform.link(this.handle);
		
		/* </uniforms> */

		/* <attributes> */
		this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
		this.texCoordAttributeLocation = gl.getAttribLocation(this.handle, "texCoord");
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
		gl.enableVertexAttribArray(this.texCoordAttributeLocation);
		/* </enable-attributes> */
	}


	/**
	 * 
	 * @param {*} environment 
	 */
	bindEnvironment(environment){
		for(var i=0; i<environment.nbLights; i++){ this.lightUniforms[i].bind(environment.lights[i]); }
	}


	/**
	 * 
	 * @param {Matex01NbAppearance} appearance 
	 */
	bindAppearance(appearance){
		this.materialUniform.bind(appearance.material);	
	}
	

	/**
	 * 
	 * @param {SWGL_Model} model 
	 */
	bindModel(model) {
		/* <matrices> */
		// re-compute everything...
		let matrix_Model = model.matrix;
		M4.multiply(this.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
		M4.multiply(this.matrix_View, matrix_Model, this.matrix_ViewModel);
		M4.transposeInverse(this.matrix_ViewModel, this.matrix_Normal);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, this.matrix_ViewModel);
		gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, this.matrix_Normal);
		/* </bind-uniforms> */


		let mesh = model.mesh;
		
		/* <bind-attributes> */
		mesh.bindPointVertexAttributes(this.pointAttributeLocation);
		mesh.bindNormalVertexAttributes(this.normalAttributeLocation);
		mesh.bindTexCoordVertexAttributes(this.texCoordAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.bindElements();
		/* </bind-elements> */
	}


	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.pointAttributeLocation);
		gl.disableVertexAttribArray(this.normalAttributeLocation);
		gl.disableVertexAttribArray(this.texCoordAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}

}