package com.s8.io.swgl.scene.pipes.phys2;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Material extends WebS8Object {


	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/phys2/Phys2Material");
	}
	
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(WebS8Session branch, String typeName) {
		super(branch, typeName);
	}
	
	


	public void setColor(int r, int g, int b, float glossiness) {
		vertex.fields().setUInt8ArrayField("specularColor", new int[] {
				(int) (glossiness * r),
				(int) (glossiness * g),
				(int) (glossiness * b),
				255
		});
		
		vertex.fields().setUInt8ArrayField("diffuseColor", new int[] {
				(int) ((1.0f - glossiness) * r),
				(int) ((1.0f - glossiness) * g),
				(int) ((1.0f - glossiness) * b),
				255
		});
	}



	/**
	 * 
	 * @param value
	 */
	public void setRoughness(double value) {
		vertex.fields().setUInt8Field("roughness", (int) (value / 6.0 * 255));
	}


	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setSpecularColor(int r, int g, int b) {
		vertex.fields().setUInt8ArrayField("specularColor", new int[] { r, g, b, 255});
	}
	
	
	
	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 * @param scalingFactor
	 */
	public void setSpecularColor(int r, int g, int b, float scalingFactor) {
		vertex.fields().setUInt8ArrayField("specularColor", new int[] {
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				255
		});
	}
	

	public void setDiffuseColor(int r, int g, int b) {
		vertex.fields().setUInt8ArrayField("diffuseColor", new int[] { r, g, b, 255 });
	}
	
	
	
	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 * @param scalingFactor
	 */
	public void setDiffuseColor(int r, int g, int b, float scalingFactor) {
		int[] values = new int[] {
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				255
		};
		vertex.fields().setUInt8ArrayField("diffuseColor", values);
	}



	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int r, int g, int b) {
		vertex.fields().setUInt8ArrayField("emissiveColor", new int[] { r, g, b, 255 });
	}
	

	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int r, int g, int b, float scalingFactor) {
		int[] values = new int[] {
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				255
		};
		vertex.fields().setUInt8ArrayField("emissiveColor", values);
	}


	/**
	 * 
	 * @param value
	 */
	public void setEmissiveColor(float[] value) {
		vertex.fields().setFloat32ArrayField("emissiveColor", value);
	}


}
