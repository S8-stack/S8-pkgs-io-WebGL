package com.qx.io.webgl.shape.vertex;

import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.maths.Ad;
import com.qx.maths.BoundingBox;
import com.qx.maths.Vd;


public class WebGL_VertexArray extends WebGL_AttributeArray3d {


	public WebGL_VertexArray(WebGL_Shape shape){
		super(shape);
	}


	@Override
	public String getKeyword() {
		return "vertex";
	}

	@Override
	public Vd transform(Ad affine3d, Vd vector){
		return affine3d.applyToPoint(vector);
	}


	public void update(BoundingBox boundingBox3d) {
		for(Vd vector : getVectors()){
			boundingBox3d.update(vector);
		}
	}





}
