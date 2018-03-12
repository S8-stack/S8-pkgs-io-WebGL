package com.mint.math.curve.transformation;

import com.mint.math.curve.Curve;
import com.qx.maths.Vd;

public class ReversedCurve extends Curve {
	
	
	
	private Curve curve;
	
	
	public ReversedCurve(Curve curve){
		super(curve.getStartCoordinate(), curve.getEndCoordinate());
		this.curve = curve;
	}
	
	public double reverse(double coordinate){
		return curve.getEndCoordinate()-(coordinate-curve.getStartCoordinate());
	}
	

	@Override
	public Vd point(double u) throws Exception {
		return curve.point(reverse(u));
	}
	
	@Override
	public Vd derivative(double u) throws Exception {
		return curve.derivative(reverse(u)).opposite();
	}
	
	@Override
	public Vd derivative2(double u) throws Exception {
		return curve.derivative2(reverse(u));
	}

}
