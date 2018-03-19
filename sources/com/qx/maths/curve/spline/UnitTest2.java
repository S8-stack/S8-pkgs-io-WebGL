package com.qx.maths.curve.spline;

import javax.xml.bind.JAXBException;

import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_Circle;
import com.qx.io.svg.SVG_Line;
import com.qx.io.svg.SVG_PolyLine;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;
import com.qx.maths.curve.tesselator.CurvatureBasedCurveTesselator;
import com.qx.maths.curve.tesselator.CurveTesselator;


public class UnitTest2 {



	public static void main(String[] args) throws JAXBException, Exception{
		new UnitTest2().test_Interpolation01();
	}

	
	private Curve NACA_profile = new NACAProfileCurve(10, 0.12, 0.15, 0.4);

	private UniformCubicBSplineCurve bSpline;

	private double[] tesselationKnots;

	private int ntk;

	private Curve curve;

	private SVG_Canvas canvas;


	private void test_Interpolation01() throws JAXBException, Exception {

		curve = NACA_profile;
		setup();

		Vd[] interpolatedVectors = new Vd[ntk+2];

		interpolatedVectors[0] = curve.point(tesselationKnots[0]);
		
		Vd sd = curve.derivative(tesselationKnots[0]);
		interpolatedVectors[1] = sd;
		//interpolatedVectors[1] = new Vd(2);
		
		for(int i=1; i<ntk-1; i++){
			interpolatedVectors[i+1] = curve.point(tesselationKnots[i]);
		}

		
		Vd ed = curve.derivative(tesselationKnots[ntk-1]);
		interpolatedVectors[ntk] = ed;
		//interpolatedVectors[ntk] = new Vd(2);
		
		interpolatedVectors[ntk+1] = curve.point(tesselationKnots[ntk-1]);

		bSpline = new UniformCubicBSplineCurve();
		bSpline.interpolate(interpolatedVectors, 1);

		/*
		for(int i=0; i<ntk; i++){
			System.out.println(i+">\t"+bSpline.evaluateFunctions(i).toString());
		}
		System.out.println("End>\t"+bSpline.evaluateFunctions(bSpline.getEndCoordinate()).toString());
		*/
		
		
		// Check derivative
		for(int i=0; i<10; i++){
			double x = 30*Math.random();
			Vd der1 = bSpline.derivative(x, 2);
			Vd der2 = bSpline.derivative2(x);
			double error = der1.substract(der2).norm();
			System.out.println("error derivative 2= "+error);
		}
		
		System.out.println("bspline first derivtaive at s=0 "+bSpline.derivative(0, 1));
		System.out.println("curve first derivtaive at s=0 "+curve.derivative(0));
		
		System.out.println("bspline first derivtaive at s=1 "+bSpline.derivative(1.0));
		System.out.println("curve first derivtaive at s=1 "+curve.derivative(1.0));
		
		drawBSpline();
	}



	private void drawBSpline() throws JAXBException, Exception{

		double tStart = bSpline.getStartCoordinate();
		double tEnd = bSpline.getEndCoordinate();

		/*
		 * Draw interpolated curve
		 */
		
		int n = 1000;
		double dt = (tEnd-tStart)/(n-1);
		Vd[] curvePoints = new Vd[n];
		for(int i=0; i<n; ++i){
			curvePoints[i] = bSpline.point(tStart + i*dt);
			//canvas.add(new SVG_Circle("spot2", curvePoints[i], 0.02));
		}
		canvas.add(new SVG_PolyLine("structure", curvePoints));

		/*
		 * Draw tangents
		 */
		/*
		n = 10;
		dt = (tEnd-tStart)/(n-1);
		double s;
		for(int i=0; i<n; ++i){
			s = tStart + i*dt;
			p0 = profile.point(s);
			p1 = p0.integrate(profile.derivative(s, 1), 2.0);
			canvas.add(new SVGLine("dashed", p0, p1));
		}
		 */


		Vd[] controlPoints = bSpline.getControlPoints();
		int nbControlPoints = controlPoints.length;
		for(int i=0; i<nbControlPoints; ++i){
			canvas.add(new SVG_Circle("point", controlPoints[i], 0.02));
		}

		canvas.print("output/mesh/NACAinterpolated_v3.svg");
	}






	private void setup() throws Exception{
		Vd[] curvePoints;
		double tStart, dt;

		

		int np = 1000;

		tStart = curve.getStartCoordinate();
		dt = (curve.getEndCoordinate()-tStart)/(np-1);

		canvas = new SVG_Canvas();

		/*
		 * Draw continuous profile
		 */
		curvePoints = new Vd[np];
		for(int i=0; i<np; ++i){
			curvePoints[i] = curve.point(tStart + i*dt);
		}
		canvas.add(new SVG_PolyLine("dashed", curvePoints));

		/*
		 * Draw tangent
		 */
		Vd p0 = curve.point(curve.getStartCoordinate());
		Vd p1 = p0.integrate(curve.derivative(curve.getStartCoordinate()), 2.0);
		canvas.add(new SVG_Line("dashed", p0, p1));

		CurveTesselator curve2dTesselator = new CurvatureBasedCurveTesselator(40, 0.6);


		tesselationKnots = curve2dTesselator.tesselate(curve);
		//curve2dTesselator.printCumulatedPointDensity(canvas);

		for(double x : tesselationKnots){
			canvas.add(new SVG_Circle("structure", curve.point(x), 0.04));
		}

		ntk = tesselationKnots.length;
		System.out.println("Number of tesselation knots = "+ntk);
	}
	
}
