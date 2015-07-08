package com.mint.io.webgl.shape.vertex;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear.Ad;
import com.mint.mathematics.linear.Vd;

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



	private final static int MAX_NUMBER_OF_VECTOR_PER_LINE = 20;

	/**
	 * 
	 * @param builder
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void writeSetup(OutputStreamWriter builder) throws IOException{
		builder.append("this."+getKeyword()+"=new WebGL_ArrayBuffer(3, [");
		int n = size();
		Vd vector;
		for(int i=0; i<n; i++){
			vector = vectors.get(i);
			builder.append(vector.get(0)+", "+vector.get(1)+", "+vector.get(2)+((i==n-1)?"]);\n":", "));
			if((i+1)%MAX_NUMBER_OF_VECTOR_PER_LINE==0){
				builder.append("\n");
			}
		}	
	}
	





	public List<Vd> getVectors(){
		return vectors;
	}

	public boolean isEmpty(){
		return vectors.isEmpty();
	}


}
