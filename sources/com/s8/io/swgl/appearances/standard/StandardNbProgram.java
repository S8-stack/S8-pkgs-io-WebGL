package com.s8.io.swgl.appearances.standard;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class StandardNbProgram extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StandardNbProgram(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/standard/StandardNbProgram");
	}
	
	
}
