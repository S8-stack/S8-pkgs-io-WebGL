package com.s8.io.swgl.scene.pipes.picking;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Appearance;


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
	public PickingAppearance(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/picking/PickingAppearance");
	}


}
