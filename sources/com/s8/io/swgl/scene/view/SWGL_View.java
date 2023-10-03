package com.s8.io.swgl.scene.view;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;

/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_View extends WebS8Object {

	
	/**
	 * 
	 * @param branch
	 */
	public SWGL_View(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/view/SWGL_View");
	}
	
	
}
