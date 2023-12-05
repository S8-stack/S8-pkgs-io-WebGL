package com.s8.pkgs.io.webgl.scene;

import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.environment.SWGL_Environment;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Pipe;
import com.s8.pkgs.io.webgl.scene.view.SWGL_View;

/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Scene extends S8WebFrontObject {

	
	/**
	 * 
	 * @param branch
	 */
	public SWGL_Scene(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/SWGL_Scene");
	}
	
	
	public void setEnvironment(SWGL_Environment environment) {
		vertex.fields().setObjectField("environment", environment);
	}
	
	public SWGL_Environment getEnvironment() {
		return vertex.fields().getObjectField("environment");
	}
	
	
	
	public void setPipes(List<SWGL_Pipe<?>> pipes) {
		vertex.fields().setObjectListField("pipes", pipes);
	}
	
	

	
	/**
	 * 
	 * @param name
	 * @param appearance
	 */
	public void define(String name, SWGL_Pipe<?> prgm) {
		
		// appearance
		vertex.fields().addObjToList("programs", prgm);
	}


	public void setView(SWGL_View view) {
		vertex.fields().setObjectField("view", view);
	}
	
}
