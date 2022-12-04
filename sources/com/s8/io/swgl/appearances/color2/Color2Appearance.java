package com.s8.io.swgl.appearances.color2;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;
import com.s8.io.swgl.utilities.SWGL_Utilities;


/**
 * 
 * @author pierreconvert
 *
 */
public class Color2Appearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Color2Appearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/color2/Color2Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setColor(double... color) {
		vertex.setFloat32Array("color", SWGL_Utilities.toFloatArray(color));
	}
	

}
