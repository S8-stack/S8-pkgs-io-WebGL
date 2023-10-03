package com.s8.io.swgl.scene.environment;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;

public class SWGL_TextureCubeMap extends WebS8Object {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_TextureCubeMap(WebS8Session branch) {
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
