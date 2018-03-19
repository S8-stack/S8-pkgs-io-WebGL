package com.qx.io.webgl.shape.mesh;

public enum WebGL_ElementType {

	SEGMENT(2), TRIANGLE(3);
	
	
	int size;

	private WebGL_ElementType(int size) {
		this.size = size;
	}
	
	

}
