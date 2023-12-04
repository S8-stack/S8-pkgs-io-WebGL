package com.s8.core.web.gl.scene.pipes.color2;


import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class Color2Program extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Color2Program(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/color2/Color2Program");
	}
	
	
}
