package com.qx.io.webgl.shape.vertex;


import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;
import com.qx.maths.Vd;

public class WebGL_UTangentArray extends WebGL_AttributeArray3d {



	public WebGL_UTangentArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "uTangent";
	}

	@Override
	public Vd transform(Ad affine3d, Vd vector){
		return affine3d.applyToVector(vector).normalize();
	}

	


}
