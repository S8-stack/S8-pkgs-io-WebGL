

program.initialize = function(){

	
	/*
	 * Get uniforms locations
	 */
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
	

	this.loc_Uniform_eyePosition = gl.getUniformLocation(this.handle, "eyePosition");
	
	
	this.loc_Uniform_texture = gl.getUniformLocation(this.handle, "texture");
	
	/*
	 * Get attributes locations
	 */
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");
};


program.loadView = function(view){
	gl.uniform3fv(this.loc_Uniform_eyePosition, view.eyePosition.c);
}



/**
 * Scene uniforms loading
 */
program.loadEnvironment = function(environment){
	environment.environmentTexture.bind(this.loc_Uniform_texture, 0);
};


program.loadStyle = function(style){
};

/**
 * Shape uniforms and attributes loading
 */
program.loadShape = function(shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, shape.matrix_Model.c);
	
	/*
	 * Set-up attributes
	 */
	shape.vertex.bind(this.loc_Attribute_vertex);
	shape.normal.bind(this.loc_Attribute_normal);
};

