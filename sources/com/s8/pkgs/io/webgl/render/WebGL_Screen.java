package com.s8.pkgs.io.webgl.render;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.SWGL_Scene;

/**
 * 
 * @author pierreconvert
 *
 */
public class WebGL_Screen extends S8WebObject {

	
	/**
	 * 
	 * @param branch
	 */
	public WebGL_Screen(S8WebFront branch) {
		super(branch, WebSources.ROOT + "render/SWGL_Screen");
	}
	
	
	public void setScene(SWGL_Scene scene) {
		vertex.outbound().setObjectField("scene", scene);
	}
	
	
	public void setPickingScene(SWGL_Scene scene) {
		vertex.outbound().setObjectField("pickingScene", scene);
	}
	
	public void setClearColor(int red, int green, int blue, int alpha) {
		setClearColor(new int[] { red, green, blue, alpha });
	}
	
	public void setClearColor(int[] color) {
		vertex.outbound().setUInt8ArrayField("clearColor", color);
	}
	

	
}
