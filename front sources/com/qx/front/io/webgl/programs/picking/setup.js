

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

	// bind shader program
	gl.useProgram(this.handle);
	
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};


program.attachShape = function(shape){
	shape.surfaceVertices.bind(this.loc_Attribute_vertex);
	shape.surfaceElements.bind();
};

program.draw = function(view, shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	shape.surfaceElements.draw();
};



program.detachShape = function(model){
	shape.surfaceVertices.unbind(this.loc_Attribute_vertex);
};


program.unbind = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};
