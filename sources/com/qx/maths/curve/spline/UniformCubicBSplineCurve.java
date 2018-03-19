package com.qx.maths.curve.spline;

import com.qx.io.svg.SVG_Canvas;
import com.qx.io.svg.SVG_Circle;
import com.qx.io.svg.SVG_PolyLine;
import com.qx.maths.Md;
import com.qx.maths.Vd;
import com.qx.maths.curve.Curve;



/**
 * 
 * Uniform Cubic BSpline Functions class.
 * 
 * This class implements B-Spline functions that are used for Vector and Surface. The main parameters are :
 * <ul>
 * <li>The order of the curve is <code>k=3</code> (Cubic B-SPline).
 * <li>The number of interpolated vectors is equal to <code>n</code> :  n points + 2 tangents.
 * <li>The number of control points is equal to n.
 * <li>The times are <code>t_0 = t_1 = t_2 = t_3 = 0 < t_4 = 1 < ... < t_n+1 = n-2 < n-1 = t_n+2 = t_n+3 = t_n+4 = t_n+5 </code>.
 * There are <code>n</code> distinct knots, so <code> m = n+6 </code>.
 * <li>Control polygon has <code>n+2</code> vertices. 
 * </ul>
 * 
 * 
 */
public class UniformCubicBSplineCurve extends Curve {

	private static double epsilon = 1e-12;

	/**
	 * Number of interpolated points
	 */
	protected int n;

	/**
	 * The interpolated points
	 */
	protected Vd[] points;


	public UniformCubicBSplineCurve() {

	}


	/**
	 * @param degree : k
	 * @param knots : m+1 knots
	 */
	public UniformCubicBSplineCurve(int n) {
		super();
		this.n = n;
	}



	public Vd[] getControlPoints(){
		return points;
	}


	/**
	 * @param t : the parameter
	 * @return the point of the curve
	 */
	@Override
	public Vd point(double t) {
		return evaluateFunctions(t, 3).combine(points);
	}


	@Override
	public double getStartCoordinate() {
		return 0.0;
	}


	@Override
	public double getEndCoordinate() {
		return n-1;
	}


	/*

	 */


	public Vd derivative(double s, int order) {
		return evaluatePointWeights(s, order).combine(points);
	}


	@Override
	public Vd derivative(double s){
		return derivative(s, 1);
	}

	@Override
	public Vd tangent(double s) {
		return derivative(s, 1).normalize();
	}






	/**
	 * Number of knots : m+1
	 * Number of independent knots values : m+1-6 = m-5;
	 * 
	 * Order of the spline : k = 3
	 * Number of control points : m-k = m-3
	 * 
	 * Number of interpolated points : m-k-2 = m-5
	 * Number of control points + first and second tangents : m-k-2+2 = m-3
	 * 
	 * @param points : this array contains, first, the list of all points to be interpolated then, the first and the second tangent
	 * @param firstTangent
	 * @param secondTangent
	 * @return
	 */
	public void interpolate(Vd[] vectors, int order){

		// this array contains, first, the list of all points ot be interpolated then, the first and the second tangent

		n = vectors.length-2;


		Md matrix = getCubicInterpolationMatrix(order);
		//System.out.println(matrix);


		int dimension = vectors[0].getDimension();

		// Build the control points array
		points = new Vd[n+2];
		for(int i=0; i<n+2; ++i){
			points[i] = new Vd(dimension);
		}

		// Compute the control points
		for(int d=0; d<dimension; d++){

			// Build the vector of coordinates along the dimension d
			Vd xInterpolated = new Vd(n+2);
			for(int i=0; i<n+2; ++i){
				xInterpolated.set(i, vectors[i].get(d));
			}

			// Solve the problem
			Vd xControlPoints = matrix.solve(xInterpolated);
			//System.out.println("error = "+matrix.multiply(xControlPoints).substract(xInterpolated).norm());

			// Store the result in the control point list
			for(int i=0; i<n+2; ++i){
				points[i].set(d, xControlPoints.get(i));
			}
		}

		/*
		System.out.println("control points");
		for(int i=0; i<n; i++){
			System.out.println("point "+i+":\t"+points[i].toString());
		}
		 */
	}



