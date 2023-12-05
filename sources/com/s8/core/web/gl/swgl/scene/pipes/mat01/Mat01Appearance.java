package com.s8.core.web.gl.swgl.scene.pipes.mat01;

import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.swgl.material.SWGL_Material;
import com.s8.core.web.gl.swgl.scene.pipes.SWGL_Appearance;


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
	public Mat01Appearance(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/mat01/Mat01Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setMaterial(SWGL_Material material) {
		vertex.fields().setObjectField("material", material);
	}
	

}
