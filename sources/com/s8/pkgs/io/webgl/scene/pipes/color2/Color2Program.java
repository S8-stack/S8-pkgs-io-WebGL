package com.s8.pkgs.io.webgl.scene.pipes.color2;


import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Program;


/**
 * 
 * @author pierreconvert
 *
 */
public class Color2Program extends SWGL_Program {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Color2Program(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/color2/Color2Program");
	}
	
	
}
