

program.initialize = function(){

	// pass index for rendering sort (default is 1)
	this.pass = 1;

	this.loc_Uniform_glowColor = gl.getUniformLocation(this.handle, "color");

	// matrices
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");

	//attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");

};

program.bind = function(view, environment){

	// bind shader program
	gl.useProgram(this.handle);

	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	
};


program.setView = function(view){
	// nothing to set from view
}


program.setEnvironment = function(environment){
	// nothing to set-yp from enviornment
}

program.setShape = function(shape){
	gl.uniform4fv(this.loc_Uniform_glowColor, shape.surfaceAmbientColor);
	shape.surfaceVertices.bind(this.loc_Attribute_vertex);
	shape.surfaceElements.bind();
};

program.draw = function(view, shape){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	shape.surfaceElements.draw();
};


program.unbind = function(){
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};
