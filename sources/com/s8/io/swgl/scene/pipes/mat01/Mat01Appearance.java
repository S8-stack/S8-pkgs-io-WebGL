package com.s8.io.swgl.scene.pipes.mat01;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.material.SWGL_Material;
import com.s8.io.swgl.scene.pipes.SWGL_Appearance;


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
		super(branch, SWGL_Root.WEB+"scene/pipes/mat01/Mat01Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setMaterial(SWGL_Material material) {
		vertex.setObjectField("material", material);
	}
	

}
