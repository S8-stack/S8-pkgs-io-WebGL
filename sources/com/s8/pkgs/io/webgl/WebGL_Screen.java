package com.s8.pkgs.io.webgl;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
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
		super(branch, WebSources.ROOT + "SWGL_Screen");
	}
	
	
	public void setScene(SWGL_Scene scene) {
		vertex.outbound().setObjectField("scene", scene);
	}
	
	
	public void setPickingScene(SWGL_Scene scene) {
		vertex.outbound().setObjectField("pickingScene", scene);
	}
	
	public void setClearColor_RGBA_UInt8(int red, int green, int blue, int alpha) {
		setClearColor_RGBA_UInt8(new int[] { red, green, blue, alpha });
	}
	
	public void setClearColor_RGBA_UInt8(int[] color) {
		vertex.outbound().setUInt8ArrayField("clearColor_RGBA_UInt8", color);
	}
	
	
	public void setSphericEyeVector(double r, double theta, double phi) {
		vertex.outbound().setFloat32ArrayField("sphericEyeVector", new float[] { (float) r, (float) theta, (float) phi });
	}

	
}
