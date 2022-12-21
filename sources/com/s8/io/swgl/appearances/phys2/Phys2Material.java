package com.s8.io.swgl.appearances.phys2;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Material extends NeObject {


	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/phys2/Phys2Material");
	}
	
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Material(NeBranch branch, String typeName) {
		super(branch, typeName);
	}
	
	


	public void setColor(int r, int g, int b, float glossiness) {
		
		float[] specularComponents = new float[] {
				glossiness * (float) (r/255.0f),
				glossiness * (float) (g/255.0f),
				glossiness * (float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("specularColor", specularComponents);

		float[] diffuseComponents = new float[] {
				(1.0f - glossiness) * (float) (r/255.0f),
				(1.0f - glossiness) * (float) (g/255.0f),
				(1.0f - glossiness) * (float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("diffuseColor", diffuseComponents);
	}



	public void setRoughness(double value) {
		vertex.setFloat32("roughness", (float) value);
	}


	public void setSpecularColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("specularColor", values);
	}
	
	public void setSpecularColor(int r, int g, int b, float scalingFactor) {
		float[] values = new float[] {
				(float) (r / 255.0f * scalingFactor),
				(float) (g / 255.0f * scalingFactor),
				(float) (b / 255.0f * scalingFactor),
				1.0f
		};
		vertex.setFloat32Array("specularColor", values);
	}

	public void setSpecularColor(float[] value) {
		vertex.setFloat32Array("specularColor", value);
	}


	public void setDiffuseColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("diffuseColor", values);
	}
	
	public void setDiffuseColor(int r, int g, int b, float scalingFactor) {
		float[] values = new float[] {
				(float) (r / 255.0f * scalingFactor),
				(float) (g / 255.0f * scalingFactor),
				(float) (b / 255.0f * scalingFactor),
				1.0f
		};
		vertex.setFloat32Array("diffuseColor", values);
	}


	public void setDiffuseColor(float[] value) {
		vertex.setFloat32Array("diffuseColor", value);
	}


	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int r, int g, int b) {
		float[] values = new float[] {
				(float) (r/255.0f),
				(float) (g/255.0f),
				(float) (b/255.0f),
				1.0f
		};
		vertex.setFloat32Array("emissiveColor", values);
	}
	

	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 */
	public void setEmissiveColor(int r, int g, int b, float scalingFactor) {
		float[] values = new float[] {
				(float) (r / 255.0f * scalingFactor),
				(float) (g / 255.0f * scalingFactor),
				(float) (b / 255.0f * scalingFactor),
				1.0f
		};
		vertex.setFloat32Array("emissiveColor", values);
	}


	/**
	 * 
	 * @param value
	 */
	public void setEmissiveColor(float[] value) {
		vertex.setFloat32Array("emissiveColor", value);
	}


}
