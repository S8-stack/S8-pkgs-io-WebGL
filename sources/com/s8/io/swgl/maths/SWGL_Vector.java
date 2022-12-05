package com.s8.io.swgl.maths;

public class SWGL_Vector {


	
	
	/**
	 * 
	 * @param r
	 * @param phi
	 * @param theta
	 * @return
	 */
	public static float[] sphericalRadial3d(double r, double phi, double theta){
		double x = r*Math.cos(phi)*Math.sin(theta);
		double y = r*Math.sin(phi)*Math.sin(theta);
		double z = r*Math.cos(theta);
		return new float[] { (float) x, (float) y, (float) z };
	}
}
