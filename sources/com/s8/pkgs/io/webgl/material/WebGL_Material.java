package com.s8.pkgs.io.webgl.material;


import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.utilities.SWGL_Utilities;


/**
 * 
 * @author pierreconvert
 *
 */
public class WebGL_Material extends S8WebFrontObject {

	public WebGL_Material(S8WebFront branch) {
		super(branch, WebSources.ROOT + "materials/SWGL_Material");
	}

	
	public void setAmbientColor(double... color) {
		vertex.outbound().setFloat32ArrayField("ambient", SWGL_Utilities.toFloatArray(color));
	}
	
	public void setDiffuseColor(double... color) {
		vertex.outbound().setFloat32ArrayField("diffuse", SWGL_Utilities.toFloatArray(color));
	}
	
	public void setSpecularColor(double... color) {
		vertex.outbound().setFloat32ArrayField("specular", SWGL_Utilities.toFloatArray(color));
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setShininess(double value) {
		vertex.outbound().setFloat32Field("shininess", (float) value);
	}
	
}
