package com.mint.math.curve.tesselator;

import com.mint.math.curve.Curve;
import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_PolyLine;
import com.qx.lang.joos.annotation.JOOS_Input;
import com.qx.lang.joos.annotation.JOOS_Object;
import com.qx.maths.Vd;


@JOOS_Object(name="Curvature-based Curve Tesselator", sub={})
public class CurvatureBasedCurveTesselator extends CurveTesselator {


	private static final int nbSamplingPoints = 10000;

	private static final double zeroCurvature = 1e-8;
	
	private static final double uniformCurvature = 2*Math.PI/(nbSamplingPoints-1);
	
	private double contrast;

	private double[] cumulatedPointDensity;
	private double xStart, xEnd, dx;

	/**
	 * number of tesselation points
	 */
	private int nbPoints;


	public CurvatureBasedCurveTesselator(){
	}

	public CurvatureBasedCurveTesselator(int nbPoints, double contrast){
		this.nbPoints = nbPoints;
		this.contrast = contrast;
	}

	@Override
	public double[] tesselate(Curve curve) throws Exception {

		// n is the number of sampling points;

		// compute the cumulated point density
		cumulatedPointDensity = new double[nbSamplingPoints];

		xStart = curve.getStartCoordinate();
		xEnd = curve.getEndCoordinate();
		dx = (xEnd - xStart)/(nbSamplingPoints-1);
		
		
		cumulatedPointDensity[0] = 0.0;
		for(int i=0; i<nbSamplingPoints-1; i++){
			cumulatedPointDensity[i+1] = cumulatedPointDensity[i] +
			getCurvature(curve, xStart+i*dx, xStart+(i+1)*dx);
			
			if(Double.isNaN(cumulatedPointDensity[i+1])){
				throw new RuntimeException("Error in computing curvature");
			}
		}

		// normalize the cumulated point density
		double normalizationFactor = cumulatedPointDensity[nbSamplingPoints-1];

		/*
		 *	In the event of a null normalization factor 
		 */
		if(normalizationFactor<zeroCurvature){
			cumulatedPointDensity = new double[2];
			cumulatedPointDensity[0]=0.0;
			cumulatedPointDensity[1]=1.0;
			nbPoints = 2;
			dx = 1.0;
		}

		/*
		 *	In the event of a non-null normalization factor 
		 */
		else{
			// re-normalization
			for(int i=0; i<nbSamplingPoints; i++){
				cumulatedPointDensity[i] = cumulatedPointDensity[i]/normalizationFactor;
			}
		}


		double[] knots = new double[nbPoints];

		double dy = 1.0/(nbPoints-1);
		for(int i=0; i<nbPoints; i++){

			// force start and end coordinates
			if(i==0){
				knots[i] = xStart;
			}
			else if(i==nbPoints-1){
				knots[i] = xEnd;
			}
			else{
				knots[i] = inverseCumulatedCurvature(i*dy);
			}
		}

		return knots;
	}



	private double getCurvature(Curve curve, double s0, double s1) throws Exception{
		double cosAngle = curve.tangent(s0).dot(curve.tangent(s1));
		if(cosAngle>=1){ cosAngle=1;}
		if(cosAngle<=-1){ cosAngle=-1;}
		return uniformCurvature*(1.0-contrast)+ Math.acos(cosAngle)*contrast;
	}
	
	
	
	public void printCumulatedPointDensity(SVG_Canvas canvas){
		int n=cumulatedPointDensity.length-1;

		Vd[] points = new Vd[n];
		double dt = 1.0/(n-1);
		for(int i=0; i<n; i++){
			points[i] = new Vd(i*dt, cumulatedPointDensity[i]);
		}
		canvas.add(new SVG_PolyLine("structure", points));
	}


	protected double inverseCumulatedCurvature(double y){
		int left=0;
		int right=cumulatedPointDensity.length-1;

		int mid;
		while(left+1!=right){
			mid = (int) ((left+right)/2.0);
			if(cumulatedPointDensity[mid]>y){
				right = mid;
			}
			else{
				left = mid;
			}
		}
		return xStart + ((y-cumulatedPointDensity[left])/(cumulatedPointDensity[right]-cumulatedPointDensity[left])+left)*dx;
	}


	@Override
	public int getNumberOfPoints() {
		return nbPoints;
	}
	
	@JOOS_Input(name="nb points")
	public void setNumberOfPoints(int nbPoints) {
		this.nbPoints = nbPoints;
	}

	
	@JOOS_Input(name="contrast")
	public void setContrast(double contrast) {
		this.contrast = contrast;
	}

	





}
