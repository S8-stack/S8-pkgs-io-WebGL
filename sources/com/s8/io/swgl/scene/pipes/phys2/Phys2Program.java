package com.s8.io.swgl.scene.pipes.phys2;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Program extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Program(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/phys2/Phys2Program");
	}
	
	
}
