package com.s8.io.swgl.scene.pipes.color2;


import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Program;


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
	public Color2Program(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/color2/Color2Program");
	}
	
	
}
