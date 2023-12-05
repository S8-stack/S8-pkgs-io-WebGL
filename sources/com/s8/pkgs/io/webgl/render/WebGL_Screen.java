package com.s8.pkgs.io.webgl.render;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.pkgs.io.webgl.WebGL_Root;
import com.s8.pkgs.io.webgl.scene.SWGL_Scene;

/**
 * 
 * @author pierreconvert
 *
 */
public class WebGL_Screen extends S8WebFrontObject {

	
	/**
	 * 
	 * @param branch
	 */
	public WebGL_Screen(S8WebFront branch) {
		super(branch, WebGL_Root.WEB+"render/SWGL_Screen");
	}
	
	
	public void setScene(SWGL_Scene scene) {
		vertex.fields().setObjectField("scene", scene);
	}
	
	
	public void setPickingScene(SWGL_Scene scene) {
		vertex.fields().setObjectField("pickingScene", scene);
	}
	

	
}