	/**
	 * Allow to retrieve a specific time given its index. Because of their multiplicity, times are not directly stored.
	 * Instead we use <code>knots</code> and <code>multiplicities</code>.
	 * 
	 * @param timeIndex : the index of the time
	 * @return a double for the time associated with the index
	 */
	private int time(int timeIndex){
		if(timeIndex<4){
			return 0;
		}
		// t_n+1 = n-2 < n-1 = t_n+2 = t_n+3 = t_n+4 = t_n+5
		else if (timeIndex >= n+2){
			return n-1;
		}
		else{
			return timeIndex-3;
		}
	}

	/**
	 * 
	 * @param t
	 * @param i : time index
	 * @param k : order (always less than or equal to 3)
	 * @return
	 */
	private double omega(double t, int i, int k){
		int denum = time(i+k) - time(i);
		if(denum==0){
			return 0.0;
		}
		else{
			return (t-time(i))/((double) denum);
		}
	}

	private int getTimeIndex(double t){
		if(t<1){
			return 3;
		}
		// t_n+1 = n-2 < n-1 = t_n+2 = t_n+3 = t_n+4 = t_n+5
		else if(t> n-1 - epsilon){
			return n+2;
		}
		else {
			return ((int) t)+3;
		}
	}


	public Md getCubicInterpolationMatrix(int order){


		Md matrix = new Md(n+2);


		// first point
		matrix.setRow(0, evaluatePointWeights(0));

		// first tangent
		/*
		matrix.set(1, 0,-3.0);
		matrix.set(1, 1, 3.0);
		 */
		// matrix.setRow(1, evaluatePointWeights(0, order));
		matrix.setRow(1, evaluatePointWeights(0, order).downcast());

		// t_4
		matrix.setRow(2, evaluatePointWeights(1));

		for(int i=3; i<n-1; i++){
			// t_i
			matrix.setRow(i, evaluatePointWeights(i-1));
		}

		// t_n-3
		matrix.setRow(n-1, evaluatePointWeights(n-2));

		// t_n-2
		/*
		matrix.set(n, n,	-3.0);
		matrix.set(n, n+1,	3.0);
		 */
		matrix.setRow(n, evaluatePointWeights(n-1, order).downcast());

		// t_n-1
		matrix.setRow(n+1, evaluatePointWeights(n-1));


		return matrix;
	}


	/**
	 * Direct estimate of the functions values at knot point (only for order=3).
	 * @param i : the knot index (values allowed ranging from <code>0</code> to <code>n-1</code>).
	 * @return
	 */
	public Vd evaluatePointWeights(int i){

		if(i<0 || i>n-1){
			throw new RuntimeException("index out of bounds : "+i+" should within range ["+0+", "+n+"[");
		}

		// Vector to be returned. Initialized with zeros.
		Vd vector = new Vd(n+2);

		if(i == 0){
			vector.set(0, 1.0);
		}
		else if(i == 1){
			vector.set(1, 1.0/4.0);
			vector.set(2, 7.0/12.0);
			vector.set(3, 1.0/6.0);
		}
		else if(i == n-2){
			vector.set(n-2, 1.0/6.0);
			vector.set(n-1, 7.0/12.0);
			vector.set(n,	1.0/4.0);
		}
		else if(i == n-1){
			vector.set(n+1, 1.0);
		}
		// if i=2...n-3
		else{
			vector.set(i,	1.0/6.0);
			vector.set(i+1,	2.0/3.0);
			vector.set(i+2,	1.0/6.0);
		}
		return vector;
	}


	/**
	 * 
	 * @param t
	 * @param order : the derivative order
	 * @return
	 */
	public SparseVector evaluatePointWeights(double t, int order) {
		if(order == 0){
			return evaluateFunctions(t, 3);
		}
		else{
			SparseVector vector = new SparseVector(n+2);
			SparseVector cells = evaluateFunctions(t, 3-order);
			int n = cells.getDimension();
			for(int i=0; i<n; i++){
				if(cells.isNozZero(i)){
					vector.addScaledInPlace(getDerivativePointWeights(i, order), cells.get(i));
				}
			}
			return vector;
		}
	}


