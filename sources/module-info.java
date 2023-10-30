
module com.s8.pkgs.io.swgl {
	
	
	

	exports com.s8.pkgs.io.swgl.material;
	exports com.s8.pkgs.io.swgl.maths;
	
	exports com.s8.pkgs.io.swgl.render;


	exports com.s8.pkgs.io.swgl.scene;
	
	exports com.s8.pkgs.io.swgl.scene.pipes;
	exports com.s8.pkgs.io.swgl.scene.pipes.color2;
	exports com.s8.pkgs.io.swgl.scene.pipes.mat01;
	exports com.s8.pkgs.io.swgl.scene.pipes.phys2;
	exports com.s8.pkgs.io.swgl.scene.pipes.picking;
	exports com.s8.pkgs.io.swgl.scene.pipes.standard;
	
	exports com.s8.pkgs.io.swgl.scene.environment;
	exports com.s8.pkgs.io.swgl.scene.environment.lights;
	
	exports com.s8.pkgs.io.swgl.scene.models;
	
	exports com.s8.pkgs.io.swgl.scene.view;
	

	exports com.s8.pkgs.io.swgl.utilities;
	
	
	
	requires transitive com.s8.api;
	
}