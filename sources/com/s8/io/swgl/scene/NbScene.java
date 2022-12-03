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
public class NbScene extends NeObject {

	
	/**
	 * 
	 * @param branch
	 */
	public NbScene(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"scene/NbScene");
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
