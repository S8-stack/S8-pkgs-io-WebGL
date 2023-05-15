package com.s8.io.swgl.scene.environment.lights;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_DirectionalLight extends NeObject {

	public SWGL_DirectionalLight(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"scene/environment/lights/SWGL_DirectionalLight");
	}

	
	public void setAmbientColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32ArrayField("ambient", webColor);
	}
	
	public void setDiffuseColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32ArrayField("diffuse", webColor);
	}
	
	public void setSpecularColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32ArrayField("specular", webColor);
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setDirectionVector(float[] vector) {
		vertex.setFloat32ArrayField("direction", vector);
	}
	
}
