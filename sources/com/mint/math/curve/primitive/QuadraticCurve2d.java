package com.mint.math.curve.primitive;

import com.mint.math.curve.Curve;
import com.mint.math.curve.CurveDrawable;
import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_Line;
import com.qx.maths.Md;
import com.qx.maths.Vd;

public class QuadraticCurve2d extends Curve {
	

	private Md points;

	/**
	 * \mathbf{B}(t) = (1 - t)^{2}\mathbf{P}_0 + 2(1 - t)t\mathbf{P}_1 + t^{2}\mathbf{P}_2 \mbox{ , }
	 * @param p0
	 * @param p1
	 * @param p2
	 */
	public QuadraticCurve2d(Vd p0, Vd p1, Vd p2) {
		super(0,1);
		points = Md.columns(p0, p1, p2);
	}


	@Override
	public Vd point(double t) throws Exception {
		return points.multiply(new Vd((1-t)*(1-t), 2*t*(1-t), t*t));
	}
	
	@Override
	public Vd derivative(double t) throws Exception {
		return points.multiply(new Vd(-2*(1-t), 2*(t-2*t), 2*t));
	}
	
	
	
	public static void main(String[] args) throws Exception{
		Vd p0 = Vd.cylindricalRadial2D(0.050, Math.PI/180*(180+15));
		Vd p1 = new Vd();
		Vd p2 = Vd.cylindricalRadial2D(0.100, -Math.PI/180*75);
		
		QuadraticCurve2d curve = new QuadraticCurve2d(p0, p1, p2);
		
		SVG_Canvas canvas = new SVG_Canvas();
		canvas.add(new SVG_Line("dashed", p0, p1));
		canvas.add(new SVG_Line("dashed", p1, p2));
		
		
		CurveDrawable drawable = new CurveDrawable(curve);
		drawable.style = "structure";
		drawable.draw(canvas);
		canvas.print("output/mesh/quadratic.svg");
	}
			

}
