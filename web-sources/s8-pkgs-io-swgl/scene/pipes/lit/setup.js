import { WebGL_Program } from "../program";

export class Lit_WebGL_Program extends WebGL_Program {

	constructor(id){
		super(id, "lit");
		this.isModelViewProjectionMatrixEnabled = true;
		this.isModelViewMatrixEnabled = true;
		this.isNormalAttributeEnabled = true;
	}

	link(){
		super.link();
	
		this.loc_Uniform_glowColor = gl.getUniformLocation(this.handle, "glowColor");
		this.loc_Uniform_outlineColor = gl.getUniformLocation(this.handle, "outlineColor");
	
		//	setup
		this.glowColor = [1.0, 1.0, 0.2, 0.0];
		this.outlineColor = [0.2, 0.2, 0.4, 0.0];
	}


	bind(){
		super.bind();

		// setup style
		gl.uniform4fv(this.loc_Uniform_glowColor, this.glowColor);
		gl.uniform4fv(this.loc_Uniform_outlineColor, this.outlineColor);
	}
}