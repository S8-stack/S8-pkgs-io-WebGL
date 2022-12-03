package com.s8.io.swgl.maths;

public interface SWGL_Vector {

	
	
	/**
	 * 
	 * @return
	 */
	public float getFloat(int index);
	
	
	/**
	 * First component. Equivalent to <code>get(0)</code>
	 * @return
	 */
	public float getXFloat();
	
	
	/**
	 * Coefficient 2. Equivalent to <code>get(1)</code>
	 * @return
	 */
	public float getYFloat();
	
	
	/**
	 * Coefficient 3. Equivalent to <code>get(2)</code>
	 * @return
	 */
	public float getZFloat();
	
	
	/**
	 * Coefficient 4. Equivalent to <code>get(3)</code>
	 * @return
	 */
	public float getAFloat();
	
	
	
	public int getDimension();
	
	
	public float[] toFloatArray();
	
	
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
