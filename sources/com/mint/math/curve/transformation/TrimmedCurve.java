package com.mint.math.curve.transformation;

import com.mint.math.curve.Curve;
import com.qx.maths.Vd;

public class TrimmedCurve extends Curve {

	private Curve curve;
	
	public TrimmedCurve(Curve curve, double s0, double s1) {
		super(s0, s1);
		this.curve = curve;
	}
	
	@Override
	public Vd point(double u) throws Exception {
		return curve.point(u);
	}

}
