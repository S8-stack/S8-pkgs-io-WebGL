package com.mint.io.webgl.shape.vertex;


import com.mint.io.webgl.shape.WebGL_Shape;

public class WebGL_TexCoordArray extends WebGL_AttributeArray2d {

	public WebGL_TexCoordArray(WebGL_Shape shape){
		super(shape);
	}

	@Override
	public String getKeyword() {
		return "texCoord";
	}
}
