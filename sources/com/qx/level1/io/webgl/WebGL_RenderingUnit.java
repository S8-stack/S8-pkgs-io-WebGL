package com.qx.level1.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.level0.maths.MathVector3D;
import com.qx.level1.maths.affine.MathAffine3D;
import com.qx.level1.maths.box.MathBoundingBox3D;

public abstract class WebGL_RenderingUnit {

	
	public String name;
	
	/**
	 * current affine transformation
	 */
	public MathAffine3D affine;
	

	/**
	 * vertices
	 */
	public List<MathVector3D> vertices;
	
	/**
	 * offset for patches
	 */
	public int indexOffset = 0;
	
	public WebGL_RenderingUnit(String name) {
		super();
		
		this.name = name;

		// transformation
		affine = MathAffine3D.STANDARD;

		// vertex attributes
		vertices = new ArrayList<>();
	}
	

	public void addVertex(MathVector3D vertex){
		vertices.add(affine.transformPoint(vertex));
	}
	

	/**
	 * 
	 * @param affine
	 */
	public void setAffine(MathAffine3D affine){
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



	public List<MathVector3D> getVertices() {
		return vertices;
	}
	
	public void update(MathBoundingBox3D boundingBox3d){
		for(MathVector3D vertex : vertices){
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
