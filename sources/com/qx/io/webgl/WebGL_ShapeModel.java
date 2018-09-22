package com.qx.io.webgl;

import java.io.IOException;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public abstract class WebGL_ShapeModel {

	public String id;

	public WebGL_ShapeModel() {
		super();
	}

	public abstract String getConstructionScript() throws IOException;

	public abstract String[][] getDefaultModeStyles();
	
	
}

