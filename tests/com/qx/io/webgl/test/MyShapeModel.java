package com.qx.io.webgl.test;

import java.io.IOException;

import com.qx.io.webgl.WebGL_ObjectInstance;
import com.qx.io.webgl.WebGL_ObjectModel;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class MyShapeModel extends WebGL_ObjectModel {

	
	public MyShapeModel() {
		super();
	}

	@Override
	public String getConstructionScript() throws IOException{

		String definition = 
				"var profile = new WebGL_Polygon([-0.25, .5, 0.25, .5, 0.25, 2.0, -.25, 2.0], true);"
						+"var wire = new WebGL_WireModel();"
						+"var surface = new WebGL_SurfaceModel();"
						+"profile.fullyRevolve(Affine3.STD, wire, surface, settings);"
						+"model.renderables = [wire, surface];";
		
		return definition;
	}

	
	

	/**
	 * 
	 * @return
	 */
	@Override
	public String[][] getDefaultModeStyles(){
		
		String[][] modes = new String[2][WebGL_ObjectInstance.NB_MODES];
		String[] wireModes = new String[WebGL_ObjectInstance.NB_MODES];
		for(int i=0; i<8; i++){
			wireModes[i] = "darkWire";
		}
		
		String[] surfaceModes = new String[WebGL_ObjectInstance.NB_MODES];
		for(int i=0; i<8; i++){
			surfaceModes[i] = "shinyBluePlastic";
		}
		modes[0] = wireModes;
		modes[1] = surfaceModes;
		return modes;
	}

}

