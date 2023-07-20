package com.s8.io.swgl.material;


import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.utilities.SWGL_Utilities;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Material extends NeObject {

	public SWGL_Material(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"materials/SWGL_Material");
	}

	
	public void setAmbientColor(double... color) {
		vertex.fields().setFloat32ArrayField("ambient", SWGL_Utilities.toFloatArray(color));
	}
	
	public void setDiffuseColor(double... color) {
		vertex.fields().setFloat32ArrayField("diffuse", SWGL_Utilities.toFloatArray(color));
	}
	
	public void setSpecularColor(double... color) {
		vertex.fields().setFloat32ArrayField("specular", SWGL_Utilities.toFloatArray(color));
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setShininess(double value) {
		vertex.fields().setFloat32Field("shininess", (float) value);
	}
	
}
