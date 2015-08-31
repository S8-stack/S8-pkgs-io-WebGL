package com.mint.io.webgl.shape.mesh;

public abstract class WebGL_Element {


	public abstract void shiftInPlace(int offset);
	
	public abstract WebGL_Element shift(int offset);

	@Override
	public abstract WebGL_Element clone();

}
