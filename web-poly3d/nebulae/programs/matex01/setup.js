import { NbProgram } from "../NbProgram";


/**
 * 
 */
export class Matex01NbProgram extends NbProgram {

	constructor(id) {
		super(id, "matex01");
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
		this.vertexAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
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
		gl.enableVertexAttribArray(this.vertexAttributeLocation);
		gl.enableVertexAttribArray(this.normalAttributeLocation);
		gl.enableVertexAttribArray(this.texCoordAttributeLocation);
		/* </enable-attributes> */
	}


	/**
	 * 
	 * @param {*} environment 
	 */
	 bindEnvironment(environment){
		for(var i=0; i<this.nbLights; i++){ this.lightUniforms[i].bind(environment.lights[i]); }
	}


	/**
	 * 
	 * @param {*} appearance 
	 */
	bindAppearance(appearance){
		this.materialUniform.bind(appearance);
	}
	

	/**
	 * 
	 * @param {NbModel} model 
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

		/* <bind-attributes> */
		model.bindVertexAttributes(this.vertexAttributeLocation);
		model.bindNormalAttributes(this.normalAttributeLocation);
		model.bindTexCoordAttributes(this.texCoordAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.elements.bind();
		/* </bind-elements> */
	}


	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.vertexAttributeLocation);
		gl.disableVertexAttribArray(this.normalAttributeLocation);
		gl.disableVertexAttribArray(this.texCoordAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}

}