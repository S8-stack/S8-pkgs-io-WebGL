package com.s8.pkgs.io.webgl.scene.environment.lights;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_DirectionalLight extends S8WebObject {

	public SWGL_DirectionalLight(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/environment/lights/SWGL_DirectionalLight");
	}

	
	public void setAmbientColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.outbound().setFloat32ArrayField("ambient", webColor);
	}
	
	public void setDiffuseColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.outbound().setFloat32ArrayField("diffuse", webColor);
	}
	
	public void setSpecularColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.outbound().setFloat32ArrayField("specular", webColor);
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setDirectionVector(float[] vector) {
		vertex.outbound().setFloat32ArrayField("direction", vector);
	}
	
}
