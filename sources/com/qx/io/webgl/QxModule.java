package com.qx.io.webgl;

import java.net.URL;

import com.qx.base.loader.QxModuleResourceLoader;

/**
 * Root point for computing path to further load client-side resources.
 * 
 * @author pc
 *
 */
public class QxModule {

	public final static QxModuleResourceLoader LOADER = new QxModuleResourceLoader() {

		@Override
		public URL getResource(String pathname) {
			return getClass().getResource(pathname);
		}
		
	};
}
