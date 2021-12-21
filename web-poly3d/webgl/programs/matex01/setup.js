import { WebGL_Program, WebGL_programs } from "../program";



export class Matex01_WebGL_Program extends WebGL_Program {

	constructor(id) {
		super(id, "matex01");

		// props
		this.isModelViewProjectionMatrixEnabled = true;
		this.isModelViewMatrixEnabled = true;
		this.isNormalAttributeEnabled = true;

		this.isVertexAttributeEnabled = true;
		this.isNormalAttributeEnabled = true;
		this.isTexCoordAttributeEnabled = true;

		// build lights
		this.nbLights = 8;
		this.lights = new Array(this.nbLights);
		for (let i = 0; i < this.nbLights; i++) {
			this.lights[i] = new WebGL_DirectionalLightUniform(`lights[${i}]`);
		}

		// material
		this.material = new WebGL_MaterialUniform(`material`);
	}



	link() {
		super.link();

		for (let i = 0; i < 8; i++) { this.lights[i].link(this.handle); }
		this.material.link(this.handle);
	}

	bindEnvironment = function (environment) {
		super.bindEnvironment();
		// setup lights
		for (var i = 0; i < this.nbLights; i++) {
			environment.lights[i].bind(this.lightHandles[i]);
		}
	}

	setAppearance(appearance) {
		/*
		
	gl.uniform4fv(this.loc_Uniform_material_ambient, appearance.surfaceAmbientColor);
	gl.uniform4fv(this.loc_Uniform_material_diffuse, appearance.surfaceDiffuseColor);
	gl.uniform4fv(this.loc_Uniform_material_specular, appearance.surfaceSpecularColor);
	gl.uniform1f(this.loc_Uniform_material_shininess, appearance.surfaceShininess);
*/
		this.material.bind(appearance.material);
	}
}