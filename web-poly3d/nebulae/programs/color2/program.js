

import { NbProgram } from "../NbProgram";


/**
 * 
 */
export class Color2NbProgram extends NbProgram {


	constructor(id) {
		super(id, "color2");
	}


	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	link(){

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		/* </uniforms> */

		/* <attributes> */
		this.vertexAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
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
		gl.enableVertexAttribArray(this.colorAttributeLocation);
		gl.enableVertexAttribArray(this.uTangentAttributeLocation);
		gl.enableVertexAttribArray(this.vTangentAttributeLocation);
		/* </enable-attributes> */
	}

	
	/**
	 * 
	 * @param {*} environment 
	 */
	bindEnvironment(environment) {
		// environment
	}


	/**
	 * 
	 * @param {*} appearance 
	 */
	bindAppearance(appearance) {
		// material
		gl.uniform4fv(this.loc_Uniform_color, appearance.wireColor);
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
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(this.vertexAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.elements.bind();
		/* </bind-elements> */
	}

	
	disable() {
		
		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.vertexAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}
	
}
