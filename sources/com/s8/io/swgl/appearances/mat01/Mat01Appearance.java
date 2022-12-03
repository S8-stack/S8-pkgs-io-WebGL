package com.s8.io.swgl.appearances.mat01;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;
import com.s8.io.swgl.material.SWGL_Material;


/**
 * 
 * @author pierreconvert
 *
 */
public class Mat01Appearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Mat01Appearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/mat01/Mat01Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setMaterial(SWGL_Material material) {
		vertex.setObj("material", material);
	}
	

}
