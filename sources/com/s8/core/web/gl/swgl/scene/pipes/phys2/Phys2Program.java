package com.s8.core.web.gl.swgl.scene.pipes.phys2;

import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.swgl.scene.pipes.SWGL_Program;


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
		super(branch, SWGL_Root.WEB+"scene/pipes/phys2/Phys2Program");
	}
	
	
}
