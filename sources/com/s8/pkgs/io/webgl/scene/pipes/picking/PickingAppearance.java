package com.s8.pkgs.io.webgl.scene.pipes.picking;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Appearance;


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
		super(branch, WebSources.ROOT+"scene/pipes/picking/PickingAppearance");
	}


}
