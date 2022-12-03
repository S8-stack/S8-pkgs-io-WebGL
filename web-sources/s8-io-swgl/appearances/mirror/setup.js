import { WebGL_Program } from "../program";


export class Mirror_WebGL_Program extends WebGL_Program {


	constructor(id){
		super(id, "mirror");
		this.isModelViewProjectionMatrixEnabled;
	}

	link(){
		super.link();
	
	}
		


}

program.initialize = function(){
	
	// pass index for rendering sort (default is 1)
	this.pass = 1;
	
	
	/*
	 * Get uniforms locations
	 */
	this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
	this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
	

	this.loc_Uniform_eyePosition = gl.getUniformLocation(this.handle, "eyePosition");
	
	
	this.loc_Uniform_texture = gl.getUniformLocation(this.handle, "texture");
	
	/*
	 * Get attributes locations
	 */
	this.loc_Attribute_vertex = gl.getAttribLocation(this.handle, "vertex");
	this.loc_Attribute_normal = gl.getAttribLocation(this.handle, "normal");
};



program.bind = function(view, environment){
	// bind shader program
	gl.useProgram(this.handle);
	
	// enable location
	gl.enableVertexAttribArray(this.loc_Attribute_vertex);
	gl.enableVertexAttribArray(this.loc_Attribute_normal);
}

program.setView = function(view){
	var eye = view.eyePosition;
	gl.uniform3fv(this.loc_Uniform_eyePosition, [eye.x, eye.y, eye.z]);
}

program.setEnvironment = function(environment){
	environment.environmentTexture.bind(this.loc_Uniform_texture, 0);
}

/**
 * Shape uniforms and attributes loading
 */
program.setShape = function(shape){

	// matrices
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, shape.matrix_ProjectionViewModel.c);
	gl.uniformMatrix4fv(this.loc_Uniform_matrix_M, false, shape.matrix_Model.c);
	
	/*
	 * Set-up attributes
	 */
	shape.vertex.bind(this.loc_Attribute_vertex);
	shape.normal.bind(this.loc_Attribute_normal);
};


program.unbind = function(){
	// disable location
	gl.disableVertexAttribArray(this.loc_Attribute_vertex);
	gl.disableVertexAttribArray(this.loc_Attribute_normal);
};


