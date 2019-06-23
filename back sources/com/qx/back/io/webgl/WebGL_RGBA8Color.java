package com.qx.back.io.webgl;

import java.io.IOException;

import com.qx.back.base.bytes.ByteOutput;

public class WebGL_RGBA8Color {

	public int red;

	public int green;

	public int blue;

	public int alpha;


	public WebGL_RGBA8Color(int red, int green, int blue, int alpha) {
		super();
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}


	public void write(ByteOutput outflow) throws IOException {
		outflow.putUInt8(red);
		outflow.putUInt8(green);
		outflow.putUInt8(blue);
		outflow.putUInt8(alpha);
	}

}
