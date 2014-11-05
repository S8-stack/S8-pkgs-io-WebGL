

//new

program.initialize = function(){

	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");

	//	picking color
	this.loc_Uniform_pickingColor = gl.getUniformLocation(this.handle, "pickingColor");

};


program.loadView = function(view){
}

program.loadEnvironment = function(environment){
};

program.loadStyle = function(style){
};


program.loadShape = function(shape){


	gl.uniform3fv(this.loc_Uniform_pickingColor, shape.pickingColor);

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);

	// attributes
	shape.vertex.bind(this.loc_Attribute_vertex);
};



