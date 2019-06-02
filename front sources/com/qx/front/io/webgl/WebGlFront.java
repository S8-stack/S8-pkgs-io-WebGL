package com.qx.front.io.webgl;

import com.qx.front.base.BaseFront;
import com.qx.front.base.FrontFolder;
import com.qx.front.base.FrontResourceDescriptor;
import com.qx.front.base.FrontResourceLoader;

public class WebGlFront {
	
	public final static FrontResourceLoader LOADER = 
			new FrontResourceLoader(BaseFront.class, "/webgl", new FrontResourceDescriptor[] {
					new FrontFolder("")
			});

}
