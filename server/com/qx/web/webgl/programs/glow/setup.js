

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

};

program.bindSettings = function(){
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
};


program.bindView = function(view){
	// nothing to do
};

program.bindEnvironment = function(environment){

};


program.bindStyle = function(style){
	gl.uniform4fv(this.loc_Uniform_glowColor, style.glowColor);
	gl.uniform4fv(this.loc_Uniform_outlineColor, style.outlineColor);

};


program.bindVertexAttributes = function(model){
	model.vertices.bind(this.loc_Attribute_vertex);
	model.normals.bind(this.loc_Attribute_normal);
};


program.bindMatrixStack = function(stack){
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, stack.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, stack.matrix_ViewModel.c);
	gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, stack.matrix_Normal.c);
};


program.unbindVertexAttributes = function(model){
	surface.model.vertices.unbind(this.loc_Attribute_vertex);
	surface.model.normals.unbind(this.loc_Attribute_normal);
};


program.unbindSettings = function(){
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};

