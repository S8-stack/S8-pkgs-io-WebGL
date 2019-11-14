package com.qx.io.webgl.tests;

import com.qx.level0.web.sources.ModuleWebSources;

public class WebGL_UnitTest03 {

	public static void main(String[] args) throws Exception {
		
		ModuleWebSources sources = new ModuleWebSources("webgl", com.qx.level1.io.webgl.QxModule.LOADER);
		System.out.println(sources.JS_getCatalog());
		System.out.println(sources);
	}
}
