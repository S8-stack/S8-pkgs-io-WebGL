package com.s8.core.web.gl.scene.pipes.mat01;

import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.scene.pipes.SWGL_Program;


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
		super(branch, SWGL_Root.WEB+"scene/pipes/mat01/Mat01Program");
	}
	
	
}
