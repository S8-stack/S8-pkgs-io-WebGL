package com.s8.io.swgl.scene;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Renderer;
import com.s8.io.swgl.environment.SWGL_Environment;

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
	
	
	
	public void setRenderers(List<SWGL_Renderer<?>> renderers) {
		vertex.setObjList("renderers", renderers);
	}
	
	

	
	/**
	 * 
	 * @param name
	 * @param appearance
	 */
	public void define(String name, SWGL_Renderer<?> prgm) {
		
		// appearance
		vertex.addObjToList("programs", prgm);
	}
	
}
