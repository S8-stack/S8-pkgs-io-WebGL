package com.s8.io.swgl.appearances.mat01;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;
import com.s8.io.swgl.material.NbMaterial;


/**
 * 
 * @author pierreconvert
 *
 */
public class Mat01NbAppearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Mat01NbAppearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/mat01/Mat01NbAppearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setMaterial(NbMaterial material) {
		vertex.setObj("material", material);
	}
	

}
