package com.qx.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.maths.affine.Affine3d;
import com.qx.maths.box.BoundingBox3d;
import com.qx.maths.vector.Vector3d;

public abstract class WebGL_RenderingUnit {

	
	public String name;
	
	/**
	 * current affine transformation
	 */
	public Affine3d affine;
	

	/**
	 * vertices
	 */
	public List<Vector3d> vertices;
	
	/**
	 * offset for patches
	 */
	public int indexOffset = 0;
	
	public WebGL_RenderingUnit(String name) {
		super();
		
		this.name = name;

		// transformation
		affine = Affine3d.STANDARD;

		// vertex attributes
		vertices = new ArrayList<>();
	}
	

	public void addVertex(Vector3d vertex){
		vertices.add(affine.applyToPoint(vertex));
	}
	

	/**
	 * 
	 * @param affine
	 */
	public void setAffine(Affine3d affine){
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



	public List<Vector3d> getVertices() {
		return vertices;
	}
	
	public void update(BoundingBox3d boundingBox3d){
		for(Vector3d vertex : vertices){
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
