package com.qx.maths.curve.transformation;


import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;

public class CompoundCurve extends Curve {
	
	
	/**
	 * 
	 */
	private int nbCurves;
	
	/**
	 * sub curves
	 */
	private Curve[] curves;

	/** 
	 * definition bounds
	 */
	private double[] definitionBounds;
	
	
	
	/**
	 * 
	 * @param curves
	 * @return
	 */
	public static CompoundCurve raw(Curve... curves){
		return new CompoundCurve(curves);
	}
	
	
	/**
	 * 
	 * @param curves
	 * @return
	 * @throws Exception
	 */
	public static CompoundCurve rescaled(Curve... curves) throws Exception{
		int n = curves.length;
		
		Curve[] rescaledCurves = new Curve[n];
		rescaledCurves[0] = curves[0];
		double upstreamVelocity, downstreamVelocity;

		for(int i=1; i<n; i++){
			upstreamVelocity = rescaledCurves[i-1].getEndDerivative().norm();
			downstreamVelocity = curves[i].getStartDerivative().norm();
			rescaledCurves[i] = RescaledCurve.scale(curves[i], upstreamVelocity/downstreamVelocity);
		}
		return new CompoundCurve(rescaledCurves);
	}
	

	
	/**
	 * @param curves
	 */
	private CompoundCurve(Curve... curves) {
		super();
		this.curves = curves;
		
		nbCurves = curves.length;

		definitionBounds = new double[nbCurves+1];
		definitionBounds[0]=0.0;

		double deltaCoordinate;
		for(int i=0; i<nbCurves; i++){
			deltaCoordinate = curves[i].getEndCoordinate() - curves[i].getStartCoordinate();
			definitionBounds[i+1] = definitionBounds[i]+deltaCoordinate;
		}
	}

	

	private int getInterval(double t){
		int left=0;
		int right=definitionBounds.length-1;

		while(left!=right-1){
			int mid = (int) ((left+right)/2.0);
			if(definitionBounds[mid]>t){
				right = mid;
			}
			else{
				left = mid;
			}	
		}
		return left;
	}


	
	
	public int getNumberOfSubCurves(){
		return nbCurves;
	}
	
	public double getSubCurveBoundCoordinate(int index){
		return definitionBounds[index];
	}
	
	
	/**
	 * By definition, start coordinate is 0
	 */
	@Override
	public double getStartCoordinate() {
		return 0;
	}

	/**
	 * The total length (coordinate-wise) is the sum of sub-curves lengths
	 */
	@Override
	public double getEndCoordinate() {
		return definitionBounds[nbCurves];
	}
	
	
	/**
	 * By definition, start coordinate is 0
	 * @throws Exception 
	 */
	@Override
	public Vd getStartPoint() throws Exception {
		return curves[0].getStartPoint();
	}

	/**
	 * The total length (coordinate-wise) is the sum of sub-curves lengths
	 * @throws Exception 
	 */
	@Override
	public Vd getEndPoint() throws Exception {
		return curves[nbCurves-1].getEndPoint();
	}

	
	@Override
	public Vd point(double s) throws Exception {
		int index = getInterval(s);
		s = s - definitionBounds[index] + curves[index].getStartCoordinate();
		return curves[index].point(s);
	}


	@Override
	public Vd derivative(double s) throws Exception {
		int index = getInterval(s);
		s = s - definitionBounds[index] + curves[index].getStartCoordinate();
		return curves[index].derivative(s);
	}


	@Override
	public Vd tangent(double s) throws Exception {
		return derivative(s).normalize();
	}




	@Override
	public double length() throws Exception {
		double length = 0;
		int n = curves.length;
		for(int i=0; i<n; i++){
			length+=curves[i].length();
		}
		return length;
	}

}
