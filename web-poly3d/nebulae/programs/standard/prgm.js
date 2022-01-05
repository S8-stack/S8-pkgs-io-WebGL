import { NbProgram } from "../NbProgram";




export class StandardProgram extends NbProgram {
	
	constructor(){
		this.isVertexAttributeEnabled = true;
		this.isNormalAttributeEnabled = true;

		this.isModelViewProjectionMatrixUniformEnabled = true;
		this.isMode
	}
	
	/**
	 * Linking of uniforms and attributes (to be overriden)
	 */
	 link(){

		/* <uniforms> */
		this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
		this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
		/* </uniforms> */

		/* <attributes> */
		this.vertexAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
		this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
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
		/* </enable-attributes> */
	}


	/**
	 * 
	 * @param {NbModel} model 
	 */
	draw(model) {
		/* <matrices> */
		// re-compute everything...
		let matrix_Model = model.matrix;
		M4.multiply(this.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
		/* </matrices> */

		/* <bind-uniforms> */
		gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
		gl.uniformMatrix3fv(this.loc_Uniform_matrix_M, false, this.matrix_Normal);
		/* </bind-uniforms> */

		/* <bind-attributes> */
		model.bindVertexAttributes(this.vertexAttributeLocation);
		model.bindNormalAttributes(this.normalAttributeLocation);
		/* </bind-attributes> */

		/* <bind-elements> */
		mesh.elements.bind();
		/* </bind-elements> */

		model.draw();
	}


	disable() {
		
		/* <disable-attributes> */
		gl.disableVertexAttribArray(this.vertexAttributeLocation);
		gl.disableVertexAttribArray(this.normalAttributeLocation);
		/* </disable-attributes> */

		// unbind shader program
		gl.useProgram(0);
	}
}

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	
	/*
	 * Get uniforms locations
	 */
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
	

	
	/*
	 * Get attributes locations
	 */
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");
};



program.bind = function(view, environment){

	// bind shader program
	gl.useProgram(this.handle);
	
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
}


program.setView = function(view){
	var eye = view.eyePosition;
	gl.uniform3fv(this.loc_Uniform_eyePosition, [eye.x, eye.y, eye.z]);
}

program.setEnvironment = function(environment){
	environment.radiance.bind(this.loc_Uniform_radiance, 0);
	environment.irradiance.bind(this.loc_Uniform_irradiance, 1);
}


program.setAppearance = function(appearance){
	// material
	gl.uniform1f(this.loc_Uniform_material_glossiness, appearance.surfaceGlossiness);
	gl.uniform1f(this.loc_Uniform_material_roughness, appearance.surfaceRoughness);
	gl.uniform4fv(this.loc_Uniform_material_specularColor, appearance.surfaceSpecularColor);
	gl.uniform4fv(this.loc_Uniform_material_diffuseColor, appearance.surfaceDiffuseColor);
}


/**
 * Shape uniforms and attributes loading
 */
program.setShape = function(shape){
	shape.surfaceVertices.bind(this.loc_Attribute_vertex);
	shape.surfaceNormals.bind(this.loc_Attribute_normal);
	shape.surfaceElements.bind();
};


/**
 * 
 */
program.draw = function(view, shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, view.matrix_Model.c);
	
	shape.surfaceElements.draw();
};



program.unbind = function(){
	
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};


