package com.mint.io.webgl.shape.vertex;


import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear.Ad;
import com.mint.mathematics.linear.Vd;


public class WebGL_ColorArray extends WebGL_AttributeArray3d {



	public WebGL_ColorArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "color";
	}

	@Override
	public Vd transform(Ad affine3d, Vd vector){
		return vector.clone();
	}

}
