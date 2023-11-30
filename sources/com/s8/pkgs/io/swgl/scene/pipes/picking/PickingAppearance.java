package com.s8.pkgs.io.swgl.scene.pipes.picking;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.swgl.SWGL_Root;
import com.s8.pkgs.io.swgl.scene.pipes.SWGL_Appearance;


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
	public PickingAppearance(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/picking/PickingAppearance");
	}


}
