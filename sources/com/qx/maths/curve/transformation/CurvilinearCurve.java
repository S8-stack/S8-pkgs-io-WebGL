package com.qx.maths.curve.transformation;

import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_Circle;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;
import com.qx.maths.curve.CurveDrawable;
import com.qx.maths.curve.primitive.CubicCurve;
import com.qx.maths.curve.tesselator.UniformCurveTesselator;
import com.qx.maths.function.Function;
import com.qx.maths.function.integrator.LinearIntegrator;


public class CurvilinearCurve extends Curve {

	private Curve baseCurve;

	private LinearIntegrator curvilinearCoordinate;

	public CurvilinearCurve(Curve curve2d) throws Exception{
		baseCurve = curve2d;

		curvilinearCoordinate = new LinearIntegrator(
				new Function() {
					public @Override double evaluate(double x) throws Exception { return baseCurve.derivative(x).norm(); }
					public @Override double getStartCoordinate(){ return baseCurve.getStartCoordinate(); }
					public @Override double getEndCoordinate(){ return baseCurve.getEndCoordinate();
					}
				},
				1000);
	}


	@Override
	public Vd point(double u) throws Exception {
		return baseCurve.point(curvilinearCoordinate.inverse(u));
	}


	@Override
	public Vd derivative(double u) throws Exception {
		return baseCurve.tangent(curvilinearCoordinate.inverse(u));
	}


	/**
	 * 
	 * @return the start coordinate
	 */
	@Override
	public double getStartCoordinate(){
		return curvilinearCoordinate.getStartValue();
	}

	/**
	 * 
	 * @return the end coordinate
	 */
	@Override
	public double getEndCoordinate(){
		return curvilinearCoordinate.getEndValue();
	}
	
	@Override
	public double length(){
		return getEndCoordinate();
	}



	public static void main(String[] args) throws Exception{
		CubicCurve curve = CubicCurve.interpolate2p2d(0, 1,
				new Vd(0,0),
				new Vd(4, 0),
				Vd.cylindricalRadial2D(6.0, Math.PI/180.0*45.0),
				Vd.cylindricalRadial2D(3.0, -Math.PI/180*25));

		Curve curvilinear = curve.curvilinear();
		SVG_Canvas canvas = new SVG_Canvas();
		
		CurveDrawable drawable = new CurveDrawable(curve);
		drawable.tesselator = new UniformCurveTesselator(1000);
		drawable.draw(canvas);

		int n=10;
		double s0 = curvilinear.getStartCoordinate(), s1 = curvilinear.getEndCoordinate(), ds = (s1-s0)/(n-1);
		for(int i=0; i<n; i++){
			canvas.add(new SVG_Circle("structure", curvilinear.point(s0+i*ds), 0.01));
		}

		canvas.print("output/mesh/curvilinear.svg");
	}

}