	/**
	 * This evaluate the linear combination coefficients of the curve point at a specific knot
	 * @param t : the coordinate 
	 * @param order : the order of the B-spline curve functions (should be in the range [0,k]).
	 * @return the vector of the functions values. The dimension of the vector is equal to (m-order)
	 */
	public SparseVector evaluateFunctions(double t, int order) {

		int i = getTimeIndex(t);
		//System.out.println("i="+i+" for t="+t);

		/* From theorem 1 (page 10), Pierre Pansu "Courbes B-Spline", February 2004, it comes that:
		 * If t belongs to [t_i, t_i+1[, S_k(t) depends only of P_i-k, ... , P_i (P_i: point i). It gives the following pattern:
		 * 
		 * 
		 * 	s=0:	B_i-3,0 = 0,	B_i-3+1,0 = 0,	...		B_i-1,0 = 0,	B_i,0 = 1		B_i+1,0 = 0, ...
		 * 	s=1:	B_i-3,1 = 0,	B_i-3+1,1 = 0,	...		B_i-1,0!= 0,	B_i,0!= 0		B_i+1,0 = 0, ...
		 *  ...
		 * 	s=3:	B_i-3,1!= 0,	B_i-3+1,1!= 0,	...		B_i-1,0!= 0,	B_i,0!= 0		B_i+1,0 = 0, ...
		 * 
		 * 
		 * Therefore, we only need to store (in the current bSplines functions evaluations for the current point)
		 * 
		 *  s=0:	B_i,0
		 * 	s=1:	B_i-1,0,	B_i,0
		 *  ...
		 * 	s=3:	B_i-3,1,	B_i-3+1,1,	...		B_i-1,0,	B_i,0
		 * 
		 */

		// Current bSplines functions evaluations for the current point
		double[][] bSplineFunctions = new double[order+1][];

		for(int k=0; k<=order; ++k){
			// For the order k, there are k+1 functions to be evaluated
			bSplineFunctions[k] = new double[k+1];
		}

		// k=0 (Initialization)
		bSplineFunctions[0][0] = 1.0;

		double  bFunction;
		int j;

		// recursive construction, r is the order of the functions evaluated
		for(int k=1; k<=order; k++){

			for(int s=0; s<k+1; s++){

				// Actual index of the Spline function to be evaluated
				j = i-k+s;

				bFunction = 0;

				if(s>0){
					// bSplineFunctions[k-1][s-1] 	is equal to B_j,k-1
					bFunction += omega(t,j,k) * bSplineFunctions[k-1][s-1];	
				}


				if(s<k){
					// bSplineFunctions[k-1][s] 	is equal to B_j+1,k-1
					bFunction += (1.0 - omega(t,j+1,k)) * bSplineFunctions[k-1][s];
				}

				// bSplineFunctions[k][s] is equal to B_j,k
				bSplineFunctions[k][s] = bFunction;
			}
		}

		// Vector to be returned. Initialized with zeros.
		SparseVector vector = new SparseVector(n+2);

		//String func = "";
		// Fill potential non zero coefficients
		for(int s=0; s<=order; ++s){
			j = i-order+s;
			//func=func+" ["+j+"]="+bSplineFunctions[3][s]+";\t";
			if(j<n+2){
				vector.set(j, bSplineFunctions[order][s]);	
			}
		}
		//System.out.println(func);
		return vector;
	}



	/**
	 * Return the control points used to calculate derivative (cf. B-Spline, Pierre Pansu, p. 15)
	 * @param j
	 * @param order
	 * @return
	 */
	private SparseVector getDerivativePointWeights(int j, int order){

		if(order == 0){
			SparseVector weights = new SparseVector(n+2);
			weights.set(j, 1.0);
			return weights;
		}
		else{
			double denum = time(j+3-order+1) - time(j);
			if(denum<epsilon){
				return new SparseVector(n+2);
			}
			else{
				SparseVector q1 = getDerivativePointWeights(j, order-1);
				SparseVector q0 = getDerivativePointWeights(j-1, order-1);
				return q1.substract(q0).scale((3-order+1)/denum);
			}
		}
	}


	public void draw(SVG_Canvas canvas){

		double tStart = getStartCoordinate();
		double tEnd = getEndCoordinate();

		/*
		 * Draw interpolated curve
		 */
		int n = 1000;
		double dt = (tEnd-tStart)/(n-1);
		Vd[] curvePoints = new Vd[n];
		for(int i=0; i<n; ++i){
			curvePoints[i] = point(tStart + i*dt);
			canvas.add(new SVG_Circle("spot2", curvePoints[i], 0.02));
		}
		canvas.add(new SVG_PolyLine("structure", curvePoints));

		Vd[] controlPoints = getControlPoints();
		int nbControlPoints = controlPoints.length;
		for(int i=0; i<nbControlPoints; ++i){
			canvas.add(new SVG_Circle("point", controlPoints[i], 0.02));
		}
	}
	
}
