package com.s8.io.swgl.material;


import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.utilities.NbUtilities;


/**
 * 
 * @author pierreconvert
 *
 */
public class NbMaterial extends NeObject {

	public NbMaterial(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"materials/NbMaterial");
	}

	
	public void setAmbientColor(double... color) {
		vertex.setFloat32Array("ambient", NbUtilities.toFloatArray(color));
	}
	
	public void setDiffuseColor(double... color) {
		vertex.setFloat32Array("diffuse", NbUtilities.toFloatArray(color));
	}
	
	public void setSpecularColor(double... color) {
		vertex.setFloat32Array("specular", NbUtilities.toFloatArray(color));
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setShininess(double value) {
		vertex.setFloat32("shininess", (float) value);
	}
	
}
