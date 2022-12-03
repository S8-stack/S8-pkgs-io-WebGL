package com.s8.ng.geo.nebulae.utilities;

public class NbUtilities {

	
	
	/**
	 * 
	 * @param array
	 * @return
	 */
	public static float[] toFloatArray(double[] array) {
		int length = array.length;
		float[] components = new float[length];
		for(int i=0; i<length; i++) { components[i] = (float) array[i]; }
		return components;
	}
}
