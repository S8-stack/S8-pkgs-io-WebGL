


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
	var worldDirection;
	for(var i=0; i<5; i++){
		worldDirection = new WebGL_Vector3();
		worldDirection.spherical_radial(1.0, i*dPhi, Math.PI*0.25);	
		this.lights[i] = new WebGL_Light(ambient, diffuse, specular, worldDirection);
	}
	
	dPhi = Math.PI*1.8/3; 
	ambient = rgb(0.0, 0.0, 0.0);
	diffuse = rgb(0.4, 0.4, 0.4);
	specular = rgb(1.0, 1.0, 1.0);
	for(var i=0; i<3; i++){
		worldDirection = new WebGL_Vector3();
		worldDirection.spherical_radial(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65);	
		this.lights[5+i] = new WebGL_Light(ambient, diffuse, specular, worldDirection);
	}
	

	
	// environment
	this.radiance = new WebGL_TextureCubeMap("/webgl/graphics/skycube/std2/radiance/face", ".png", 6);
	this.irradiance = new WebGL_TextureCubeMap("/webgl/graphics/skycube/std2/irradiance/face", ".png", 1);

	// keep pointer to the view matrix
	this.matrix_View = this.scene.view.matrix_View;
}


WebGL_Environment.prototype = {

		/**
		 * Normalize vector 
		 */
		update : function(){
			for(let light of this.lights){
				light.direction = this.matrix_View.dotVector3(light.worldDirection.c);	
			}
		},
		
		
		dim : function(factor){
			
			// dim background
			gl.clearColor(factor, factor, factor, 1.0);
			
			// dim lights
			for(let light of this.lights){
				light.dim(factor);	
			}
		}
};






