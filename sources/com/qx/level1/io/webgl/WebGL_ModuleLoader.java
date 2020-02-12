package com.qx.level1.io.webgl;

import java.io.InputStream;


/**
 * "webgl"
 * Root point for computing path to further load client-side resources.
 * 
 * @author pc
 *
 */
public class WebGL_ModuleLoader implements com.qx.level0.meta.loader.QxModuleLoader {

	@Override
	public InputStream getResource(String pathname) {
		return WebGL_ModuleLoader.class.getResourceAsStream(pathname);
	}

	@Override
	public String getName() {
		return "WebGL";
	}
}
