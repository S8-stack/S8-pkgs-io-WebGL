


/** Scene */
function WebGL_Environment(scene){
	
	
	this.scene = scene;

	// initialize environment

	this.light0 = {};

	this.light0.ambient = rgb(1.0, 1.0, 1.0);
	this.light0.diffuse = rgb(1.0, 1.0, 1.0);
	this.light0.specular = rgb(1.0, 1.0, 1.0);

	this.light0.absolute_direction = new Vector3();
	this.light0.absolute_direction.c = [1.0, 1.0, 1.0];
	this.light0.absolute_direction.normalize();

	// light 1
	this.light1 = {};

	this.light1.ambient = rgb(0.0, 0.0, 0.0);
	this.light1.diffuse = rgb(0.8, 0.8, 0.8);
	this.light1.specular = rgb(1.0, 1.0, 1.0);

	this.light1.absolute_direction = new Vector3();
	this.light1.absolute_direction.c = [0.5, -1.0, 0.8];
	this.light1.absolute_direction.normalize();

	// environment
	this.environmentTexture = new WebGL_TextureCubeMap("lib/webgl/graphics/skycube/mountain/mountain", ".jpg");

	// keep pointer to the view matrix
	this.matrix_View = scene.view.matrix_View;
}


WebGL_Environment.prototype = {

		/**
		 * Normalize vector 
		 */
		update : function(){
			this.light0.direction = this.matrix_View.dotVector3(this.light0.absolute_direction.c);
			this.light1.direction = this.matrix_View.dotVector3(this.light1.absolute_direction.c);
		}
};

