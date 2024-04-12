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
	
	
	public static Phys2Material create(S8WebFront front,
			int[] emissiveColor,
			int[] diffuseColor,
			int[] specularColor,
			double roughness) {
		Phys2Material material = new Phys2Material(front);
		material.setEmissiveColor(emissiveColor);
		material.setDiffuseColor(diffuseColor);
		material.setSpecularColor(specularColor);
		material.setRoughness(roughness);
		return material;
	}


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
	 * @param front
	 * @param typeName
	 */
	public Phys2Material(S8WebFront front) {
		super(front, WebSources.ROOT+"scene/pipes/phys2/Phys2Material");
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
	 * @param scalingFactor
	 */
	public void setSpecularColor(int[] color) {
		vertex.outbound().setUInt8ArrayField("specularColor", color);
	}
	
	
	
	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 * @param scalingFactor
	 */
	public void setDiffuseColor(int[] color) {
		vertex.outbound().setUInt8ArrayField("diffuseColor", color);
	}



	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int[] color) {
		vertex.outbound().setUInt8ArrayField("emissiveColor", color);
	}
	

}
