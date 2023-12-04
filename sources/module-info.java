

/**
 * 
 */
module com.s8.core.web.gl {
	

	exports com.s8.core.web.gl.material;
	exports com.s8.core.web.gl.maths;
	
	exports com.s8.core.web.gl.render;


	exports com.s8.core.web.gl.scene;
	
	exports com.s8.core.web.gl.scene.pipes;
	exports com.s8.core.web.gl.scene.pipes.color2;
	exports com.s8.core.web.gl.scene.pipes.mat01;
	exports com.s8.core.web.gl.scene.pipes.phys2;
	exports com.s8.core.web.gl.scene.pipes.picking;
	exports com.s8.core.web.gl.scene.pipes.standard;
	
	exports com.s8.core.web.gl.scene.environment;
	exports com.s8.core.web.gl.scene.environment.lights;
	
	exports com.s8.core.web.gl.scene.models;
	
	exports com.s8.core.web.gl.scene.view;
	

	exports com.s8.core.web.gl.utilities;
	
	
	
	requires transitive com.s8.api;
	
}