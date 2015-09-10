package com.mint.io.webgl.shape.vertex;

import java.io.IOException;
import java.io.Writer;
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
	
	
	

	private static final int MAX_NUMBER_OF_VECTOR_PER_LINE = 20;

	/**
	 * 
	 * @param writer
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void writeSetup(Writer writer) throws IOException{
		writer.append("this."+getKeyword()+"=new WebGL_ArrayBuffer(2, [");
		int n = size();
		Vd vector;
		for(int i=0; i<n; i++){
			vector = vectors.get(i);
			writer.append(vector.get(0)+", "+vector.get(1)+((i==n-1)?"]);\n":", "));
			if((i+1)%MAX_NUMBER_OF_VECTOR_PER_LINE==0){
				writer.append("\n");
			}
		}	
	}
}
