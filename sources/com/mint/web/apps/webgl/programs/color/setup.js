

program.initialize = function(){

	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	
	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_color = gl.getAttribLocation(this.handle, "color");
	
};




program.bind = function(view, environment){
};

program.unbind = function(){
};

program.loadStyle = function(style){
};


program.loadShape = function(shape){
	
	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);
	
	// attributes
	shape.vertex.bind(this.loc_Attribute_vertex);
	shape.color.bind(this.loc_Attribute_color);
};

