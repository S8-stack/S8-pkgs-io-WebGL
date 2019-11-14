package com.qx.level1.io.webgl;

import java.io.InputStream;


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
}
