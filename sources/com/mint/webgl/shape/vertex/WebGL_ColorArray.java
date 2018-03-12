package com.mint.webgl.shape.vertex;


import com.mint.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;
import com.qx.maths.Vd;


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
