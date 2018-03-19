package com.qx.io.webgl.shape.mesh;

import java.io.DataOutputStream;
import java.io.IOException;

public abstract class WebGL_Element {


	public abstract void shiftInPlace(int offset);
	
	public abstract WebGL_Element shift(int offset);

	public abstract void write(DataOutputStream outputStream) throws IOException;
	
	@Override
	public abstract WebGL_Element clone();

	public static void writeAsUInt16(DataOutputStream outputStream, int index) throws IOException{
		outputStream.write((byte)(index & 0xFF));
		outputStream.write((byte)((index >> 8) & 0xFF));
	}
}
