package com.s8.core.web.gl.scene.environment;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.core.web.gl.SWGL_Root;

public class SWGL_TextureCubeMap extends S8WebFrontObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_TextureCubeMap(S8WebFront branch) {
		super(branch, SWGL_Root.WEB+"scene/environment/SWGL_TextureCubeMap");
	}


	public void setPathname(String pathname) {
		vertex.fields().setStringUTF8Field("pathname", pathname);
	}
	
	public void setExtension(String extension) {
		vertex.fields().setStringUTF8Field("extension", extension);
	}
	
	
	public void setNbOfLevels(int n) {
		vertex.fields().setUInt8Field("nbLevels", n);
	}
	
	
	
}
