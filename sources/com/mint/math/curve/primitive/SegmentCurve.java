package com.mint.math.curve.primitive;

import com.mint.math.curve.Curve;
import com.qx.maths.Vd;


public class SegmentCurve extends Curve {

	/**
	 * 
	 */
	private double length;
	
	/**
	 * starting point
	 */
	private Vd p;

	/**
	 * direction unit vector
	 */
	private Vd u; 
	
	
	/**
	 * 
	 * @param p0
	 * @param p1
	 */
	public SegmentCurve(Vd point1, Vd point2) {
		super();
		this.p = point1;
		Vd u = point2.substract(point1);
		length=u.norm();
		this.u = u.normalize();
	}

	

	@Override
	public double getStartCoordinate() {
		return 0.0;
	}

	@Override
	public double getEndCoordinate() {
		return length;
	}

	@Override
	public Vd point(double s) {
		return p.integrate(u, s);
	}

	@Override
	public Vd derivative(double s) {
		return u;
	}

	@Override
	public Vd tangent(double theta) {
		return u;
	}

	@Override
	public double length() {
		return length;
	}

}
