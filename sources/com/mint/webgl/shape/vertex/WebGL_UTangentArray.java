package com.mint.webgl.shape.vertex;


import com.mint.math.Ad;
import com.mint.math.Vd;
import com.mint.webgl.shape.WebGL_Shape;

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
