package com.s8.pkgs.io.swgl.scene.environment.lights;

import com.s8.api.objects.web.S8WebFrontObject;
import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_DirectionalLight extends S8WebFrontObject {

	public SWGL_DirectionalLight(S8WebFront branch) {
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
