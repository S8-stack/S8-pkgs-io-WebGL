package com.mint.webgl.shape.vertex;

import com.mint.math.Ad;
import com.mint.math.BoundingBox;
import com.mint.math.Vd;
import com.mint.webgl.shape.WebGL_Shape;


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
