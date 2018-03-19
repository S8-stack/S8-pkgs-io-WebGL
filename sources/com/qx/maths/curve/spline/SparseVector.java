package com.qx.maths.curve.spline;


import com.qx.maths.Vd;



public class SparseVector {


	/**
	 * coefficients
	 */
	private double[] coefficients;


	/**
	 * flags for non zero cells
	 */
	private boolean[] isNonZero;


	/**
	 * 
	 * @param dimension
	 */
	public SparseVector(int dimension){
		coefficients = new double[dimension];
		isNonZero = new boolean[dimension];
	}


	/**
	 * 
	 */
	public double get(int index){
		return coefficients[index];
	}


	/**
	 * 
	 */
	public void set(int index, double value){
		coefficients[index] = value;
		isNonZero[index] = true;
	}


	/**
	 * 
	 * @param right
	 * @param scale
	 */
	public void addScaledInPlace(SparseVector right, double scale){
		int n = coefficients.length;
		for(int i=0; i<n; i++){
			if(isNonZero[i]){
				coefficients[i] += right.get(i)*scale;
			}
			else if(right.isNozZero(i)){
				coefficients[i] = right.get(i)*scale;
				isNonZero[i] = true;
			}
		}
	}


	public SparseVector substract(SparseVector right) {
		int n = coefficients.length;
		SparseVector result = new SparseVector(n);
		for(int i=0; i<n; i++){
			if(isNonZero[i]){
				result.set(i, coefficients[i] - right.get(i));
			}
			else if(right.isNozZero(i)){
				result.set(i, -right.get(i));
			}
		}
		return result;
	}
	
	public SparseVector scale(double scalar) {
		int n = coefficients.length;
		SparseVector result = new SparseVector(n);
		for(int i=0; i<n; i++){
			if(isNonZero[i]){
				result.set(i, coefficients[i]*scalar);
			}
		}
		return result;
	}

	public Vd downcast(){
		return new Vd(coefficients);
	}

	public boolean isNozZero(int index){
		return isNonZero[index];
	}

	public int getDimension(){
		return coefficients.length;
	}


	/**
	 * 
	 * @param vectors
	 * @return
	 */
	public Vd combine(Vd[] vectors) {
		int numberOfVectors = getDimension();
		int dimension = vectors[0].getDimension();
		double[] resultCoeffcients = new double[dimension];

		double coefficient;
		for(int i=0; i<numberOfVectors; ++i){
			if(isNozZero(i)){
				coefficient = coefficients[i];
				for(int k=0; k<dimension; ++k){
					resultCoeffcients[k] += coefficient*vectors[i].get(k);	
				}
			}
		}
		return new Vd(resultCoeffcients);
	}



}
