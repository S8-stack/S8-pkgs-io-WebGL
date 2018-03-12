package com.mint.math.curve.transformation;


import com.mint.math.curve.Curve;
import com.qx.maths.Ad;
import com.qx.maths.Vd;


public class AffineTransformedCurve extends Curve {

	protected Ad basis;

	protected Curve curve;


	/**
	 * @param basis
	 * @param curve
	 */
	public AffineTransformedCurve(Ad basis, Curve curve) {
		super();
		this.basis = basis;
		this.curve = curve;
	}


	@Override
	public double getStartCoordinate() {
		return curve.getStartCoordinate();
	}

	@Override
	public double getEndCoordinate() {
		return curve.getEndCoordinate();
	}

	
	@Override
	public Vd getStartPoint() throws Exception{
		return basis.applyToPoint(curve.getStartPoint());
	}
	
	
	@Override
	public Vd getEndPoint() throws Exception{
		return basis.applyToPoint(curve.getEndPoint());
	}
	
	
	@Override
	public Vd point(double u) throws Exception {
		return basis.applyToPoint(curve.point(u));
	}

	@Override
	public Vd derivative(double u) throws Exception {
		return basis.applyToVector(curve.derivative(u));
	}

	
}
