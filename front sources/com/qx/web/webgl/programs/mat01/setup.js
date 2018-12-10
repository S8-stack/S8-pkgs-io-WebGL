

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;

	this.nbLights = 8;
	
	// lights
	this.lightHandles = new Array(this.nbLights);
	
	for(var i=0; i<this.nbLights; i++){
		var handle = {};
		handle.loc_Uniform_light_ambient = gl.getUniformLocation(this.handle, "lights["+i+"].ambient");
		handle.loc_Uniform_light_diffuse = gl.getUniformLocation(this.handle, "lights["+i+"].diffuse");
		handle.loc_Uniform_light_specular = gl.getUniformLocation(this.handle, "lights["+i+"].specular");
		handle.loc_Uniform_light_direction = gl.getUniformLocation(this.handle, "lights["+i+"].direction");
		this.lightHandles[i] = handle;
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

program.bind = function(view, environment){
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
	
	
	// setup lights
	for(var i=0; i<this.nbLights; i++){
		environment.lights[i].bind(this.lightHandles[i]);
	}
};


program.attachStyle = function(style){
	gl.uniform4fv(this.loc_Uniform_material_ambient, style.ambient);
	gl.uniform4fv(this.loc_Uniform_material_diffuse, style.diffuse);
	gl.uniform4fv(this.loc_Uniform_material_specular, style.specular);
	gl.uniform1f(this.loc_Uniform_material_shininess, style.shininess);	
};


program.attachShape = function(shape){
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


program.detachShape = function(shape){
	//surface.model.vertices.unbind(this.loc_Attribute_vertex);
	//surface.model.normals.unbind(this.loc_Attribute_normal);
};


program.unbind = function(){
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};

