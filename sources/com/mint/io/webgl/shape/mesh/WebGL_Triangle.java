package com.mint.io.webgl.shape.mesh;

public class WebGL_Triangle extends WebGL_Element {

	public int i0, i1, i2;

	// Triangle
	public WebGL_Triangle(int i0, int i1, int i2){
		this.i0 = i0;
		this.i1 = i1;
		this.i2 = i2;
	}

	@Override
	public WebGL_Triangle shift(int offset) {
		return new WebGL_Triangle(i0+offset, i1+offset, i2+offset);
	}
	
	@Override
	public void shiftInPlace(int offset) {
		this.i0 += offset;
		this.i1 += offset;
		this.i2 += offset;
	}

	public int getVertexIndex(int index) {
		switch(index){
		case 0 : return i0;
		case 1 : return i1;
		case 2 : return i2;
		default : throw new RuntimeException("Index out of bounds");
		}
	}
	
	@Override
	public WebGL_Triangle clone(){
		return new WebGL_Triangle(i0, i1, i2);
	}
	
	
	@Override
	public String toString(){
		return i0+", "+i1+", "+i2;
	}

}
