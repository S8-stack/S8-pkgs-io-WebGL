

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


program.bindSettings = function(){

	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};


program.bindView = function(view){
};


program.bindEnvironment = function(environment){
};


program.bindStyle = function(style){
	// material
	gl.uniform4fv(this.loc_Uniform_color, style.color);
};


program.bindShape = function(shape){
	shape.vertices.bind(this.loc_Attribute_vertex);
	shape.elements.bind();
};


program.bindMatrixStack = function(stack){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, stack.matrix_ProjectionViewModel.c);
};



program.unbindSettings = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};

