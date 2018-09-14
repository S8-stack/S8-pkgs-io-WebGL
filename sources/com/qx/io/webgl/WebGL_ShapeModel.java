package com.qx.io.webgl;

import java.io.IOException;
import java.io.Writer;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class WebGL_ShapeModel {

	public String id;

	public WebGL_ShapeModel() {
		super();
	}

	public void writeOutline(Writer writer) throws IOException{

		String definition = 
				"var profile = new WebGL_Polygon([-0.25, .5, 0.25, .5, 0.25, 2.0, -.25, 2.0], true);"
						+"var wire = new WebGL_WireModel();"
						+"var surface = new WebGL_SurfaceModel();"
						+"profile.fullyRevolve(Affine3.STD, wire, surface, 20, true);"
						+"model.renderables = [wire, surface];";
		
		writer.append(definition);
	}

	
	

	/**
	 * 
	 * @return
	 */
	public String[][] getDefaultModeStyles(){
		
		String[][] modes = new String[2][WebGL_ShapeInstance.NB_MODES];
		String[] wireModes = new String[WebGL_ShapeInstance.NB_MODES];
		for(int i=0; i<8; i++){
			wireModes[i] = "darkWire";
		}
		
		String[] surfaceModes = new String[WebGL_ShapeInstance.NB_MODES];
		for(int i=0; i<8; i++){
			surfaceModes[i] = "shinyBluePlastic";
		}
		modes[0] = wireModes;
		modes[1] = surfaceModes;
		return modes;
	}

}

