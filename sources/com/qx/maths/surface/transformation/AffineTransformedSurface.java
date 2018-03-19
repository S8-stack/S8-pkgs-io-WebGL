package com.qx.maths.surface.transformation;


import com.qx.maths.Ad;
import com.qx.maths.Vd;
import com.qx.maths.surface.Surface;


public class AffineTransformedSurface extends Surface {

	/**
	 * sub surface
	 */
	private Surface surface;
	
	private Ad basis;
	

	/**
	 * @param surface
	 * @param basis
	 */
	public AffineTransformedSurface(Surface surface, Ad basis) {
		super();
		this.surface = surface;
		this.basis = basis;
	}
	
	
	
	
	

	@Override
	public Vd point(double u, double v) throws Exception {
		return basis.applyToPoint(surface.point(u, v));
	}
	
	@Override
	public double getUStartCoordinate() {
		return surface.getUStartCoordinate();
	}

	@Override
	public double getUEndCoordinate() {
		return surface.getUEndCoordinate();
	}

	@Override
	public double getVStartCoordinate() {
		return surface.getVStartCoordinate();
	}

	@Override
	public double getVEndCoordinate() {
		return surface.getVEndCoordinate();
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Vd uDerivative(double u , double v) throws Exception{
		return basis.applyToVector(surface.uDerivative(u, v));
	}


	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Vd vDerivative(double u, double v) throws Exception{
		return basis.applyToVector(surface.vDerivative(u, v));
	}


	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Vd normal(double u, double v) throws Exception{
		return basis.applyToNormal(surface.normal(u, v));
	}

}
