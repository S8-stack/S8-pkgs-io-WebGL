package com.qx.front.io.webgl;

import com.qx.back.base.resources.FrontFolder;
import com.qx.back.base.resources.FrontResourceDescriptor;
import com.qx.back.base.resources.FrontResourceLoader;

public class WebGL_Front {
	
	public final static FrontResourceLoader LOADER = 
			new FrontResourceLoader(WebGL_Front.class, "/webgl", new FrontResourceDescriptor[] {
					new FrontFolder("")
			});

}
