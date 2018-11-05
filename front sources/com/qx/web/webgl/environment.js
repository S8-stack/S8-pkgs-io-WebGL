


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
		},
		
		setBackgroundColor : function(){
			gl.clearColor(1.0, 1.0, 1.0, 1.0);
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



function WebGL_Light(ambient, diffuse, specular, direction){
	this.baseAmbient = ambient;
	this.baseDiffuse = diffuse;
	this.baseSpecular = specular;
	this.worldDirection = direction;
	
	this.ambient = new Array(4);
	this.diffuse = new Array(4);
	this.specular = new Array(4);
	this.dim(1.0);
}

WebGL_Light.prototype = {
		
	computeDirection : function(matrix_View){
		this.direction = this.matrix_View.dotVector3(this.worldDirection.c);	
	},
	
	dim : function(factor){
		
		// ambient
		this.ambient[0] = this.baseAmbient[0]*factor;
		this.ambient[1] = this.baseAmbient[1]*factor;
		this.ambient[2] = this.baseAmbient[2]*factor;
		this.ambient[3] = this.baseAmbient[3];
		
		// diffuse
		this.diffuse[0] = this.baseDiffuse[0]*factor;
		this.diffuse[1] = this.baseDiffuse[1]*factor;
		this.diffuse[2] = this.baseDiffuse[2]*factor;
		this.diffuse[3] = this.baseDiffuse[3];
		
		// specular
		this.specular[0] = this.baseSpecular[0]*factor;
		this.specular[1] = this.baseSpecular[1]*factor;
		this.specular[2] = this.baseSpecular[2]*factor;
		this.specular[3] = this.baseSpecular[3];
		
	},
	
	bind : function(handle){
		gl.uniform4fv(handle.loc_Uniform_light_ambient, this.ambient);
		gl.uniform4fv(handle.loc_Uniform_light_diffuse, this.diffuse);
		gl.uniform4fv(handle.loc_Uniform_light_specular, this.specular);
		gl.uniform3fv(handle.loc_Uniform_light_direction, this.direction);	
	}
};



