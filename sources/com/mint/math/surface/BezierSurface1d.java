package com.mint.math.surface;

import com.qx.maths.Vd;
import com.qx.maths.function.primitive.Polynom;





public class BezierSurface1d extends Surface {

	
	public enum Location{
		 x0y0, x1y0, x0y1, x1y1;
	}
	

	private final static double[] Bez0_coefficients = {1, 0, -3, 2};
	public final static Polynom Bez0 = new Polynom(Bez0_coefficients);

	private final static double[] Bez0d_coefficients = {0, 1, -2, 1};
	public final static Polynom Bez0d = new Polynom(Bez0d_coefficients);

	private final static double[] Bez1_coefficients = {0, 0, 3, -2};
	public final static Polynom Bez1 = new Polynom(Bez1_coefficients);

	private final static double[] Bez1d_coefficients = {0, 0, -1, 1};
	public final static Polynom Bez1d = new Polynom(Bez1d_coefficients);


	// texture coordinates
	protected double uStartTexCoord = 0.0, uDeltaTexCoord;
	protected double vStartTexCoord = 0.0, vDeltaTexCoord;

	
	protected Vd[] controlVectors;

	/**
	 * 
	 * @param vectors :
	 * 
	 * [points]
	 * 
	 * controlVectors[0] : point x=0 y=0
	 * controlVectors[1] : point x=1 y=0
	 * controlVectors[2] : point x=0 y=1
	 * controlVectors[3] : point x=1 y=1
	 * 
	 * 
	 * [xTangent]
	 * 
	 * controlVectors[4] : xTangent x=0 y=0
	 * controlVectors[5] : xTangent x=1 y=0
	 * controlVectors[6] : xTangent x=0 y=1
	 * controlVectors[7] : xTangent x=1 y=1
	 */
	public BezierSurface1d(Vd[] vectors){
		super();
		controlVectors = vectors;
		initialize();
	}
	
	
	/**
	 * 
	 */
	public BezierSurface1d(){
		super();
		controlVectors = new Vd[8];
		initialize();
	}

	
	private void initialize(){
	}
	
	public void setPoint(Location location, Vd point){
		controlVectors[0+location.ordinal()] = point;
	}
	
	
	public void setXTangent(Location location, Vd xTangent){
		controlVectors[4+location.ordinal()] = xTangent;
	}
	
	
	
	@Override
	public Vd point(double u, double v) {

		double[] coeff = new double[8];

		// point
		coeff[0] = Bez0.evaluate(u)*(1.0-v);	// x=0 y=0
		coeff[1] = Bez1.evaluate(u)*(1.0-v);	// x=1 y=0
		coeff[2] = Bez0.evaluate(u)*v;			// x=0 y=1
		coeff[3] = Bez1.evaluate(u)*v;			// x=1 y=1

		// x-tangent
		coeff[4] = Bez0d.evaluate(u)*(1.0-v);	// x=0 y=0
		coeff[5] = Bez1d.evaluate(u)*(1.0-v);	// x=1 y=0
		coeff[6] = Bez0d.evaluate(u)*v; 		// x=0 y=1
		coeff[7] = Bez1d.evaluate(u)*v; 		// x=1 y=1

		return linearCombination(coeff);
	}


	@Override
	public Vd uDerivative(double u, double v) {

		double[] coeff = new double[8];

		// point
		coeff[0] = Bez0.derivate(u)*(1.0-v);		// x=0 y=0
		coeff[1] = Bez1.derivate(u)*(1.0-v);		// x=1 y=0
		coeff[2] = Bez0.derivate(u)*v;		// x=0 y=1
		coeff[3] = Bez1.derivate(u)*v;		// x=1 y=1

		// x-tangent
		coeff[4] = Bez0d.derivate(u)*(1.0-v);	// x=0 y=0
		coeff[5] = Bez1d.derivate(u)*(1.0-v);	// x=1 y=0
		coeff[6] = Bez0d.derivate(u)*v; 	// x=0 y=1
		coeff[7] = Bez1d.derivate(u)*v;	// x=1 y=1

		return linearCombination(coeff);
	}
	
	
	@Override
	public Vd uTangent(double u, double v) {
		return uDerivative(u, v).normalize();
	}
	
	
	

	@Override
	public Vd vDerivative(double u, double v) {

		double[] coeff = new double[8];

		// point
		coeff[0] = -Bez0.evaluate(u);		// x=0 y=0
		coeff[1] = -Bez1.evaluate(u);		// x=1 y=0
		coeff[2] = Bez0.evaluate(u);		// x=0 y=1
		coeff[3] = Bez1.evaluate(u);		// x=1 y=1

		// x-tangent
		coeff[4] = -Bez0d.evaluate(u);	// x=0 y=0
		coeff[5] = -Bez1d.evaluate(u);	// x=1 y=0
		coeff[6] = Bez0d.evaluate(u); 	// x=0 y=1
		coeff[7] = Bez1d.evaluate(u); 	// x=1 y=1

		return linearCombination(coeff);
	}

	
	@Override
	public Vd vTangent(double u, double v) {
		return vDerivative(u, v).normalize();
	}
	
	@Override
	public Vd normal(double u, double v) {
		return uDerivative(u, v).vect3(vDerivative(u, v)).normalize();
	}




	private Vd linearCombination(double[] coefficients){
		double x=0;
		double y=0;
		double z=0;

		for(int i=0; i<8; i++){
			x += controlVectors[i].get(0) * coefficients[i];
			y += controlVectors[i].get(1) * coefficients[i];
			z += controlVectors[i].get(2) * coefficients[i];
		}
		return new Vd(x, y, z);
	}

	@Override
	public double getUStartCoordinate() {
		return 0.0;
	}

	@Override
	public double getUEndCoordinate() {
		return 1.0;
	}

	@Override
	public double getVStartCoordinate() {
		return 0.0;
	}

	@Override
	public double getVEndCoordinate() {
		return 1.0;
	}

}
