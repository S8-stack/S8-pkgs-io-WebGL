package com.s8.io.swgl.appearances.standard;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.appearances.SWGL_Appearance;


/**
 * 
 * @author pierreconvert
 *
 */
public class StandardNbAppearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StandardNbAppearance(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/standard/StandardNbAppearance");
	}
	
	
	public void setGlossiness(double value) {
		vertex.setFloat32("glossiness", (float) value);
	}
	
	public void setRoughness(double value) {
		vertex.setFloat32("roughness", (float) value);
	}
	
	public void setSpecularColor(float[] value) {
		vertex.setFloat32Array("specularColor", value);
	}

	public void setDiffuseColor(float[] value) {
		vertex.setFloat32Array("diffuseColor", value);
	}
	
	
	public void setAmbientColor(float[] value) {
		vertex.setFloat32Array("ambientColor", value);
	}
	
	
	

}
