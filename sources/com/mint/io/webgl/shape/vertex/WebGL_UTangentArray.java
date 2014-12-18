package com.mint.io.webgl.shape.vertex;


import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear.Ad;
import com.mint.mathematics.linear.Vd;

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
