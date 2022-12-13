package com.s8.io.swgl.appearances.phys2;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;
import com.s8.io.swgl.utilities.SWGL_Texture2d;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Appearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Appearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/phys2/Phys2Appearance");
	}
	
	
	/**
	 * 
	 * @param texture
	 */
	public void setMatProperties(SWGL_Texture2d texture) {
		vertex.setObj("matProperties", texture);
	}
	
	
	/**
	 * 
	 * @param texture
	 */
	public void setMatDiffuseColors(SWGL_Texture2d texture) {
		vertex.setObj("matDiffuseColors", texture);
	}
	
	
	/**
	 * 
	 * @param texture
	 */
	public void setMatSpecularColors(SWGL_Texture2d texture) {
		vertex.setObj("matSpecularColors", texture);
	}
	
	
	

}
