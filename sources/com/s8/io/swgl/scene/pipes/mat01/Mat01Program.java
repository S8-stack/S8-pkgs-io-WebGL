package com.s8.io.swgl.scene.pipes.mat01;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Program;


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
	public Mat01Program(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/mat01/Mat01Program");
	}
	
	
}
