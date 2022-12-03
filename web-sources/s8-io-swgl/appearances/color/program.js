
import { gl } from "../../nebulae";
import { NbEnvironment } from "../../environment/NbEnvironment";
import { NbView } from "../../view/NbView";
import { NbMesh } from "../../models/NbMesh";
import { NbAppearance } from "../NbAppearance";
import { NbRenderer } from "../NbRenderer";

/**
 * 
 */
export class ColorNbProgram extends NbRenderer {


	/**
	 * 
	 */
	constructor() {
		super("color");

		// mesh properties
		this.meshProperties.dimension = 2;
		this.meshProperties.isVertexAttributeEnabled = true;
		this.meshProperties.isColorAttributeEnabled = true;
	}


	/**
		 * Linking of uniforms and attributes (to be overriden)
		 */
	link() {

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		/* </uniforms> */

		/* <attributes> */
		this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
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
		gl.enableVertexAttribArray(this.pointAttributeLocation);
		gl.enableVertexAttribArray(this.colorAttributeLocation);
		/* </enable-attributes> */
	}


	/**
	 * 
	 * @param {NbEnvironment} environment 
	 */
	bindEnvironment(environment) {
		// nothing to do here...
	}


	/**
	 * 
	 * @param {NbAppearance} apperance 
	 */
	bindAppearance(apperance) {
		// nothing to do here...
	}

	/**
	 * @param {NbView} view 
	 * @param {NbMesh} model 
	 */
	bindModel(view, model) {
		/* <matrices> */
		// re-compute everything...
		M4.multiply(view.matrix_ProjectionView, model.matrix, this.matrix_ProjectionViewModel);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		/* </bind-uniforms> */

		let mesh = model.mesh;

		/* <bind-attributes> */
		mesh.bindPointVertexAttributes(this.pointAttributeLocation);
		mesh.bindColorVertexAttributes(this.colorAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.bindElements();
		/* </bind-elements> */
	}


	disable() {

		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.pointAttributeLocation);
		gl.disableVertexAttribArray(this.colorAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(null);
	}
}



