import { WebGL_DirectionalLightUniform, WebGL_MaterialUniform, WebGL_Program } from "../program";


export class Mat01WebGLProgram extends WebGL_Program {

	constructor(id){
		super(id, "mat01");

		// attributes
		this.isVertexAttributeEnabled = true;
		this.isNormalAttributeEnabled = true;

		// matrices
		this.isModelViewProjectionMatrixEnabled = true;
		this.isModelViewMatrixEnabled = true;
		this.isNormalAttributeEnabled = true;

		// build lights
		this.nbLights = 8;
		this.lights = new Array(this.nbLights);
		for(let i=0; i<this.nbLights; i++){
			this.lights[i] = new WebGL_DirectionalLightUniform(`lights[${i}]`);
		}

		// material
		this.material = new WebGL_MaterialUniform(`material`);
	}



	link(){ 
		super.link();
		
		for(let i=0; i<8; i++){ this.lights[i].link(this.handle); }
		this.material.link(this.handle);
	}

	
	bindEnvironment(environment){
		// setup lights
		for(var i=0; i<this.nbLights; i++){
			this.lights[i].set(environment.lights[i]);
		}
	}

	bindStyle(style){
		this.material.set(style);
	};

}
