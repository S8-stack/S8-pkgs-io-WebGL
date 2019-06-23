package com.qx.back.io.webgl;

import java.io.IOException;

import com.qx.back.base.bytes.ByteOutput;
import com.qx.back.io.bohr.BohrObject;
import com.qx.back.io.bohr.BohrScope;

public class WebGL_Appearance extends BohrObject {

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




	public final static int TYPE_CODE = 201;

	@Override
	public int getTypeCode() {
		return WebGL_Back.WEBGL_BOHR_PREFIX+TYPE_CODE;
	}

	@Override
	public void send(ByteOutput output) throws IOException {

		// material

		// <wire>
		output.putStringUTF8(wireProgram);
		wireColor.write(output);
		// </wire>

		// <surface>
		output.putStringUTF8(surfaceProgram);
		output.putFloat32((float) surfaceGlossiness);
		output.putFloat32((float) surfaceRoughness);
		output.putFloat32((float) surfaceShininess);
		surfaceSpecularColor.write(output);
		surfaceDiffuseColor.write(output);
		surfaceAmbientColor.write(output);

		// textures
		output.putStringUTF8(surfaceTexture0);
		output.putStringUTF8(surfaceTexture1);
		output.putStringUTF8(surfaceTexture2);
		output.putStringUTF8(surfaceTexture3);
		// </surface>
	}

	@Override
	public void getSubNodes(BohrScope scope) {
		// none
	}

}
