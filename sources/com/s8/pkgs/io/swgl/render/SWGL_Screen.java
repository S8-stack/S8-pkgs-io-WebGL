package com.s8.pkgs.io.swgl.render;

import com.s8.api.objects.web.S8WebFrontObject;
import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.io.swgl.SWGL_Root;
import com.s8.pkgs.io.swgl.scene.SWGL_Scene;

/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Screen extends S8WebFrontObject {

	
	/**
	 * 
	 * @param branch
	 */
	public SWGL_Screen(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"render/SWGL_Screen");
	}
	
	
	public void setScene(SWGL_Scene scene) {
		vertex.fields().setObjectField("scene", scene);
	}
	
	
	public void setPickingScene(SWGL_Scene scene) {
		vertex.fields().setObjectField("pickingScene", scene);
	}
	

	
}
