package com.qx.maths.curve.tesselator;

import com.qx.lang.joos.JOOS_NodeObject;
import com.qx.lang.joos.annotation.JOOS_Object;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;

@JOOS_Object(name="Curve Tesselator", sub={UniformCurveTesselator.class, CurvatureBasedCurveTesselator.class})
public abstract class CurveTesselator extends JOOS_NodeObject {
	
	public abstract double[] tesselate(Curve curve) throws Exception;
	
	public abstract int getNumberOfPoints();

	
	/**
	 * 
	 * @param curve
	 * @return
	 * @throws Exception
	 */
	public Vd[] points(Curve curve) throws Exception{
		int n = getNumberOfPoints();
		double[] coordinates = tesselate(curve);
		Vd[] points = new Vd[n];
		for(int i=0; i<n; i++){
			points[i] = curve.point(coordinates[i]);
		}
		return points;
	}
	
	
	/**
	 * 
	 * @param curve
	 * @return
	 * @throws Exception
	 */
	public Vd[] tangents(Curve curve) throws Exception{
		int n = getNumberOfPoints();
		double[] coordinates = tesselate(curve);
		Vd[] points = new Vd[n];
		for(int i=0; i<n; i++){
			points[i] = curve.tangent(coordinates[i]);
		}
		return points;
	}
	
}
