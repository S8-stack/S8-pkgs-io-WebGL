

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


program.bindProgram = function(){

	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};


program.bindStyle = function(style){
	// material
	gl.uniform4fv(this.loc_Uniform_color, style.color);
};


program.bindShape = function(shape){
	shape.wireVertices.bind(this.loc_Attribute_vertex);
	shape.wireElements.bind();
};


program.draw = function(stack, shape){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, stack.matrix_ProjectionViewModel.c);
	shape.wireElements.draw();
};


program.unbindProgram = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};

