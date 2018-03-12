package com.mint.math.surface;

import com.qx.maths.Ad;
import com.qx.maths.Md;
import com.qx.maths.Vd;


/**
 * 
 * @author pc
 *
 */
public abstract class Surface {


	private double h = 1e-7;



	/**
	 * 
	 * @return the u start coordinate
	 */
	public abstract double getUStartCoordinate();


	/**
	 * 
	 * @return the u end coordinate
	 */
	public abstract double getUEndCoordinate();


	/**
	 * 
	 * @return the v start coordinate
	 */
	public abstract double getVStartCoordinate();


	/**
	 * 
	 * @return the v end coordinate
	 */
	public abstract double getVEndCoordinate();


	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public abstract Vd point(double u, double v) throws Exception;

	

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd point(Vd p) throws Exception{
		return point(p.get(0), p.get(1));
	}


	/**
	 * 
	 * @param h : Parameter used for finite difference calculations
	 */
	public void setFiniteDfference(double h){
		this.h= h;
	}


	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd uDerivative(double u , double v) throws Exception{
		if(u<getUEndCoordinate()-h){
			return point(u, v).derivate(point(u+h, v), h);
		}
		else{
			return point(u, v).derivate(point(u-h, v),-h);
		}
	}

	
	public Vd uDerivative(Vd p) throws Exception{
		return uDerivative(p.get(0), p.get(1));
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd uTangent(double u , double v) throws Exception{
		return uDerivative(u, v).normalize();
	}
	
	public Vd uTangent(Vd p) throws Exception{
		return uTangent(p.get(0), p.get(1));
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd vDerivative(double u, double v) throws Exception{
		if(v<getVEndCoordinate()-h){
			return point(u, v).derivate(point(u, v+h), h);
		}
		else{
			return point(u, v).derivate(point(u, v-h),-h);
		}
	}

	public Vd vDerivative(Vd p) throws Exception{
		return vDerivative(p.get(0), p.get(1));
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd vTangent(double u, double v) throws Exception{
		return vDerivative(u, v).normalize();
	}

	public Vd vTangent(Vd p) throws Exception{
		return vTangent(p.get(0), p.get(1));
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Vd normal(double u, double v) throws Exception{
		return uDerivative(u, v).vect3(vDerivative(u, v)).normalize();
	}

	public Vd normal(Vd p) throws Exception{
		return normal(p.get(0), p.get(1));
	}

	/**
	 * 
	 * @param p : the point in coordinates space
	 * @return
	 * @throws Exception 
	 */
	public Ad basis(double u, double v) throws Exception{
		Vd uDerivative = uDerivative(u, v);
		Vd vDerivative = vDerivative(u, v);
		return new Ad(point(u, v), Md.columns(
				uDerivative.normalize(),
				vDerivative.normalize(),
				uDerivative.vect3(vDerivative).normalize()));
	}

	public Ad basis(Vd p) throws Exception{
		return basis(p.get(0), p.get(1));
	}
	
	
	public SurfaceDrawable getDrawable(){
		return new SurfaceDrawable(this);
	}

}
