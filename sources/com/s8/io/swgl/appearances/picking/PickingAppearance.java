package com.s8.io.swgl.appearances.picking;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;


/**
 * 
 * @author pierreconvert
 *
 */
public class PickingAppearance extends SWGL_Appearance {


	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public PickingAppearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/picking/PickingAppearance");
	}


}
