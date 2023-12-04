package com.s8.core.web.gl.material;


import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.core.web.gl.SWGL_Root;
import com.s8.core.web.gl.utilities.SWGL_Utilities;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Material extends S8WebFrontObject {

	public SWGL_Material(S8WebFront branch) {
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
