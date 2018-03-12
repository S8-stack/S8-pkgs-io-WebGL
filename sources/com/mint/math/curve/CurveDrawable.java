package com.mint.math.curve;


import com.mint.math.curve.tesselator.CurveTesselator;
import com.mint.math.curve.tesselator.UniformCurveTesselator;
import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_Circle;
import com.qx.io.svg.SVG_Line;
import com.qx.io.svg.SVG_PolyLine;
import com.qx.maths.Ad;
import com.qx.maths.Vd;



/**
 * Fd1x2 as drawing capabilities
 * 
 * @author pc
 *
 */
public class CurveDrawable {


	/**
	 * reference to the function
	 */
	private Curve function;



	/**
	 * tesselator
	 */
	public CurveTesselator tesselator = new UniformCurveTesselator(100);


	/**
	 * 
	 */
	public String style = "structure";

	public boolean isKnotDrawingActivated = false;
	public double circleRadius = 0.04;
	public boolean isNormalActivated = false;

	public Ad basis = Ad.STANDARD_2D;

	/**
	 * 
	 * @param function
	 */
	public CurveDrawable(Curve function){
		this.function = function;
	}


	/**
	 * 
	 * @param function
	 */
	public CurveDrawable(Curve function, String style){
		this.function = function;
		this.style = style;
	}






	/**
	 * 
	 * @param canvas
	 * @param basis
	 * @param style
	 * @param nbFlowSurfaces
	 * @throws Exception 
	 */
	public void draw(SVG_Canvas canvas) throws Exception{
		double[] coordinates = tesselator.tesselate(function);
		int n = coordinates.length;

		Vd[] points = new Vd[n];
		for(int i=0; i<n; i++){
			points[i] = basis.applyToPoint(function.point(coordinates[i]));
		}

		canvas.add(new SVG_PolyLine(style, points));

		if(isKnotDrawingActivated){
			for(int i=0; i<n; i++){
				canvas.add(new SVG_Circle("structure", points[i], circleRadius));
			}
		}

		if(isNormalActivated){
			for(int i=0; i<n; i++){
				canvas.add(new SVG_Line(
						"structure",
						basis.applyToPoint(points[i]),
						basis.applyToPoint(function.point(coordinates[i]).integrate(function.tangent(coordinates[i]).orthgonal(false), 1.0)))
						);
			}
		}
	}


}
