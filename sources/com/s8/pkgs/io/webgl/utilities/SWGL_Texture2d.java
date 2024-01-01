package com.s8.pkgs.io.webgl.utilities;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.pkgs.io.webgl.WebSources;

public class SWGL_Texture2d extends S8WebFrontObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Texture2d(S8WebFront branch) {
		super(branch, WebSources.ROOT + "texture/SWGL_Texture2d");
	}


	public void setPathname(String pathname) {
		vertex.outbound().setStringUTF8Field("pathname", pathname);
	}
	
}
