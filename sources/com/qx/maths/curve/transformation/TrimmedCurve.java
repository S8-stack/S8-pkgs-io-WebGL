package com.qx.maths.curve.transformation;

import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;

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
