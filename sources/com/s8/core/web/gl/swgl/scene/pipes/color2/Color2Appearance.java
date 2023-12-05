package com.s8.core.web.gl.swgl.scene.pipes.color2;

import com.s8.api.web.S8WebFront;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.swgl.scene.pipes.SWGL_Appearance;
import com.s8.core.web.gl.swgl.utilities.SWGL_Utilities;


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
		super(branch, SWGL_Root.WEB+"scene/pipes/color2/Color2Appearance");
	}
	
	
	
	/**
	 * 
	 * @param material
	 */
	public void setColor(double... color) {
		vertex.fields().setFloat32ArrayField("color", SWGL_Utilities.toFloatArray(color));
	}
	

}
