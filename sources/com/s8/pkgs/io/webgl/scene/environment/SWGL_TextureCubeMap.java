package com.s8.pkgs.io.webgl.scene.environment;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;

public class SWGL_TextureCubeMap extends S8WebObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_TextureCubeMap(S8WebFront branch) {
		super(branch, WebSources.ROOT + "scene/environment/SWGL_TextureCubeMap");
	}


	public void setPathname(String pathname) {
		vertex.outbound().setStringUTF8Field("pathname", pathname);
	}
	
	public void setExtension(String extension) {
		vertex.outbound().setStringUTF8Field("extension", extension);
	}
	
	
	public void setNbOfLevels(int n) {
		vertex.outbound().setUInt8Field("nbLevels", n);
	}
	
	
	
}
