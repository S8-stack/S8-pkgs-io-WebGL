package com.s8.io.swgl.scene;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Pipe;
import com.s8.io.swgl.environment.SWGL_Environment;
import com.s8.io.swgl.view.SWGL_View;

/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Scene extends NeObject {

	
	/**
	 * 
	 * @param branch
	 */
	public SWGL_Scene(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"scene/SWGL_Scene");
	}
	
	
	public void setEnvironment(SWGL_Environment environment) {
		vertex.setObj("environment", environment);
	}
	
	public SWGL_Environment getEnvironment() {
		return vertex.getObj("environment");
	}
	
	
	
	public void setPipes(List<SWGL_Pipe<?>> pipes) {
		vertex.setObjList("pipes", pipes);
	}
	
	

	
	/**
	 * 
	 * @param name
	 * @param appearance
	 */
	public void define(String name, SWGL_Pipe<?> prgm) {
		
		// appearance
		vertex.addObjToList("programs", prgm);
	}


	public void setView(SWGL_View view) {
		vertex.setObj("view", view);
	}
	
}
