package com.mint.math.curve.primitive;


import com.mint.math.curve.Curve;
import com.qx.maths.Md;
import com.qx.maths.Vd;



/**
 * 
 * @author pc
 *
 */
public class CubicCurve extends Curve {
	
	
	/**
	 * Each rows is the list of coefficients for (X3, X2, X, 1).
	 * To find the coefficient of the curve point at X, do: <code> coefficients.rows[i].dot(new Vd(X3,X2, X, 1)) </code>;
	 */
	private Md coefficients;

	
	
	

	/**
	 * 
	 * @param x0
	 * @param x1
	 * @param a
	 * @param b
	 * @param c
	 * @param d
	 */
	private CubicCurve(double s0, double s1, Md coefficients){
		super(s0, s1);
		this.coefficients = coefficients;
	}
	
	
	
	
	public static CubicCurve interpolate2p2d(double s0, double s1, Vd p0, Vd p1, Vd d0, Vd d1){
		
		int dimension = p0.getDimension();
		
		double s02 = s0*s0, s03 = s02*s0;
		double s12 = s1*s1, s13 = s12*s1;
		
		Md matrix = Md.rows(
				new Vd(s03, s02, s0, 1.0),
				new Vd(s13, s12, s1, 1.0),
				new Vd(3.0*s02, 2.0*s0, 1.0, 0.0),
				new Vd(3.0*s12, 2.0*s1, 1.0, 0.0));
		
		Vd[] coefficients = new Vd[dimension];
		for(int i=0; i<dimension; i++){
			coefficients[i] = matrix.solve(new Vd(p0.get(i), p1.get(i), d0.get(i), d1.get(i)));		
		}
		
		return new CubicCurve(s0, s1, Md.rows(coefficients));
	}
	
	
	public static CubicCurve interpolate_4p(
			double s0,
			double s1,
			double s2,
			double s3,
			Vd p0,
			Vd p1,
			Vd p2,
			Vd p3){

		double s0p2 = s0*s0, s0p3 = s0p2*s0;
		double s1p2 = s1*s1, s1p3 = s1p2*s1;
		double s2p2 = s2*s2, s2p3 = s2p2*s2;
		double s3p2 = s3*s3, s3p3 = s3p2*s3;
		
		Md matrix = Md.rows(
				new Vd(s0p3, s0p2, s0, 1.0),
		new Vd(s1p3, s1p2, s1, 1.0),
		new Vd(s2p3, s2p2, s2, 1.0),
		new Vd(s3p3, s3p2, s3, 1.0));
		

		int dimension = p0.getDimension();
		Vd[] coefficients = new Vd[dimension];
		for(int i=0; i<dimension; i++){
			coefficients[i] = matrix.solve(new Vd(p0.get(i), p1.get(i), p2.get(i), p3.get(i)));		
		}
		
		// y
		return new CubicCurve(s0, s1, Md.rows(coefficients));
	}
	
	
	@Override
	public Vd point(double s) {
		double s2=s*s, s3=s2*s;
		return coefficients.multiply(new Vd(s3, s2, s, 1.0));
	}
	
	
	@Override
	public Vd derivative(double s) {
		double s2=s*s;
		return coefficients.multiply(new Vd(3.0*s2, 2.0*s, 1.0, 0.0));
	}
	
	
	@Override
	public Vd derivative2(double s) {
		return coefficients.multiply(new Vd(6.0*s, 2.0, 0.0, 0.0));
	}
	
}
