package com.s8.io.swgl.utilities;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;

public class SWGL_Texture2d extends NeObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Texture2d(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"texture/SWGL_Texture2d");
	}


	public void setPathname(String pathname) {
		vertex.fields().setStringUTF8Field("pathname", pathname);
	}
	
}
