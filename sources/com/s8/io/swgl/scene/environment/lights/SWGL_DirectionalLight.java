package com.s8.io.swgl.scene.environment.lights;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_DirectionalLight extends WebS8Object {

	public SWGL_DirectionalLight(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/environment/lights/SWGL_DirectionalLight");
	}

	
	public void setAmbientColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.fields().setFloat32ArrayField("ambient", webColor);
	}
	
	public void setDiffuseColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.fields().setFloat32ArrayField("diffuse", webColor);
	}
	
	public void setSpecularColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.fields().setFloat32ArrayField("specular", webColor);
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setDirectionVector(float[] vector) {
		vertex.fields().setFloat32ArrayField("direction", vector);
	}
	
}
