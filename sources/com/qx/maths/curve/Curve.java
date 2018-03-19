package com.qx.maths.curve;


import com.qx.maths.Ad;
import com.qx.maths.Md;
import com.qx.maths.Vd;
import com.qx.maths.curve.tesselator.CurveTesselator;
import com.qx.maths.curve.transformation.AffineTransformedCurve;
import com.qx.maths.curve.transformation.CurvilinearCurve;
import com.qx.maths.curve.transformation.RescaledCurve;



/**
 * Fd1xN
 * 
 * @author pc
 *
 */
public abstract class Curve {


	/**
	 * discretization step
	 */
	private double h = 1e-7;
	
	
	/**
	 * discretization step for second derivative
	 */
	private double h2 = 1e-4;


	/**
	 * s0
	 */
	private double s0;
	
	
	/**
	 * s1
	 */
	private double s1;

	


	public Curve() {
		super();
	}


	public Curve(double s0, double s1) {
		super();
		this.s0 = s0;
		this.s1 = s1;
	}


	/**
	 * 
	 * @return the start coordinate
	 */
	public double getStartCoordinate(){
		return s0;
	}

	public void setStartCoordinate(double s0){
		this.s0 = s0;
	}
	

	public void setDifferentiationStep(double h){
		this.h = h;
	}


	/**
	 * 
	 * @return the end coordinate
	 */
	public double getEndCoordinate(){
		return s1;
	}


	public void setEndCoordinate(double s1){
		this.s1 = s1;
	}


	public Vd getStartPoint() throws Exception{
		return point(getStartCoordinate());
	}

	public Vd getEndPoint() throws Exception{
		return point(getEndCoordinate());
	}


	public Vd getStartDerivative() throws Exception{
		return derivative(getStartCoordinate());
	}


	public Vd getEndDerivative() throws Exception{
		return derivative(getEndCoordinate());
	}


	/**
	 * 
	 * @param u : coordinate on the curve. This parameter should be within range [startCoordinate, endCoordinate].
	 * @return
	 * @throws Exception 
	 */
	public abstract Vd point(double u) throws Exception;

	/**
	 * 
	 * @param u : coordinate on the curve. This parameter should be within range [startCoordinate, endCoordinate].
	 * @return
	 * @throws Exception 
	 */
	public Vd derivative(double u) throws Exception{
		if(u+h<getEndCoordinate()){
			return point(u).derivate(point(u+h), h);
		}
		else{
			return point(u).derivate(point(u-h), -h);
		}
	}

	/**
	 * 
	 * @param u
	 * @return
	 * @throws Exception
	 */
	public Vd derivative2(double u) throws Exception{
		if(u-h2>getStartCoordinate() && u+h2<getEndCoordinate()){
			Vd[] evals = new Vd[3];
			evals[0] = point(u-h2);
			evals[1] = point(u);
			evals[2] = point(u+h2);
			Vd weights = new Vd(1, -2, 1).scale(1.0/(h2*h2));
			return weights.combine(evals);
		}
		else{
			throw new RuntimeException("Second derivative caanot be computed near start or end point");
		}
	}
	

	/**
	 * Normalized
	 * @throws Exception 
	 */
	public Vd tangent(double u) throws Exception{
		return derivative(u).normalize();
	}


	/**
	 * 
	 * @param u
	 * @return
	 * @throws Exception
	 */
	public double curvature2D(double u) throws Exception{
		Vd d = derivative(u);
		Vd d2 = derivative2(u);
		return (d.get(0)*d2.get(1) - d.get(1)*d2.get(0))/Math.pow(d.squareNorm(), 3.0/2.0);
	}

	
	/**
	 * @param u
	 * @return
	 * @throws Exception
	 */
	public Ad affine2D(double u) throws Exception{
			return new Ad(point(u), Md.reference2D(tangent(u)));
		}



	/**
	 * 
	 * @param sketch2d
	 * @param n
	 * @throws Exception 
	 */
	/*
	public void write(SW_Sketch2d sketch2d, int n) throws Exception{
		double s0 = getStartCoordinate(), s1=getEndCoordinate(), ds = (s1-s0)/(n-1);
		SW_Curve2d curve = new SW_Curve2d();
		for(int i=0; i<n; i++){
			curve.add(point(s0 + i*ds));
		}
		sketch2d.add(curve);
	}
	*/
	

	
	
	public Vd[] getPoints(double[] coordinates) throws Exception{
		int n = coordinates.length;
		Vd[] points = new Vd[n];
		for(int i=0; i<n; i++){
			points[i] = point(coordinates[i]);
		}
		return points;
	}
	

	public Vd[] getPoints(CurveTesselator tesselator) throws Exception{
		return getPoints(tesselator.tesselate(this));
	}
	
	
	/*
	 * Operations
	 */
	

	/**
	 * 
	 * @param affine
	 * @return
	 */
	public Curve transform(Ad affine){
		return new AffineTransformedCurve(affine, this);
	}
	
	
	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	public Curve curvilinear() throws Exception{
		return new CurvilinearCurve(this);
	}
	
	
	
	public Curve rescale(double x0, double x1){
		return new RescaledCurve(this, x0, x1);
	}

	

	
	private int nbPointsForlengthCalculation = 1000;

	/**
	 * Change the number of points use to compute curve length
	 * 
	 * @param nbPointsForlengthCalculation
	 */
	public void setLengthCalculationNumberOfpoints(int nbPointsForlengthCalculation){
		this.nbPointsForlengthCalculation = nbPointsForlengthCalculation;
	}


	/**
	 * compute curve length
	 * @return
	 * @throws Exception 
	 */
	public double length() throws Exception{
		double s0 = getStartCoordinate(), s1=getEndCoordinate(), ds = (s1-s0)/(nbPointsForlengthCalculation-1), length = 0;
		Vd p0, p1;
		p0 = point(s0);
		for(int i=1; i<nbPointsForlengthCalculation; i++){
			p1 = point(s0 + i*ds);
			length += p0.distance(p1);
			p0 = p1;
		}
		return length;
	}


}
