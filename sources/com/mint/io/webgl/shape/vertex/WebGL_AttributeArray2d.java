package com.mint.io.webgl.shape.vertex;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear2d.Vector2d;

public abstract class WebGL_AttributeArray2d extends WebGL_AttributeArray {

	/**
	 * vertices
	 */
	private List<Vector2d> vectors = new ArrayList<Vector2d>();

	
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
	
	
	

	private static final int MAX_NUMBER_OF_VECTOR_PER_LINE = 20;

	/**
	 * 
	 * @param builder
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void writeSetup(OutputStreamWriter builder) throws IOException{
		builder.append("this."+getKeyword()+"=new WebGL_ArrayBuffer(2, [");
		int n = size();
		Vector2d vector;
		for(int i=0; i<n; i++){
			vector = vectors.get(i);
			builder.append(vector.x+", "+vector.y+((i==n-1)?"]);\n":", "));
			if((i+1)%MAX_NUMBER_OF_VECTOR_PER_LINE==0){
				builder.append("\n");
			}
		}	
	}
}
