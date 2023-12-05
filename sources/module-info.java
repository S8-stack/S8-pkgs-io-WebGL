

/**
 * 
 */
module com.s8.core.web.gl {
	

	exports com.s8.core.web.gl.swgl.material;
	exports com.s8.core.web.gl.swgl.maths;
	
	exports com.s8.core.web.gl.swgl.render;


	exports com.s8.core.web.gl.swgl.scene;
	
	exports com.s8.core.web.gl.swgl.scene.pipes;
	exports com.s8.core.web.gl.swgl.scene.pipes.color2;
	exports com.s8.core.web.gl.swgl.scene.pipes.mat01;
	exports com.s8.core.web.gl.swgl.scene.pipes.phys2;
	exports com.s8.core.web.gl.swgl.scene.pipes.picking;
	exports com.s8.core.web.gl.swgl.scene.pipes.standard;
	
	exports com.s8.core.web.gl.swgl.scene.environment;
	exports com.s8.core.web.gl.swgl.scene.environment.lights;
	
	exports com.s8.core.web.gl.swgl.scene.models;
	
	exports com.s8.core.web.gl.swgl.scene.view;
	

	exports com.s8.core.web.gl.swgl.utilities;
	
	
	
	requires transitive com.s8.api;
	
}