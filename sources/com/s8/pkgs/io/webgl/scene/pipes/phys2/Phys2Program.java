package com.s8.pkgs.io.webgl.scene.pipes.phys2;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Program extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Program(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/phys2/Phys2Program");
	}
	
	
}
