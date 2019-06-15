package com.qx.front.io.webgl.tests;

import com.qx.back.base.resources.FrontFolder;
import com.qx.back.base.resources.FrontResourceDescriptor;
import com.qx.back.base.resources.FrontResourceLoader;

public class WebGL_TestsApp {

	public final static FrontResourceLoader LOADER = 
			new FrontResourceLoader(WebGL_TestsApp.class, "/wglapp", 
					new FrontResourceDescriptor[] {
							/*
					new FrontFile("QxContext.js"),
					new FrontFile("POST_Request.js"),
					new FrontFolder("myapp08")*/
							new FrontFolder("", 8192, true)

			});
}
