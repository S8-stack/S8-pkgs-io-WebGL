package com.mint.math.curve.tesselator;

import com.mint.math.curve.Curve;
import com.qx.lang.joos.annotation.JOOS_Input;
import com.qx.lang.joos.annotation.JOOS_Object;


@JOOS_Object(name="Uniform Curve Tesselator", sub={})
public class UniformCurveTesselator extends CurveTesselator {

	
	private int nbPoints;

	
	public UniformCurveTesselator(){
	}

	public UniformCurveTesselator(int nbPoints){
		this.nbPoints = nbPoints;
	}
	

	@Override
	public double[] tesselate(Curve curve) throws Exception {
		double xStart = curve.getStartCoordinate();
		double xEnd = curve.getEndCoordinate();
		double dx = (xEnd - xStart)/(nbPoints-1);
		double[] coordinates = new double[nbPoints];
		for(int i=0; i<nbPoints; i++){
			coordinates[i] = xStart+i*dx;
		}
		return coordinates;
	}
	

	@Override
	public int getNumberOfPoints() {
		return nbPoints;
	}
	

	@JOOS_Input(name="nb points")
	public void setNumberOfPoints(int nbPoints) {
		this.nbPoints = nbPoints;
	}

}
