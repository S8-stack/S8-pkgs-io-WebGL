package com.qx.level1.io.webgl.shapes;

import java.io.IOException;

import com.qx.level0.io.bohr.BohrObject;
import com.qx.level0.io.bohr.BohrObjectPrototype;
import com.qx.level0.io.bohr.BohrOutflow;
import com.qx.level1.io.webgl.WebGL_RGBA8Color;

public class WebGL_Appearance implements BohrObject {
	
	public final static BohrObjectPrototype BOHR_PROTOTYPE = new BohrObjectPrototype();
	public @Override BohrObjectPrototype getBohrPrototype() { return BOHR_PROTOTYPE; }
	

	/**
	 * default program for wire rendering 
	 */
	public String wireProgram = "color2";

	/**
	 * default value for shape material
	 */
	public WebGL_RGBA8Color wireColor = new WebGL_RGBA8Color(76, 76, 76, 255);

	/**
	 * default program for surface rendering 
	 */
	public String surfaceProgram = "standard";

	/**
	 * default value for shape material
	 */
	public double surfaceGlossiness = 0.7;


	/**
	 * default value for shape material
	 */
	public double surfaceRoughness = 0.5;


	/**
	 * Phong exponent for Old-style rendering
	 */
	public double surfaceShininess = 2.5;


	/** 
	 * default value for shape material
	 */
	public WebGL_RGBA8Color surfaceSpecularColor = new WebGL_RGBA8Color(255, 255, 255, 255);


	/** 
	 * default value for shape material
	 */
	public WebGL_RGBA8Color surfaceDiffuseColor = new WebGL_RGBA8Color(255, 255, 255, 255);


	/** 
	 * default value for shape material
	 */
	public WebGL_RGBA8Color surfaceAmbientColor = new WebGL_RGBA8Color(255, 255, 255, 255);


	/**
	 * surface color texture
	 */
	public String surfaceTexture0 = null;

	/**
	 * surface color texture
	 */
	public String surfaceTexture1 = null;

	/**
	 * surface color texture
	 */
	public String surfaceTexture2 = null;

	/**
	 * surface color texture
	 */
	public String surfaceTexture3 = null;



	@Override
	public void composeBody(BohrOutflow output) throws IOException {

		// material

		// <wire>
		output.putString(wireProgram);
		wireColor.write(output);
		// </wire>

		// <surface>
		output.putString(surfaceProgram);
		output.putFloat32((float) surfaceGlossiness);
		output.putFloat32((float) surfaceRoughness);
		output.putFloat32((float) surfaceShininess);
		surfaceSpecularColor.write(output);
		surfaceDiffuseColor.write(output);
		surfaceAmbientColor.write(output);

		// textures
		output.putString(surfaceTexture0);
		output.putString(surfaceTexture1);
		output.putString(surfaceTexture2);
		output.putString(surfaceTexture3);
		// </surface>
	}

}
