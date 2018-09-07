package com.qx.io.webgl;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.maths.affine.Affine3d;
import com.qx.maths.box.BoundingBox3d;
import com.qx.maths.matrix.SquareMatrix3d;
import com.qx.maths.vector.Vector2d;
import com.qx.maths.vector.Vector3d;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class WebGL_ShapeInstance {

	public final static int NB_MODES = 8;

	private Affine3d position;

	private WebGL_ShapeModel.Build model;

	private String[][] modeStyles;

	public WebGL_ShapeInstance(WebGL_ShapeModel.Build model) {
		super();
		this.model = model;
		this.position = Affine3d.STANDARD;
		this.modeStyles = model.getDefaultModeStyles();
	}



	/**
	 * client-side eval must define: <ul>
	 * <li>var position</li>
	 * <li>var modelId</li>
	 * <li>var modeStyles (String[8][nbRenderables])</li>
	 * <li>var position (float[16])</li>
	 */
	public void writeOutline(Writer writer) throws IOException{


		// position
		writer.append("var position =");
		write(writer, position);
		writer.append(";\n");

		// position
		writer.append("var modelId ="+model.getIdentifier()+";\n");

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
	public static void write(Writer writer, Affine3d affine) throws IOException{
		double[] coefficients = new double[16];

		SquareMatrix3d matrix = affine.getMatrix();

		coefficients[0] = matrix.get(0, 0);
		coefficients[1] = matrix.get(1, 0);
		coefficients[2] = matrix.get(2, 0);
		coefficients[3] = 0.0;

		coefficients[4] = matrix.get(0, 1);
		coefficients[5] = matrix.get(1, 1);
		coefficients[6] = matrix.get(2, 1);
		coefficients[7] = 0.0;

		coefficients[8] = matrix.get(0, 2);
		coefficients[9] = matrix.get(1, 2);
		coefficients[10] = matrix.get(2, 2);
		coefficients[11] = 0.0;

		Vector3d vector = affine.getOrigin();

		coefficients[12] = vector.get(0);
		coefficients[13] = vector.get(1);
		coefficients[14] = vector.get(2);
		coefficients[15] = 0.0;

		writer.append("[");
		for(int i=0; i<16; i++){
			if(i>0){
				writer.append(",");
			}
			writer.append(Double.toString(coefficients[i]));
		}
		writer.append("]");
	}

}

