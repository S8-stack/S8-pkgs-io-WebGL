package com.qx.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.maths.affine.MathAffine3d;
import com.qx.maths.vector.MathVector2d;
import com.qx.maths.vector.MathVector3d;

public class WebGL_Surface extends WebGL_RenderingUnit {

	/**
	 * normals
	 */
	private List<MathVector3d> normals;

	/**
	 * texture coordinates
	 */
	private List<MathVector2d> texCoords;

	/**
	 * elements
	 */
	private List<WebGL_Triangle> triangles;

	public WebGL_Surface(String name) {
		super(name);
		
		// normals
		normals = new ArrayList<>();

		// texCoords
		texCoords = new ArrayList<>();

		// surface trianles
		triangles = new ArrayList<WebGL_Triangle>();
	}
	


	public void addTriangle(WebGL_Triangle triangle) {
		triangle.shift(indexOffset);
		triangles.add(triangle);
	}


	public List<WebGL_Triangle> getTriangles() {
		return triangles;
	}
	

	
	public void addNormal(MathVector3d normal){
		normals.add(affine.applyToNormal(normal));
	}
	
	public void addTexCoord(MathVector2d texCoord){
		texCoords.add(texCoord);
	}
	

	/**
	 * 
	 * @param basis3d
	 * @return
	 */
	public void add(MathAffine3d affine, WebGL_Surface surface){

		// affine
		setAffine(affine);
		
		// surface
		startPatch();
		
		for(MathVector3d vertex : surface.getVertices()){
			addVertex(vertex);
		}
		
		for(MathVector3d normal : surface.normals){
			addNormal(normal);
		}

		for(MathVector2d texCoord : surface.texCoords){
			addTexCoord(texCoord);
		}
		
		for(WebGL_Triangle triangle : surface.triangles){
			addTriangle(triangle);
		}
	}



	@Override
	public int getNumberOfElements() {
		return triangles.size();
	}
	
	public List<MathVector3d> getNormals() {
		return normals;
	}
	
	public List<MathVector2d> getTexCoords() {
		return texCoords;
	}

	
	public static class Build extends WebGL_RenderingUnit.Build {

		private int verticesOffset;

		private int trianglesOffset;

		private int trianglesLength;

		public Build(int verticesOffset, int trianglesOffset, int trianglesLength) {
			super();
			this.verticesOffset = verticesOffset;
			this.trianglesOffset = trianglesOffset;
			this.trianglesLength = trianglesLength;
		}
		
		@Override
		public void writeOutline(Writer writer) throws IOException {
			writer.append("new WebGL_Surface("+verticesOffset+","+trianglesOffset+","+trianglesLength+")");
		}
		
		@Override
		public String[] getDefaultModeStyles(){
			String[] modes = new String[WebGL_ObjectInstance.NB_MODES];
			for(int i=0; i<WebGL_ObjectInstance.NB_MODES; i++){
				modes[i] = "shinyBluePlastic";
			}
			return modes;
		}
	}


}
