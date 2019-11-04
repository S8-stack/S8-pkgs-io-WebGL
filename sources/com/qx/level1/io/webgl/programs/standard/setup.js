

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	
	/*
	 * Get uniforms locations
	 */
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
	

	this.loc_Uniform_eyePosition = gl.getUniformLocation(this.handle, "eyePosition");
	
	
	this.loc_Uniform_radiance = gl.getUniformLocation(this.handle, "radiance");
	this.loc_Uniform_irradiance = gl.getUniformLocation(this.handle, "irradiance");
	
	// material
	this.loc_Uniform_material_glossiness = gl.getUniformLocation(this.handle, "matGlossiness");
	this.loc_Uniform_material_roughness = gl.getUniformLocation(this.handle, "matRoughness");
	this.loc_Uniform_material_specularColor = gl.getUniformLocation(this.handle, "matSpecularColor");
	this.loc_Uniform_material_diffuseColor = gl.getUniformLocation(this.handle, "matDiffuseColor");
	
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


