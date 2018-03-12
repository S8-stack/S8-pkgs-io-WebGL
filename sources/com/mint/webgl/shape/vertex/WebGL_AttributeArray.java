package com.mint.webgl.shape.vertex;


import java.io.DataOutputStream;
import java.io.IOException;

import com.mint.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;


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
	
	public abstract void write(DataOutputStream outputStream) throws IOException;
	
	

}
