import { WebGL_Program } from "../program";


export class Color_WebGL_Program extends WebGL_Program {


	constructor(id){
		super(id, "color");
		this.isModelViewProjectionMatrixEnabled = true;
		this.isVertexAttributeEnabled = true;
		this.isColorAttributeEnabled = true;
	}
	
}



