package com.mint.io.webgl.shape.vertex;


import java.io.IOException;
import java.io.OutputStreamWriter;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear3d.Affine3d;


public abstract class WebGL_AttributeArray {
	
	

	/**
	 * parent shape
	 */
	private WebGL_Shape shape;
	
	
	public WebGL_AttributeArray(WebGL_Shape shape){
		this.shape = shape;
	}
	
	public Affine3d getCurrentTransformation(){
		return shape.getCurrentTransformation();
	}

	
	public abstract int size();

	public abstract void add(WebGL_AttributeArray vertexAttributeArray);
	
	public abstract String getKeyword();
	
	public abstract void writeSetup(OutputStreamWriter builder) throws IOException;
	
	public void writeDispose(OutputStreamWriter builder) throws IOException{
		builder.append("this."+getKeyword()+".dispose();");
	}


}
