package com.s8.pkgs.io.webgl.scene.pipes.mat01;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.material.WebGL_Material;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Appearance;


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
		super(branch, WebSources.ROOT+"scene/pipes/mat01/Mat01Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setMaterial(WebGL_Material material) {
		vertex.outbound().setObjectField("material", material);
	}
	

}
