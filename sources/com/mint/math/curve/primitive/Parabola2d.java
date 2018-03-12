package com.mint.math.curve.primitive;

import com.mint.math.curve.Curve;
import com.qx.maths.Vd;

public class Parabola2d extends Curve {

	/**
	 * 
	 */
	private double a;
	
	
	public Parabola2d(double x0, double x1, double a) {
		super(x0, x1);
		this.a = a;
	}

	
	@Override
	public Vd point(double x) throws Exception {
		return new Vd(x, a*x*x);
	}
	
	@Override
	public Vd derivative(double x) throws Exception {
		return new Vd(1.0, 2.0*a*x);
	}
	
	@Override
	public Vd derivative2(double x) throws Exception {
		return new Vd(0.0, 2.0*a);
	}

}
