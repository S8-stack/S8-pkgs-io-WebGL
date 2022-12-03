package com.s8.io.swgl.environment;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;

public class SWGL_TextureCubeMap extends NeObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_TextureCubeMap(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"environment/NbTextureCubeMap");
	}


	public void setPathname(String pathname) {
		vertex.setStringUTF8("pathname", pathname);
	}
	
	public void setExtension(String extension) {
		vertex.setStringUTF8("extension", extension);
	}
	
	
	public void setNbOfLevels(int n) {
		vertex.setUInt8("nbLevels", n);
	}
	
	
	
}
