package com.s8.pkgs.io.swgl.utilities;

import com.s8.api.objects.web.S8WebFrontObject;
import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.io.swgl.SWGL_Root;

public class SWGL_Texture2d extends S8WebFrontObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Texture2d(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"texture/SWGL_Texture2d");
	}


	public void setPathname(String pathname) {
		vertex.fields().setStringUTF8Field("pathname", pathname);
	}
	
}
