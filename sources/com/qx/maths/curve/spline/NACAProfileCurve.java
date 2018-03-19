package com.qx.maths.curve.spline;


import javax.xml.bind.JAXBException;

import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_PolyLine;
import com.qx.maths.Ad;
import com.qx.maths.Md;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;
import com.qx.maths.function.primitive.Polynom;



public class NACAProfileCurve extends Curve {


	/**
	 * Chord length of the airfoil
	 */
	protected double c;


	/**
	 * Maximum thickness as a fraction of the chord
	 */
	protected double t;


	/**
	 * Maximum camber
	 */
	protected double m;


	/**
	 * Location of the maximum camber along the chord line (as a percentage of the chord length)
	 */
	protected double p;


	protected double pc;

	/**
	 * 
	 */
	protected Polynom camberLine1, camberLine2;


	private final static double[] parameters = {0.2969, -0.1260, -0.3516, 0.2843, -0.1015};




	/**
	 * @param c : Chord length of the airfoil
	 * @param t : Maximum thickness as a fraction of the chord
	 * @param m : Maximum camber
	 * @param p : Location of the maximum camber along the chord line (as a percentage of the chord length)
	 */
	public NACAProfileCurve(double c, double t, double m, double p) {
		super();
		this.c = c;
		this.t = t;
		this.m = m;
		this.p = p;

		this.pc = p*c;


		// First part of the camber line
		double[] coefficients1 = new double[3];
		coefficients1[0] = 0;
		coefficients1[1] = 2*m/p;
		coefficients1[2] = -m/(p*p*c);
		camberLine1 = new Polynom(coefficients1);


		// Second part of the camber line
		double f = m/((1-p)*(1-p));
		double[] coefficients2 = new double[3];
		coefficients2[0] = f*c*(1-2*p);
		coefficients2[1] = f*2*p;
		coefficients2[2] = -f/c;
		camberLine2 = new Polynom(coefficients2);
	}

	/**
	 * 
	 * @param x must be within the [0, c] range
	 * @return
	 */
	private double evaluateProfileThickness(double x) {

		// reduced x
		double xr = x/c;

		return t/0.2*c*(
				parameters[0]*Math.sqrt(xr)
				+parameters[1]*xr
				+parameters[2]*Math.pow(xr,2)
				+parameters[3]*Math.pow(xr,3)
				+parameters[4]*Math.pow(xr,4));
	}


	/**
	 * 
	 * @param x must be within the [0, c] range
	 * @return
	 */
	private double evaluateCamberMeanLine(double x) {
		if(x<pc){
			return camberLine1.evaluate(x);
		}
		else{
			return camberLine2.evaluate(x);
		}
	}


	/**
	 * 
	 * @param x must be within the [0, c] range
	 * @return
	 */
	private double evaluateCamberMeanLineDerivative(double x) {
		if(x<pc){
			return camberLine1.derivate(x);
		}
		else{
			return camberLine2.derivate(x);
		}
	}


	protected Vd pointOnProfile(boolean isUpperProfile, double x){

		Ad basis = new Ad(
				// position on the camber line
				new Vd(x, evaluateCamberMeanLine(x)),	
				Md.reference2D(new Vd(1, evaluateCamberMeanLineDerivative(x)).normalize()));


		if(isUpperProfile){
			return basis.applyToPoint(new Vd(0,  evaluateProfileThickness(x)));	
		}
		else{
			return basis.applyToPoint(new Vd(0, -evaluateProfileThickness(x)));
		}
	}


	@Override
	public Vd point(double x) {
		if(x<c) {
			return pointOnProfile(true, c-x);
		}
		else {
			return pointOnProfile(false, x-c);
		}
	}


	@Override
	public double getStartCoordinate() {
		return 0.0;
	}


	@Override
	public double getEndCoordinate() {
		return 2*c;
	}


	public static void main(String[] args) throws JAXBException, Exception {

		NACAProfileCurve profile = new NACAProfileCurve(10, 0.12, 0.08, 0.45);

		int n = 1000;

		double tStart = profile.getStartCoordinate();
		double tEnd = profile.getEndCoordinate();
		double dt = (tEnd-tStart)/(n-1);

		SVG_Canvas canvas = new SVG_Canvas();


		Vd[] curvePoints = new Vd[n];
		for(int i=0; i<n; ++i){
			double x = tStart +i*dt;
			curvePoints[i] = profile.point(x);
		}
		canvas.add(new SVG_PolyLine("structure", curvePoints));

		//canvas.add(new SVG_Line("spot", -10,0,10,0));

		canvas.print("output/mesh/camberLine.svg");
	}

}
