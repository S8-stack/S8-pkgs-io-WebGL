package com.s8.io.swgl.appearances.picking;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Program;


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
	public PickingProgram(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/picking/PickingProgram");
	}
	
	
}
