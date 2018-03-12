package com.mint.webgl.shape.vertex;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mint.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;
import com.qx.maths.Vd;

public abstract class WebGL_AttributeArray3d extends WebGL_AttributeArray {


	
	
	/**
	 * vertices
	 */
	private List<Vd> vectors = new ArrayList<Vd>();

	public WebGL_AttributeArray3d(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public int size() {
		return vectors.size();
	}

	
	public abstract Vd transform(Ad affine3d, Vd vector);


	/**
	 * Scale shape
	 * @param scalingFactor
	 */
	public void transform(Ad affine3d){
		List<Vd> transformedVectors = new ArrayList<Vd>();
		for(Vd vertex : getVectors()){
			transformedVectors.add(transform(affine3d, vertex));
		}
		vectors = transformedVectors;
	}


	public void add(Vd vector){
		vectors.add(transform(getCurrentTransformation(), vector));
	}

	@Override
	public void add(WebGL_AttributeArray vertexAttributeArray){
		for(Vd vertexAttribute : ((WebGL_AttributeArray3d) vertexAttributeArray).getVectors()){
			add(vertexAttribute);	
		}
	}


	
	/**
	 * 
	 * @param writer
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void write(DataOutputStream outputStream) throws IOException{
		float x,y,z;
		for(Vd vector : vectors){
			x = (float) vector.get(0);
			y = (float) vector.get(1);
			z = (float) vector.get(2);
			outputStream.writeFloat(x);
			outputStream.writeFloat(y);
			outputStream.writeFloat(z);
		}	
	}
	
	/* <debug> */
	
	/*
	private static List<Double> times = new ArrayList<Double>();
	
	
	public static void DEBUG_clearAverageTime(){
		times = new ArrayList<Double>();
	}
	
	public static void DEBUG_printAverageTime(){
		int n = times.size();
		double elapsed=0;
		for(double time : times){
			elapsed+=time;
		}
		elapsed/=(n*1e6);
		System.out.println("Average serialization done in: "+elapsed);
	}
	*/
	





	public List<Vd> getVectors(){
		return vectors;
	}

	public boolean isEmpty(){
		return vectors.isEmpty();
	}
	

	public int getNumberOfVertices() {
		return vectors.size();
	}
	


}
