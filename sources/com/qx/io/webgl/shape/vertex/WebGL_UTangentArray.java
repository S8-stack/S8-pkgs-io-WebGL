package com.qx.io.webgl.shape.vertex;


import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector3d;

public class WebGL_UTangentArray extends WebGL_AttributeArray3d {



	public WebGL_UTangentArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "uTangent";
	}

	@Override
	public Vector3d transform(Affine3d affine3d, Vector3d vector){
		return affine3d.applyToVector(vector).normalize();
	}

	


}
