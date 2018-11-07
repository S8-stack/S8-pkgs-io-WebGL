package com.qx.io.webgl;

import java.util.List;

import com.qx.io.https.connection.HTTPS_Connection;
import com.qx.maths.vector.MathVector3d;

public class WebGL_Wire {

	private List<MathVector3d> vertices;
	
	private List<Integer> indices;
	
	public void pushVertex(MathVector3d vertex){
		vertices.add(vertex);
	}
	
	public void pushSegment(int i0, int i1){
		indices.add(i0);
		indices.add(i1);
	}
	
	public int getIndexOffset(){
		return vertices.size();
	}
	
	public void compose(HTTPS_Connection connection){
		connection.write("set");
		
	}
}
