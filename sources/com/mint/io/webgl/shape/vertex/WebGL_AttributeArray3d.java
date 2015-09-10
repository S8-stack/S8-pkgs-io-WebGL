package com.mint.io.webgl.shape.vertex;

import java.io.IOException;
import java.io.Writer;
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


	/*
	private final static String SEPARATOR0 = ", ";
	private final static String SEPARATOR1 = "]);\n";
	
	*/
	private final static String EOL = "\n";
	
	/**
	 * 
	 * @param builder
	 * @param vectors
	 * @throws IOException
	 */
	@Override
	public void writeSetup(Writer writer) throws IOException{
		//long time = System.nanoTime();
		writer.append("this."+getKeyword()+"=new WebGL_ArrayBuffer(3, [");
		int n = size();
		Vd vector;
		for(int i=0; i<n; i++){
			vector = vectors.get(i);
			writer.write(vector.get(0)+", "+vector.get(1)+", "+vector.get(2)+((i==n-1)?"]);\n":", "));
			if((i+1)%MAX_NUMBER_OF_VECTOR_PER_LINE==0){
				writer.write(EOL);
			}
			/*
			builder.append(Double.toString(vector.get(0)));
			builder.append(SEPARATOR0);
			builder.append(Double.toString(vector.get(1)));
			builder.append(SEPARATOR0);
			builder.append(Double.toString(vector.get(2)));
			if(i==n-1){
				builder.append(SEPARATOR1);
			}
			else{
				builder.append(SEPARATOR0);
			}
			
			
			*/
		}
		/*
		time = System.nanoTime() - time;
		times.add(new Double(time/vectors.size()));
		*/
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


}
