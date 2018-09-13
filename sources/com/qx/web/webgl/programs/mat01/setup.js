

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;

	// light 0
	this.loc_Uniform_light0_ambient = gl.getUniformLocation(this.handle, "lights[0].ambient");	
	this.loc_Uniform_light0_diffuse = gl.getUniformLocation(this.handle, "lights[0].diffuse");
	this.loc_Uniform_light0_specular = gl.getUniformLocation(this.handle, "lights[0].specular");
	this.loc_Uniform_light0_direction = gl.getUniformLocation(this.handle, "lights[0].direction");

	// light 1
	this.loc_Uniform_light1_ambient = gl.getUniformLocation(this.handle, "lights[1].ambient");	
	this.loc_Uniform_light1_diffuse = gl.getUniformLocation(this.handle, "lights[1].diffuse");
	this.loc_Uniform_light1_specular = gl.getUniformLocation(this.handle, "lights[1].specular");
	this.loc_Uniform_light1_direction = gl.getUniformLocation(this.handle, "lights[1].direction");
	
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




program.bind = function(view, environment){
	
	// light 0
	gl.uniform4fv(this.loc_Uniform_light0_ambient, environment.light0.ambient);
	gl.uniform4fv(this.loc_Uniform_light0_diffuse, environment.light0.diffuse);
	gl.uniform4fv(this.loc_Uniform_light0_specular, environment.light0.specular);
	gl.uniform3fv(this.loc_Uniform_light0_direction, environment.light0.direction);
	
	// light 1
	gl.uniform4fv(this.loc_Uniform_light1_ambient, environment.light1.ambient);
	gl.uniform4fv(this.loc_Uniform_light1_diffuse, environment.light1.diffuse);
	gl.uniform4fv(this.loc_Uniform_light1_specular, environment.light1.specular);
	gl.uniform3fv(this.loc_Uniform_light1_direction, environment.light1.direction);
	
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
};

program.unbind = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};

program.loadStyle = function(style){
	
	// material
	gl.uniform4fv(this.loc_Uniform_material_ambient, style.ambient);
	gl.uniform4fv(this.loc_Uniform_material_diffuse, style.diffuse);
	gl.uniform4fv(this.loc_Uniform_material_specular, style.specular);
	gl.uniform1f(this.loc_Uniform_material_shininess, style.shininess);
	
};


program.render = function(surface){
	
	
	/*
	 * bind shape
	 */
	
	// bind instance matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, surface.instance.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, surface.instance.matrix_ViewModel.c);
	gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, surface.instance.matrix_Normal.c);
	
	// bind model vertex attributes
	surface.model.vertices.bind(this.loc_Attribute_vertex, surface.model.verticesOffset);
	surface.model.normals.bind(this.loc_Attribute_normal, surface.model.verticesOffset);
	
	// bind model elements
	surface.model.elements.render();
	
	/*
	 * unbind shape
	 */
	
	/* unbind attributes */
	surface.model.vertices.unbind(this.loc_Attribute_vertex);
	surface.model.normals.unbind(this.loc_Attribute_normal);
	
};


