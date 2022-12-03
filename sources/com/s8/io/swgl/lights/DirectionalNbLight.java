package com.s8.io.swgl.lights;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.maths.SWGL_Vector3d;


/**
 * 
 * @author pierreconvert
 *
 */
public class DirectionalNbLight extends NeObject {

	public DirectionalNbLight(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"lights/DirectionalNbLight");
	}

	
	public void setAmbientColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32Array("ambient", webColor);
	}
	
	public void setDiffuseColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32Array("diffuse", webColor);
	}
	
	public void setSpecularColor(double... color) {
		float[] webColor = new float[4];
		for(int i = 0; i<4; i++) { webColor[i] = (float) color[i]; }
		vertex.setFloat32Array("specular", webColor);
	}
	
	/**
	 * 
	 * @param vector
	 */
	public void setDirectionVector(SWGL_Vector3d vector) {
		vertex.setFloat32Array("direction", vector.toFloat32Array());
	}
	
}
