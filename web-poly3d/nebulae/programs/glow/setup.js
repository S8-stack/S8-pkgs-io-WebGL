import { WebGL_Program } from "../program";


export class Glow_WebGL_Program extends WebGL_Program {

	constructor(id){
		super(id, "glow");
		this.isModelViewProjectionMatrixEnabled = true;
		this.isVertexAttributeEnabled = true;
	}

	link(){
		super.link();
		this.loc_Uniform_glowColor = gl.getUniformLocation(this.handle, "color");
	}

	setShape = function(shape){
		gl.uniform4fv(this.loc_Uniform_glowColor, shape.surfaceAmbientColor);
		shape.surfaceVertices.bind(this.loc_Attribute_vertex);
		shape.surfaceElements.bind();
	}

}