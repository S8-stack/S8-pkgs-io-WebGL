package com.s8.pkgs.io.webgl.utilities;


/**
 * Color is defined as a int[] of length equals to four, where:
 * <ul>
 * <li>Red component (in the range [0, 0xff=255])</li>
 * <li>Green component (in the range [0, 0xff=255])</li>
 * <li>Blue component (in the range [0, 0xff=255])</li>
 * <li>Alpha component (in the range [0, 0xff=255])</li>
 * </ul>
 */
public class SWGL_Color {


	public final static int MAX_VAL = 0xff;

	
	/**
	 * 
	 * @param r
	 * @param g
	 * @param b
	 * @param scalingFactor
	 * @param alpha
	 * @return
	 */
	public static int[] fromRGBSA(int r, int g, int b, double scalingFactor, double alpha) {
		return fromRGBA(
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				(int) (MAX_VAL * alpha));
	}


	/**
	 * 
	 * @param red
	 * @param green
	 * @param blue
	 * @param alpha
	 * @return
	 */
	public static int[] fromRGBS(int r, int g, int b, float scalingFactor) {
		return fromRGBA(
				(int) (r * scalingFactor),
				(int) (g * scalingFactor),
				(int) (b * scalingFactor),
				MAX_VAL);
	}


	/**
	 * 
	 * @param red
	 * @param green
	 * @param blue
	 * @param alpha
	 * @return
	 */
	public static int[] fromRGBA(int red, int green, int blue, int alpha) {
		int[] color = new int[4];
		color[0] = Math.min(red, MAX_VAL);
		color[1] = Math.min(green, MAX_VAL);
		color[2] = Math.min(blue, MAX_VAL);
		color[3] = Math.min(alpha, MAX_VAL);
		return color;
	}
	
	/**
	 * 
	 * @param red
	 * @param green
	 * @param blue
	 * @param alpha
	 * @return
	 */
	public static int[] fromRGBA(int red, int green, int blue, float alpha) {
		return fromRGBA(red, green, blue, (int) (alpha * MAX_VAL));
	}

}
