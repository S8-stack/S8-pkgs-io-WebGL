import { NbModel } from "../../meshes/NbModel";
import { NbProgram } from "../NbProgram";

/**
 * 
 */
export class ColorNbProgram extends NbProgram {


	/**
	 * 
	 */
	constructor() {
		super("color");

		this.dimension = 2;

		// attributes
		this.isVertexAttributeEnabled = true;
		this.isColorAttributeEnabled = true;
	}


	/**
		 * Linking of uniforms and attributes (to be overriden)
		 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		/* </uniforms> */

		/* <attributes> */
		this.vertexAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		this.colorAttributeLocation = gl.getAttribLocation(this.handle, "color");
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
		gl.enableVertexAttribArray(this.colorAttributeLocation);
		/* </enable-attributes> */
	}

	bindEnvironment(environment) {
		// nothing to do here...
	}

	bindAppearance(apperance) {
		// nothing to do here...
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
		model.bindColorAttributes(this.colorAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.elements.bind();
		/* </bind-elements> */

	}


	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.vertexAttributeLocation);
		gl.disableVertexAttribArray(this.colorAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}
}



