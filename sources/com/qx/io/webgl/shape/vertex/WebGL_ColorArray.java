package com.qx.io.webgl.shape.vertex;


import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector3d;


public class WebGL_ColorArray extends WebGL_AttributeArray3d {



	public WebGL_ColorArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "color";
	}

	@Override
	public Vector3d transform(Affine3d affine3d, Vector3d vector){
		return vector.clone();
	}

}
