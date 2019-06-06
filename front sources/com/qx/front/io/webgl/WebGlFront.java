package com.qx.front.io.webgl;

import com.qx.back.base.resources.FrontFolder;
import com.qx.back.base.resources.FrontResourceDescriptor;
import com.qx.back.base.resources.FrontResourceLoader;
import com.qx.front.base.BaseFront;

public class WebGlFront {
	
	public final static FrontResourceLoader LOADER = 
			new FrontResourceLoader(BaseFront.class, "/webgl", new FrontResourceDescriptor[] {
					new FrontFolder("")
			});

}
