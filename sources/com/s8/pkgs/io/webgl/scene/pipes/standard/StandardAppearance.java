package com.s8.pkgs.io.webgl.scene.pipes.standard;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Appearance;


/**
 * 
 * @author pierreconvert
 *
 */
public class StandardAppearance extends SWGL_Appearance {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StandardAppearance(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/standard/StandardAppearance");
	}
	
	
	public void setGlossiness(double value) {
		vertex.outbound().setFloat32Field("glossiness", (float) value);
	}
	
	public void setRoughness(double value) {
		vertex.outbound().setFloat32Field("roughness", (float) value);
	}
	
	
	public void setSpecularColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.outbound().setFloat32ArrayField("specularColor", values);
	}
	
	public void setSpecularColor(float[] value) {
		vertex.outbound().setFloat32ArrayField("specularColor", value);
	}

	
	public void setDiffuseColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.outbound().setFloat32ArrayField("diffuseColor", values);
	}
	
	
	public void setDiffuseColor(float[] value) {
		vertex.outbound().setFloat32ArrayField("diffuseColor", value);
	}
	
	
	public void setAmbientColor(float[] value) {
		vertex.outbound().setFloat32ArrayField("ambientColor", value);
	}
	
	
	

}
