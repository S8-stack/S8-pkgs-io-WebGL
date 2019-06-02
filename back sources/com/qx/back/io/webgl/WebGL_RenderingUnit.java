package com.qx.back.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.back.maths.affine.MathAffine3d;
import com.qx.back.maths.box.MathBoundingBox3d;
import com.qx.back.maths.vector.MathVector3d;

public abstract class WebGL_RenderingUnit {

	
	public String name;
	
	/**
	 * current affine transformation
	 */
	public MathAffine3d affine;
	

	/**
	 * vertices
	 */
	public List<MathVector3d> vertices;
	
	/**
	 * offset for patches
	 */
	public int indexOffset = 0;
	
	public WebGL_RenderingUnit(String name) {
		super();
		
		this.name = name;

		// transformation
		affine = MathAffine3d.STANDARD;

		// vertex attributes
		vertices = new ArrayList<>();
	}
	

	public void addVertex(MathVector3d vertex){
		vertices.add(affine.transformPoint(vertex));
	}
	

	/**
	 * 
	 * @param affine
	 */
	public void setAffine(MathAffine3d affine){
		this.affine = affine;
	}
	
	
	public abstract int getNumberOfElements();
	
	/**
	 * 
	 * @param affine
	 */
	public void startPatch(){
		this.indexOffset = getNumberOfElements();
	}



	public List<MathVector3d> getVertices() {
		return vertices;
	}
	
	public void update(MathBoundingBox3d boundingBox3d){
		for(MathVector3d vertex : vertices){
			boundingBox3d.update(vertex);
		}
	}


	public abstract static class Build {


		public Build() {
			super();
		}
		
		public abstract void writeOutline(Writer writer) throws IOException;
		
		public abstract String[] getDefaultModeStyles();
	}


}
