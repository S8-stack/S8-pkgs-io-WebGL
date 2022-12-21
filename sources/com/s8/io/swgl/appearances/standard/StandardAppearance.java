package com.s8.io.swgl.appearances.standard;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;


/**
 * 
 * @author pierreconvert
 *
 */
public class StandardAppearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StandardAppearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/standard/StandardAppearance");
	}
	
	
	public void setGlossiness(double value) {
		vertex.setFloat32("glossiness", (float) value);
	}
	
	public void setRoughness(double value) {
		vertex.setFloat32("roughness", (float) value);
	}
	
	
	public void setSpecularColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("specularColor", values);
	}
	
	public void setSpecularColor(float[] value) {
		vertex.setFloat32Array("specularColor", value);
	}

	
	public void setDiffuseColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("diffuseColor", values);
	}
	
	
	public void setDiffuseColor(float[] value) {
		vertex.setFloat32Array("diffuseColor", value);
	}
	
	
	public void setAmbientColor(float[] value) {
		vertex.setFloat32Array("ambientColor", value);
	}
	
	
	

}
