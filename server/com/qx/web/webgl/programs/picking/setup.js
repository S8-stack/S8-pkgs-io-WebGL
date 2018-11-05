

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



program.bindSettings = function(view, environment){
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
};


program.bindView = function(view){
	// nothing to do
};

program.bindEnvironment = function(environment){
	// nothing to do
};

program.bindStyle = function(style){
	// nothing to do
};

program.bindVertexAttributes = function(model){
	gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBufferHandle);
	gl.vertexAttribPointer(this.loc_Attribute_vertex, 3, gl.FLOAT, false, 0, 0);
};

program.bindMatrixStack = function(stack){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, stack.matrix_ProjectionViewModel.c);
};


program.unbindVertexAttributes = function(model){
};

program.unbindSettings = function(){
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
};
