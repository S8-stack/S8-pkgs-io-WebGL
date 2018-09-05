package com.qx.io.webgl.shape.vertex;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector3d;

public abstract class WebGL_AttributeArray3d extends WebGL_AttributeArray {


	
	
	/**
	 * vertices
	 */
	private List<Vector3d> vectors = new ArrayList<Vector3d>();

	public WebGL_AttributeArray3d(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public int size() {
		return vectors.size();
	}

	
	public abstract Vector3d transform(Affine3d affine3d, Vector3d vector);


	/**
	 * Scale shape
	 * @param scalingFactor
	 */
	public void transform(Affine3d affine3d){
		List<Vector3d> transformedVectors = new ArrayList<Vector3d>();
		for(Vector3d vertex : getVectors()){
			transformedVectors.add(transform(affine3d, vertex));
		}
		vectors = transformedVectors;
	}


	public void add(Vector3d vector){
		vectors.add(transform(getCurrentTransformation(), vector));
	}

	@Override
	public void add(WebGL_AttributeArray vertexAttributeArray){
		for(Vector3d vertexAttribute : ((WebGL_AttributeArray3d) vertexAttributeArray).getVectors()){
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
		for(Vector3d vector : vectors){
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
	





	public List<Vector3d> getVectors(){
		return vectors;
	}

	public boolean isEmpty(){
		return vectors.isEmpty();
	}
	

	public int getNumberOfVertices() {
		return vectors.size();
	}
	


}
