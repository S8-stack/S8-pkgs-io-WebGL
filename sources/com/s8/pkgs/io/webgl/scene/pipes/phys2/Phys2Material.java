package com.s8.pkgs.io.webgl.scene.pipes.phys2;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Material extends S8WebObject {


	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(S8WebFront branch, String typeName) {
		super(branch, typeName);
	}
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/phys2/Phys2Material");
	}
	
	
	


	public void setColor(int r, int g, int b, float glossiness) {
		vertex.outbound().setUInt8ArrayField("specularColor", new int[] {
				(int) (glossiness * r),
				(int) (glossiness * g),
				(int) (glossiness * b),
				255
		});
		
		vertex.outbound().setUInt8ArrayField("diffuseColor", new int[] {
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
		vertex.outbound().setUInt8Field("roughness", (int) (value / 6.0 * 255));
	}


	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setSpecularColor(int r, int g, int b) {
		vertex.outbound().setUInt8ArrayField("specularColor", new int[] { r, g, b, 255});
	}
	
	
	
	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 * @param scalingFactor
	 */
	public void setSpecularColor(int r, int g, int b, float scalingFactor) {
		vertex.outbound().setUInt8ArrayField("specularColor", new int[] {
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				255
		});
	}
	

	public void setDiffuseColor(int r, int g, int b) {
		vertex.outbound().setUInt8ArrayField("diffuseColor", new int[] { r, g, b, 255 });
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
		vertex.outbound().setUInt8ArrayField("diffuseColor", values);
	}



	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int r, int g, int b) {
		vertex.outbound().setUInt8ArrayField("emissiveColor", new int[] { r, g, b, 255 });
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
		vertex.outbound().setUInt8ArrayField("emissiveColor", values);
	}


	/**
	 * 
	 * @param value
	 */
	public void setEmissiveColor(float[] value) {
		vertex.outbound().setFloat32ArrayField("emissiveColor", value);
	}


}
