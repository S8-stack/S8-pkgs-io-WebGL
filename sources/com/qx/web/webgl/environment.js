


/** Scene */
function WebGL_Environment(scene){
	
	
	this.scene = scene;
	
	var light;

	// initialize environment

	this.lights = new Array(8);

	var dPhi = Math.PI*1.8/5;
	var ambient = rgb(0.2, 0.2, 0.2);
	var diffuse = rgb(0.3, 0.3, 0.3);
	var specular = rgb(1.0, 1.0, 1.0);
	for(var i=0; i<5; i++){
		light = {};
		light.ambient = ambient;
		light.diffuse = diffuse;
		light.specular =specular;
		light.worldDirection = new WebGL_Vector3();
		light.worldDirection.spherical_radial(1.0, i*dPhi, Math.PI*0.25);	
		this.lights[i] = light;
	}
	
	dPhi = Math.PI*1.8/3; 
	for(var i=0; i<3; i++){
		light = {};
		light.ambient = rgb(0.0, 0.0, 0.0);
		light.diffuse = rgb(0.4, 0.4, 0.4);
		light.specular = rgb(1.0, 1.0, 1.0);
		light.worldDirection = new WebGL_Vector3();
		light.worldDirection.spherical_radial(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65);	
		this.lights[5+i] = light;
	}
	

	
	// environment
	this.environmentTexture = new WebGL_TextureCubeMap("/webgl/graphics/skycube/mountain/mountain", ".jpg");

	// keep pointer to the view matrix
	this.matrix_View = scene.view.matrix_View;
}


WebGL_Environment.prototype = {

		/**
		 * Normalize vector 
		 */
		update : function(){
			for(let light of this.lights){
				light.direction = this.matrix_View.dotVector3(light.worldDirection.c);	
			}
		}
};



