package com.s8.io.swgl.scene;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;

/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Screen extends NeObject {

	
	/**
	 * 
	 * @param branch
	 */
	public SWGL_Screen(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"scene/SWGL_Screen");
	}
	
	
	public void setScene(SWGL_Scene scene) {
		vertex.setObj("scene", scene);
	}
	

	
}
