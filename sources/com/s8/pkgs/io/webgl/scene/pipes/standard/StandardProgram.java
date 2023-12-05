package com.s8.pkgs.io.webgl.scene.pipes.standard;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebGL_Root;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Program;


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
		super(branch, WebGL_Root.WEB+"scene/pipes/standard/StandardProgram");
	}
	
	
}
