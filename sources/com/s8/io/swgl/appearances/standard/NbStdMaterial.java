package com.s8.ng.geo.nebulae.appearances.standard;

public enum NbStdMaterial {

	STEEL();
	
	
	
	
	public int diffuseRed;
	
	public int diffuseGreen;
	
	public int diffuseBlue;
	
	
	public int diffuseRed;
	
	public int diffuseGreen;
	
	public int diffuseBlue;
	
	
	public int diffuseRed;
	
	public int diffuseGreen;
	
	public int diffuseBlue;
	
	
	
	
	public void setGlossiness(double value) {
		vertex.setFloat32("glossiness", (float) value);
	}
	
	public void setRoughness(double value) {
		vertex.setFloat32("roughness", (float) value);
	}
	
	public void setSpecularColor(float[] value) {
		vertex.setFloat32Array("specularColor", value);
	}

	public void setDiffuseColor(float[] value) {
		vertex.setFloat32Array("diffuseColor", value);
	}
	
	
	public void setAmbientColor(float[] value) {
		vertex.setFloat32Array("ambientColor", value);
	}
	
	
	
}
