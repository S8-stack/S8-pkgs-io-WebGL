package com.mint.io.webgl.shape.mesh;

public abstract class WebGL_Element {


	public abstract void shift(int offset);

	@Override
	public abstract WebGL_Element clone();

}
