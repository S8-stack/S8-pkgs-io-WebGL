package com.s8.io.swgl.scene.pipes.standard;

import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.pipes.SWGL_Appearance;


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
	public StandardAppearance(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/standard/StandardAppearance");
	}
	
	
	public void setGlossiness(double value) {
		vertex.fields().setFloat32Field("glossiness", (float) value);
	}
	
	public void setRoughness(double value) {
		vertex.fields().setFloat32Field("roughness", (float) value);
	}
	
	
	public void setSpecularColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.fields().setFloat32ArrayField("specularColor", values);
	}
	
	public void setSpecularColor(float[] value) {
		vertex.fields().setFloat32ArrayField("specularColor", value);
	}

	
	public void setDiffuseColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.fields().setFloat32ArrayField("diffuseColor", values);
	}
	
	
	public void setDiffuseColor(float[] value) {
		vertex.fields().setFloat32ArrayField("diffuseColor", value);
	}
	
	
	public void setAmbientColor(float[] value) {
		vertex.fields().setFloat32ArrayField("ambientColor", value);
	}
	
	
	

}
