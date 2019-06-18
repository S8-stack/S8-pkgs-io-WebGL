
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

	// texture
	this.loc_Uniform_texture = gl.getUniformLocation(this.handle, "texture");

	// Get uniforms locations
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
	this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
	
	// Get attributes locations
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");
	this.loc_Attribute_texCoord = gl.getAttribLocation(this.handle, "texCoord");	
};



program.bind = function(){

	// bind shader program
	gl.useProgram(this.handle);

	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
	gl.enableVertexAttribArray(this.loc_Attribute_texCoord);
};


program.setView = function(view){
	// nothing to set from view
}


program.setEnvironment = function(environment){
	// setup lights
	for(var i=0; i<this.nbLights; i++){
		environment.lights[i].bind(this.lightHandles[i]);
	}
}


program.setAppearance(appearance){
	
	// material
	gl.uniform4fv(this.loc_Uniform_material_ambient, appearance.surfaceAmbientColor);
	gl.uniform4fv(this.loc_Uniform_material_diffuse, appearance.surfaceDiffuseColor);
	gl.uniform4fv(this.loc_Uniform_material_specular, appearance.surfaceSpecularColor);
	gl.uniform1f(this.loc_Uniform_material_shininess, appearance.surfaceShininess);

	// texture
	appearance.surfaceTexture0.bind(this.loc_Uniform_texture, 0);
}

/**
 * Shape uniforms and attributes loading
 */
program.setShape = function(shape){
	
	// bind attribute buffers
	shape.surfaceVertices.bind(this.loc_Attribute_vertex);
	shape.surfaceNormals.bind(this.loc_Attribute_normal);
	shape.surfaceTexCoords.bind(this.loc_Attribute_texCoord);
	
	// bind element buffer
	shape.surfaceElements.bind();
};



/**
 * 
 */
program.draw = function(view, shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, view.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, view.matrix_ViewModel.c);
	gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, view.matrix_Normal.c);
	
	// draw elements
	shape.surfaceElements.draw();
};



program.unbind = function(){

	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
	gl.disableVertexAttribArray(this.loc_Attribute_texCoord);
};
