package com.qx.io.webgl;

import java.util.List;

import com.qx.maths.vector.MathVector3d;

public class WebGL_Surface {

	private List<MathVector3d> vertices;
	
	private List<MathVector3d> normals;
	
	private List<Double> texCoords;
	
	private List<Integer> triangleIndices;

	public int getIndexOffset(){
		return vertices.size();
	}
	
	public void pushVertex(MathVector3d vertex){
		vertices.add(vertex);
	}
	
	public void pushNormal(MathVector3d normal){
		normals.add(normal);
	}
	
	public void pushTexCoord(double texCoord){
		texCoords.add(texCoord);
	}
	
	public void pushTriangle(int i0, int i1, int i2){
		triangleIndices.add(i0);
		triangleIndices.add(i1);
		triangleIndices.add(i2);		
	}
}
