package com.qx.level1.io.webgl;

import java.io.InputStream;


/**
 * "webgl"
 * Root point for computing path to further load client-side resources.
 * 
 * @author pc
 *
 */
public class QxLoader implements com.qx.level0.utilities.loader.QxModuleLoader {

	@Override
	public InputStream getResource(String pathname) {
		return QxLoader.class.getResourceAsStream(pathname);
	}

	@Override
	public String getName() {
		return "WebGL";
	}
}
