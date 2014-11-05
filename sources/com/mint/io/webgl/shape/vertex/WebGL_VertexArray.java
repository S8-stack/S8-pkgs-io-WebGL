package com.mint.io.webgl.shape.vertex;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.mathematics.linear3d.Affine3d;
import com.mint.mathematics.linear3d.BoundingBox3d;
import com.mint.mathematics.linear3d.Vector3d;

public class WebGL_VertexArray extends WebGL_AttributeArray3d {


	public WebGL_VertexArray(WebGL_Shape shape){
		super(shape);
	}


	@Override
	public String getKeyword() {
		return "vertex";
	}

	@Override
	public Vector3d transform(Affine3d affine3d, Vector3d vector){
		return affine3d.applyToPoint(vector);
	}


	public void update(BoundingBox3d boundingBox3d) {
		for(Vector3d vector : getVectors()){
			boundingBox3d.update(vector);
		}
	}
	



}
