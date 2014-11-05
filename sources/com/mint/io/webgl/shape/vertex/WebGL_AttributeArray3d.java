package com.mint.io.webgl.shape.vertex;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear3d.Affine3d;
import com.mint.mathematics.linear3d.Vector3d;

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
		Vector3d vector;
		for(int i=0; i<n; i++){
			vector = vectors.get(i);
			builder.append(vector.x+", "+vector.y+", "+vector.z+((i==n-1)?"]);\n":", "));
			if((i+1)%MAX_NUMBER_OF_VECTOR_PER_LINE==0){
				builder.append("\n");
			}
		}	
	}
	





	public List<Vector3d> getVectors(){
		return vectors;
	}



}
