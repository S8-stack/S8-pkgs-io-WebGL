package com.mint.io.webgl.shape.vertex;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear.Vd;


public abstract class WebGL_AttributeArray2d extends WebGL_AttributeArray {

	/**
	 * vertices
	 */
	private List<Vd> vectors = new ArrayList<Vd>();

	
	public WebGL_AttributeArray2d(WebGL_Shape shape){
		super(shape);
	}


	@Override
	public int size() {
		return vectors.size();
	}
	
	public void add(Vd vector){
		vectors.add(vector.clone());
	}
	
	@Override
	public void add(WebGL_AttributeArray vertexAttributeArray){
		for(Vd vertexAttribute : ((WebGL_AttributeArray2d) vertexAttributeArray).getVectors()){
			this.vectors.add(vertexAttribute.clone());	
		}
	}
	
	public List<Vd> getVectors(){
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
		for(Vd vector : vectors){
			outputStream.writeFloat((float) vector.get(0));
			outputStream.writeFloat((float) vector.get(1));
		}	
	}
}
