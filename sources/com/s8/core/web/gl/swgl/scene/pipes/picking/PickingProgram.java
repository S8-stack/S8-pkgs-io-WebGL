package com.s8.core.web.gl.swgl.scene.pipes.picking;

import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.swgl.scene.pipes.SWGL_Program;


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
	public PickingProgram(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/picking/PickingProgram");
	}
	
	
}
