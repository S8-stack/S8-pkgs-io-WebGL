package com.qx.maths.surface;

import com.qx.maths.Md;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;




public class RevolutionSurface extends Surface {

	protected double theta0, theta1;
	
	protected Curve sectionCurve;
	
	
	/**
	 * @param theta0
	 * @param theta1
	 * @param section
	 */
	public RevolutionSurface(Curve sectionCurve, double theta0, double theta1) {
		super();
		this.theta0 = theta0;
		this.theta1 = theta1;
		this.sectionCurve = sectionCurve;
	}
	
	public Curve getSectionCurve() {
		return sectionCurve;
	}

	@Override
	public double getUStartCoordinate() {
		return sectionCurve.getStartCoordinate();
	}

	@Override
	public double getUEndCoordinate() {
		return sectionCurve.getEndCoordinate();	
	}
	
	@Override
	public double getVStartCoordinate() {
		return theta0;
	}

	@Override
	public double getVEndCoordinate() {
		return theta1;
	}

	@Override
	public Vd point(double u, double theta) throws Exception {
		Vd p = sectionCurve.point(u);
		return Md.xRotationMatrix3D(theta).multiply(new Vd(p.get(0), p.get(1), 0));
	}

}
