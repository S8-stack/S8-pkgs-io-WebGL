import { WebGL_Program } from "../program";


export class Color2_WebGL_Program extends WebGL_Program {


	constructor(id) {
		super(id, "color2");
		this.isModelViewProjectionMatrixEnabled = true;
		this.isVertexAttributeEnabled = true;
		this.isNormalAttributeEnabled = true;
	}

	link() {

		// override
		super.link();

		// material
		this.loc_Uniform_color = gl.getUniformLocation(this.handle, "color");
	}

	setAppearance(appearance) {
		// material
		gl.uniform4fv(this.loc_Uniform_color, appearance.wireColor);
	}

}
