package com.s8.io.swgl.scene.pipes.picking;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class PickingProgram extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public PickingProgram(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/picking/PickingProgram");
	}
	
	
}
