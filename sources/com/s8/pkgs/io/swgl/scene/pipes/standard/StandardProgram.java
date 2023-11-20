package com.s8.pkgs.io.swgl.scene.pipes.standard;

import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.io.swgl.SWGL_Root;
import com.s8.pkgs.io.swgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class StandardProgram extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StandardProgram(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/standard/StandardProgram");
	}
	
	
}
