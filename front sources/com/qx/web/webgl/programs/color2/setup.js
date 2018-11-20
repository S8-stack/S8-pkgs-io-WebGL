

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

	// bind shader program
	gl.useProgram(this.handle);
	
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};


program.attachStyle = function(style){
	// material
	gl.uniform4fv(this.loc_Uniform_color, style.color);
};


program.attachShape = function(shape){
	shape.wireVertices.bind(this.loc_Attribute_vertex);
	shape.wireElements.bind();
};


program.draw = function(view, shape){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	shape.wireElements.draw();
};


program.detachShape = function(shape){
	shape.wireVertices.bind(this.loc_Attribute_vertex);
	shape.wireElements.bind();
};

program.unbind = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);

	// bind shader program
	//gl.useProgram(0);
};

