package com.qx.io.webgl.shape.vertex;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.vector.Vector2d;


public abstract class WebGL_AttributeArray2d extends WebGL_AttributeArray {

	/**
	 * vertices
	 */
	private List<Vector2d> vectors = new ArrayList<>();

	
	public WebGL_AttributeArray2d(WebGL_Shape shape){
		super(shape);
	}


	@Override
	public int size() {
		return vectors.size();
	}
	
	public void add(Vector2d vector){
		vectors.add(vector.clone());
	}
	
	@Override
	public void add(WebGL_AttributeArray vertexAttributeArray){
		for(Vector2d vertexAttribute : ((WebGL_AttributeArray2d) vertexAttributeArray).getVectors()){
			this.vectors.add(vertexAttribute.clone());	
		}
	}
	
	public List<Vector2d> getVectors(){
		return vectors;
	}
	
	
	


	/**
	 * 
	 * @param writer
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void write(DataOutputStream outputStream) throws IOException{
		for(Vector2d vector : vectors){
			outputStream.writeFloat((float) vector.get(0));
			outputStream.writeFloat((float) vector.get(1));
		}	
	}
}
