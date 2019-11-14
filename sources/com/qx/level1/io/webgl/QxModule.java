package com.qx.level1.io.webgl;

import java.io.InputStream;

import com.qx.level0.web.sources.ModuleWebSources;


/**
 * Root point for computing path to further load client-side resources.
 * 
 * @author pc
 *
 */
public class QxModule extends com.qx.level0.utilities.loader.QxModule {
	
	public final static Loader LOADER = new Loader() {
		
		@Override
		public InputStream getResource(String pathname) {
			return QxModule.class.getResourceAsStream(pathname);
		}	
	};
	
	public final static ModuleWebSources WEB_SOURCES = new ModuleWebSources("webgl", LOADER);
}
