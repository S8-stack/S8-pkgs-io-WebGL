

/**
 * 
 */
module com.s8.pkgs.io.webgl {
	

	exports com.s8.pkgs.io.webgl.material;
	exports com.s8.pkgs.io.webgl.maths;
	
	exports com.s8.pkgs.io.webgl.render;


	exports com.s8.pkgs.io.webgl.scene;
	
	exports com.s8.pkgs.io.webgl.scene.pipes;
	
	exports com.s8.pkgs.io.webgl.scene.pipes.color2;
	exports com.s8.pkgs.io.webgl.scene.pipes.mat01;
	exports com.s8.pkgs.io.webgl.scene.pipes.phys2;
	exports com.s8.pkgs.io.webgl.scene.pipes.standard;
	
	exports com.s8.pkgs.io.webgl.scene.pipes.picking;
	
	
	
	exports com.s8.pkgs.io.webgl.scene.environment;
	exports com.s8.pkgs.io.webgl.scene.environment.lights;
	
	exports com.s8.pkgs.io.webgl.scene.models;
	
	exports com.s8.pkgs.io.webgl.scene.view;
	

	exports com.s8.pkgs.io.webgl.utilities;
	
	
	
	requires transitive com.s8.api;
	requires transitive com.s8.core.io.csv;
	
	
	
	
}