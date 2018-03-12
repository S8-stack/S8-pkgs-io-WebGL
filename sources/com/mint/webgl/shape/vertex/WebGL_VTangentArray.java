package com.mint.webgl.shape.vertex;


import com.mint.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;
import com.qx.maths.Vd;


public class WebGL_VTangentArray extends WebGL_AttributeArray3d {



	public WebGL_VTangentArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "vTangent";
	}

	@Override
	public Vd transform(Ad affine3d, Vd vector){
		return affine3d.applyToVector(vector).normalize();
	}
}
