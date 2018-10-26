

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;

	this.nbLights = 8;
	
	// lights
	this.loc_Uniform_lights_ambient = new Array(this.nbLights);
	this.loc_Uniform_lights_diffuse = new Array(this.nbLights);
	this.loc_Uniform_lights_specular = new Array(this.nbLights);
	this.loc_Uniform_lights_direction = new Array(this.nbLights);
	
	for(var i=0; i<this.nbLights; i++){
		this.loc_Uniform_lights_ambient[i] = gl.getUniformLocation(this.handle, "lights["+i+"].ambient");
		this.loc_Uniform_lights_diffuse[i] = gl.getUniformLocation(this.handle, "lights["+i+"].diffuse");
		this.loc_Uniform_lights_specular[i] = gl.getUniformLocation(this.handle, "lights["+i+"].specular");
		this.loc_Uniform_lights_direction[i] = gl.getUniformLocation(this.handle, "lights["+i+"].direction");
	}
	
	
	// material
	this.loc_Uniform_material_ambient = gl.getUniformLocation(this.handle, "material.ambient");	
	this.loc_Uniform_material_diffuse = gl.getUniformLocation(this.handle, "material.diffuse");
	this.loc_Uniform_material_specular = gl.getUniformLocation(this.handle, "material.specular");
	this.loc_Uniform_material_shininess = gl.getUniformLocation(this.handle, "material.shininess");
	
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
	
	var light;
	for(var i=0; i<this.nbLights; i++){
		light = environment.lights[i];
		gl.uniform4fv(this.loc_Uniform_lights_ambient[i], light.ambient);
		gl.uniform4fv(this.loc_Uniform_lights_diffuse[i], light.diffuse);
		gl.uniform4fv(this.loc_Uniform_lights_specular[i], light.specular);
		gl.uniform3fv(this.loc_Uniform_lights_direction[i], light.direction);	
	}
};


program.bindStyle = function(style){
	gl.uniform4fv(this.loc_Uniform_material_ambient, style.ambient);
	gl.uniform4fv(this.loc_Uniform_material_diffuse, style.diffuse);
	gl.uniform4fv(this.loc_Uniform_material_specular, style.specular);
	gl.uniform1f(this.loc_Uniform_material_shininess, style.shininess);
	
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

