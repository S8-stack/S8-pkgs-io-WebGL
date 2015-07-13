

//new

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");

	//	picking color
	this.loc_Uniform_pickingColor = gl.getUniformLocation(this.handle, "pickingColor");

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
};


program.bindShape = function(shape){


	gl.uniform3fv(this.loc_Uniform_pickingColor, shape.pickingColor);

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);

	// attributes
	shape.vertex.bind(this.loc_Attribute_vertex);
};

program.unbindShape = function(shape){	
	
	/* unbind attributes */
	shape.vertex.unbind(this.loc_Attribute_vertex);
};

