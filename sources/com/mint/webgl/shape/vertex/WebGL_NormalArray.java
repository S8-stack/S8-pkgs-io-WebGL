package com.mint.webgl.shape.vertex;


import com.mint.math.Ad;
import com.mint.math.Vd;
import com.mint.webgl.shape.WebGL_Shape;


public class WebGL_NormalArray extends WebGL_AttributeArray3d {



	public WebGL_NormalArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "normal";
	}

	@Override
	public Vd transform(Ad affine3d, Vd vector){
		return affine3d.applyToNormal(vector).normalize();
	}

	


}
