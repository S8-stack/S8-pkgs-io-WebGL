package com.s8.pkgs.io.webgl.scene.pipes.picking;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Program;


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
		super(branch, WebSources.ROOT+"scene/pipes/picking/PickingProgram");
	}
	
	
}
