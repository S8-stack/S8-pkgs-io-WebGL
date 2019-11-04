package com.qx.level1.io.webgl;

import java.io.InputStream;

import com.qx.level0.web.sources.WebSourceLoader;

/**
 * Root point for computing path to further load client-side resources.
 * 
 * @author pc
 *
 */
public class WebSources extends com.qx.level0.web.sources.WebSources {

	public WebSources() {
		super("webgl", new WebSourceLoader() {			
			public @Override InputStream open(String pathname) {
				return WebSources.class.getResourceAsStream(pathname);
			}
		});
	}
}
