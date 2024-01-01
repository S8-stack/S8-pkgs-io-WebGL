package com.s8.pkgs.io.webgl.scene.pipes.color2;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Appearance;
import com.s8.pkgs.io.webgl.utilities.SWGL_Utilities;


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
	public Color2Appearance(S8WebFront branch) {
		super(branch, WebSources.ROOT + "scene/pipes/color2/Color2Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setColor(double... color) {
		vertex.outbound().setFloat32ArrayField("color", SWGL_Utilities.toFloatArray(color));
	}
	

}
