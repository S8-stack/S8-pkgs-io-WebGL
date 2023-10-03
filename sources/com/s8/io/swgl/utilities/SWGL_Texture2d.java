package com.s8.io.swgl.utilities;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;

public class SWGL_Texture2d extends WebS8Object {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Texture2d(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"texture/SWGL_Texture2d");
	}


	public void setPathname(String pathname) {
		vertex.fields().setStringUTF8Field("pathname", pathname);
	}
	
}
