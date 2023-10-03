package com.s8.io.swgl.scene.pipes.standard;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Program;


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
	public StandardProgram(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/standard/StandardProgram");
	}
	
	
}
