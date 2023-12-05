package com.s8.pkgs.io.webgl.scene.pipes.mat01;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class Mat01Program extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Mat01Program(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/mat01/Mat01Program");
	}
	
	
}
