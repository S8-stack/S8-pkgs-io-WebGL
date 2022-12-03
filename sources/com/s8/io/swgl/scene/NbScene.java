package com.s8.ng.geo.nebulae.scene;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.appearances.NbRenderer;
import com.s8.io.swgl.environment.NbEnvironment;

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
		super(branch, "/s8-ng-geo/nebulae/scene/NbScene");
	}
	
	
	public void setEnvironment(NbEnvironment environment) {
		vertex.setObj("environment", environment);
	}
	
	
	
	public void setRenderers(List<NbRenderer<?>> renderers) {
		vertex.setObjList("renderers", renderers);
	}
	
	

	
	/**
	 * 
	 * @param name
	 * @param appearance
	 */
	public void define(String name, NbRenderer<?> prgm) {
		
		// appearance
		vertex.addObjToList("programs", prgm);
	}
	
}
