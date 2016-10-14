package com.mint.webgl.shape.mesh;

import java.io.DataOutputStream;
import java.io.IOException;

public class WebGL_Segment extends WebGL_Element {

	public int i0, i1;

	// Triangle
	public WebGL_Segment(int i0, int i1){
		this.i0 = i0;
		this.i1 = i1;
	}

	@Override
	public WebGL_Segment shift(int offset) {
		return new WebGL_Segment(i0+offset, i1+offset);
	}
	
	@Override
	public void shiftInPlace(int offset) {
		this.i0 += offset;
		this.i1 += offset;
	}

	public int getVertexIndex(int index) {
		switch(index){
		case 0 : return i0;
		case 1 : return i1;
		default : throw new RuntimeException("Index out of bounds");
		}
	}
	
	@Override
	public WebGL_Segment clone(){
		return new WebGL_Segment(i0, i1);
	}

	@Override
	public String toString(){
		return i0+", "+i1;
	}

	@Override
	public void write(DataOutputStream outputStream) throws IOException {
		writeAsUInt16(outputStream, i0);
		writeAsUInt16(outputStream, i1);
	}
}
