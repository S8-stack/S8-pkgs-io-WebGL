

program.initialize = function(){

	// pass index for rendering sort (default is 1)
	this.pass = 1;

	this.loc_Uniform_glowColor = gl.getUniformLocation(this.handle, "glowColor");
	this.loc_Uniform_outlineColor = gl.getUniformLocation(this.handle, "outlineColor");

	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
	this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");	

	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");

//	setup
	this.glowColor = [1.0, 1.0, 0.2, 0.0];
	this.outlineColor = [0.2, 0.2, 0.4, 0.0];
};

program.bind = function(view, environment){

	// bind shader program
	gl.useProgram(this.handle);

	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
	
	// setup style
	gl.uniform4fv(this.loc_Uniform_glowColor, this.glowColor);
	gl.uniform4fv(this.loc_Uniform_outlineColor, this.outlineColor);
};


program.setView = function(view){
	// nothing to set from view
}


program.setEnvironment = function(environment){
	// nothing to set-yp from enviornment
}


program.setShape = function(shape){
	shape.surfaceVertices.bind(this.loc_Attribute_vertex);
	shape.surfaceNormals.bind(this.loc_Attribute_normal);
	shape.surfaceElements.bind();
};

program.draw = function(view, shape){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, view.matrix_ViewModel.c);
	gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, view.matrix_Normal.c);
	shape.surfaceElements.draw();
};



program.unbind = function(){
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};
