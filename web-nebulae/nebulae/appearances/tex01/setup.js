
program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;
	

	/*
	 * Get uniforms locations
	 */
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	
	// texture
	this.loc_Uniform_texture = gl.getUniformLocation(this.handle, "texture");
	 
	/*
	 * Get attributes locations
	 */
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_texCoord = gl.getAttribLocation(this.handle, "texCoord");	
};





program.bind = function(view, environment){
	
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_texCoord);

};

program.unbind = function(){
	
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_texCoord);
};


/**
 * Style uniforms loading
 */
program.loadStyle = function(style){
	
	style.texture0.bind(this.loc_Uniform_texture, 0);
};


/**
 * Shape uniforms and attributes loading
 */
program.bindShape = function(shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);
	
	
	/*
	 * Set-up attributes
	 */
	shape.vertex.bind(this.loc_Attribute_vertex);
	shape.texCoord.bind(this.loc_Attribute_texCoord);
};

program.unbindShape = function(shape){	
	
	/* unbind attributes */
	shape.vertex.unbind(this.loc_Attribute_vertex);
	shape.texCoord.unbind(this.loc_Attribute_texCoord);
};



