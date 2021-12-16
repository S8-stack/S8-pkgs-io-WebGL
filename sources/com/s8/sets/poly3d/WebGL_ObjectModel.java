package com.s8.sets.poly3d;

import java.io.IOException;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public abstract class WebGL_ObjectModel {

	public String id;

	public WebGL_ObjectModel() {
		super();
	}

	public abstract byte[] getModel() throws IOException;
	
}

