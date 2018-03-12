package com.mint.math.curve.transformation;

import com.mint.math.curve.Curve;
import com.qx.maths.Vd;

public class RescaledCurve extends Curve {

	private Curve baseCurve;
	
	private double scalingFactor;
	
	private double offset;
	
	
	/**
	 * 
	 * @param curve
	 * @param scalingFactor
	 * @return
	 */
	public static RescaledCurve scale(Curve curve, double scalingFactor){
		double x0_tilde = curve.getStartCoordinate();
		double x1_tilde = (curve.getEndCoordinate()-curve.getStartCoordinate())/scalingFactor+curve.getStartCoordinate();
		return new RescaledCurve(curve, x0_tilde, x1_tilde);
	}
	
	

	/**
	 * 
	 * @param x0
	 * @param x1
	 */
	public RescaledCurve(Curve baseCurve, double x0_tilde, double x1_tilde){
		setStartCoordinate(x0_tilde);
		setEndCoordinate(x1_tilde);
		
		this.baseCurve = baseCurve;
		
		double x0=baseCurve.getStartCoordinate(), x1=baseCurve.getEndCoordinate();
		scalingFactor = (x1-x0)/(x1_tilde-x0_tilde);
		offset = x0-scalingFactor*x0_tilde;
		
	}

	@Override
	public Vd point(double x_tilde) throws Exception {
		return baseCurve.point(x_tilde*scalingFactor+offset);
	}
	
	@Override
	public Vd derivative(double x_tilde) throws Exception {
		return baseCurve.derivative(x_tilde*scalingFactor+offset).scale(scalingFactor);
	}
}
