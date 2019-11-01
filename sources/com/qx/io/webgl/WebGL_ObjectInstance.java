package com.qx.io.webgl;

import java.io.IOException;

import com.qx.maths.affine.MathAffine3D;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class WebGL_ObjectInstance {

	public final static int NB_MODES = 8;

	private MathAffine3D position;

	private String modelId;

	public WebGL_ObjectInstance(MathAffine3D position, String modelId) {
		super();
		this.position = position;
		this.modelId = modelId;
	}



	/**
	 * client-side eval must define: <ul>
	 * <li>var position</li>
	 * <li>var modelId</li>
	 * <li>var modeStyles (String[8][nbRenderables])</li>
	 * <li>var position (float[16])</li>
	 */
	public String writeOutline() throws IOException{


		StringBuilder builder = new StringBuilder();
		// position
		builder.append("var positionCoefficients =");
		write(builder, position);
		builder.append(";\n");

		// model id
		builder.append("var modelId =\""+modelId+"\";\n");

		return builder.toString();
	}



	/**
	 * <p>
	 * 	To be consistent with OpenGL instructions, the matrix is stored as an array in the column major order.
	 * 
	 * 					column 0 :		column 1 :		column 2 :		column 3 :
	 * 
	 * 		line 0 :	c[0]			c[4]			c[8]			c[12]
	 *	 	line 1 :	c[1]			c[5]			c[9]			c[13]
	 * 		line 2 :	c[2]			c[6]			c[10]			c[14]
	 * 		line 3 :	c[3]			c[7]			c[11]			c[15]
	 * 
	 * </p>
	 * 
	 * @param writer
	 * @param affine
	 * @throws IOException 
	 */
	public static void write(StringBuilder builder, MathAffine3D affine) throws IOException{
		double[] coefficients = new double[12];

		affine.getCoefficient(coefficients, 0);

		builder.append("[");
		for(int i=0; i<12; i++){
			if(i>0){
				builder.append(",");
			}
			builder.append(Double.toString(coefficients[i]));
		}
		builder.append("]");
	}
	
	
	public static void write(StringBuilder builder, String[][] values) throws IOException{
		builder.append("[");
		int n0 = values.length, n1;
		boolean isStarted0 = false, isStarted1;
		for(int i0=0; i0<n0; i0++){
			if(isStarted0){
				builder.append(",");
			}
			else{
				isStarted0 = true;
			}
			builder.append("[");
			n1 = values[i0].length;
			isStarted1 = false;
			for(int i1=0; i1<n1; i1++){
				if(isStarted1){
					builder.append(",");
				}
				else{
					isStarted1 = true;
				}
				builder.append('\"'+values[i0][i1]+'\"');
			}
			builder.append("]");
		}
		builder.append("]");
	}

}

