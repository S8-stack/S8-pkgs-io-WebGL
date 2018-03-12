package com.mint.math.curve.primitive;


import com.mint.math.curve.Curve;
import com.qx.maths.Vd;


public class CircleCurve2d extends Curve {

	
	/**
	 * 
	 */
	private double radius;


	/**
	 * 
	 * @param radius
	 * @param theta1
	 * @param theta2
	 */
	public CircleCurve2d(double radius, double theta1, double theta2) {
		super();
		setStartCoordinate(theta1);
		setEndCoordinate(theta2);
		this.radius = radius;
	}
	
	
	@Override
	public Vd point(double theta) {
		return Vd.cylindricalRadial2D(radius, theta);
	}
	

	@Override
	public Vd derivative(double theta) {
		return new Vd(-radius*Math.sin(theta), radius*Math.cos(theta));
	}

	
	@Override
	public Vd tangent(double theta) {
		return new Vd(-Math.sin(theta), Math.cos(theta));
	}
	
	@Override
	public double length() {
		return radius*(getEndCoordinate() - getStartCoordinate());
	}
	
}
