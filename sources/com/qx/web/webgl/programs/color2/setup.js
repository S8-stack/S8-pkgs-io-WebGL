

program.initialize = function(){

	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	
	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	
	// material
	this.loc_Uniform_color = gl.getUniformLocation(this.handle, "color");	
	
};




program.bind = function(view, environment){
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};

program.unbind = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};

program.loadStyle = function(style){

	// material
	gl.uniform4fv(this.loc_Uniform_color, style.color);
};



program.render = function(shape){
	
	
	/*
	 * bind shape
	 */
	
	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.instance.matrix_ProjectionViewModel.c);
	
	// attributes
	shape.model.vertices.bind(this.loc_Attribute_vertex);
	
	// bind model elements
	shape.model.elements.render();
	
	/* unbind attributes */
	shape.model.vertices.unbind(this.loc_Attribute_vertex);
	
};

