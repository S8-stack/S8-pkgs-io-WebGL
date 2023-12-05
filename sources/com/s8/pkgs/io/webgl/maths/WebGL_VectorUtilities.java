package com.s8.pkgs.io.webgl.maths;

public class WebGL_VectorUtilities {


	
	
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
