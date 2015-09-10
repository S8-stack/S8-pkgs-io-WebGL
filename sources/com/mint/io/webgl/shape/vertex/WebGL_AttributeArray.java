package com.mint.io.webgl.shape.vertex;


import java.io.IOException;
import java.io.Writer;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear.Ad;


public abstract class WebGL_AttributeArray {
	
	

	/**
	 * parent shape
	 */
	private WebGL_Shape shape;
	
	
	public WebGL_AttributeArray(WebGL_Shape shape){
		this.shape = shape;
	}
	
	public Ad getCurrentTransformation(){
		return shape.getCurrentTransformation();
	}

	
	public abstract int size();

	public abstract void add(WebGL_AttributeArray vertexAttributeArray);
	
	public abstract String getKeyword();
	
	public abstract void writeSetup(Writer writer) throws IOException;
	
	public void writeDispose(Writer writer) throws IOException{
		writer.append("this."+getKeyword()+".dispose();");
	}


}
