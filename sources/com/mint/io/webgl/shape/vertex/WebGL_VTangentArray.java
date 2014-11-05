package com.mint.io.webgl.shape.vertex;


import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear3d.Affine3d;
import com.mint.mathematics.linear3d.Vector3d;

public class WebGL_VTangentArray extends WebGL_AttributeArray3d {



	public WebGL_VTangentArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "vTangent";
	}

	@Override
	public Vector3d transform(Affine3d affine3d, Vector3d vector){
		return affine3d.applyToVector(vector).normalize();
	}
}
