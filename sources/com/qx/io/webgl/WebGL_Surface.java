package com.qx.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector2d;
import com.qx.maths.vector.Vector3d;

public class WebGL_Surface extends WebGL_RenderingUnit {

	/**
	 * normals
	 */
	private List<Vector3d> normals;

	/**
	 * texture coordinates
	 */
	private List<Vector2d> texCoords;

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
	

	
	public void addNormal(Vector3d normal){
		normals.add(affine.applyToNormal(normal));
	}
	
	public void addTexCoord(Vector2d texCoord){
		texCoords.add(texCoord);
	}
	

	/**
	 * 
	 * @param basis3d
	 * @return
	 */
	public void add(Affine3d affine, WebGL_Surface surface){

		// affine
		setAffine(affine);
		
		// surface
		startPatch();
		
		for(Vector3d vertex : surface.getVertices()){
			addVertex(vertex);
		}
		
		for(Vector3d normal : surface.normals){
			addNormal(normal);
		}

		for(Vector2d texCoord : surface.texCoords){
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
	
	public List<Vector3d> getNormals() {
		return normals;
	}
	
	public List<Vector2d> getTexCoords() {
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
			String[] modes = new String[WebGL_ShapeInstance.NB_MODES];
			for(int i=0; i<WebGL_ShapeInstance.NB_MODES; i++){
				modes[i] = "shinyBluePlastic";
			}
			return modes;
		}
	}


}
