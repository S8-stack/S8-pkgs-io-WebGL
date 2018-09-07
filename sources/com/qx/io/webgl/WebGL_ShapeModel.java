package com.qx.io.webgl;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.qx.maths.box.BoundingBox3d;
import com.qx.maths.vector.Vector2d;
import com.qx.maths.vector.Vector3d;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class WebGL_ShapeModel {

	private List<WebGL_Wire> wires;

	private List<WebGL_Surface> surfaces;

	public WebGL_ShapeModel() {
		super();
		wires = new ArrayList<>();
		surfaces = new ArrayList<>();
	}

	public void append(WebGL_Wire wire){
		wires.add(wire);
	}

	public void append(WebGL_Surface surface){
		surfaces.add(surface);
	}



	public void update(BoundingBox3d boundingBox3d){
		for(WebGL_Wire wire : wires){
			wire.update(boundingBox3d);
		}
		for(WebGL_Surface surface : surfaces){
			surface.update(boundingBox3d);
		}
	}



	public Build build(String id){

		Build build = new Build(id);

		// compile wires
		int verticesOffset = 0;
		int elementsOffset = 0;
		List<WebGL_Segment> segments;
		for(WebGL_Wire wire : wires){
			verticesOffset = build.wireVertices.size();
			build.wireVertices.addAll(wire.getVertices());

			elementsOffset = build.wireSegments.size();
			segments = wire.getSegments();
			build.wireSegments.addAll(segments);
			build.add(wire.name, new WebGL_Wire.Build(verticesOffset, elementsOffset, segments.size()));
		}

		// compile surfaces
		verticesOffset = 0;
		elementsOffset = 0;
		List<WebGL_Triangle> triangles;
		for(WebGL_Surface surface : surfaces){
			verticesOffset = build.surfaceVertices.size();
			build.surfaceVertices.addAll(surface.getVertices());
			build.surfaceNormals.addAll(surface.getNormals());
			build.surfaceTexCoords.addAll(surface.getTexCoords());

			elementsOffset = build.surfaceTriangles.size();
			triangles = surface.getTriangles();
			build.surfaceTriangles.addAll(triangles);
			build.add(surface.name, new WebGL_Surface.Build(verticesOffset, elementsOffset, triangles.size()));
		}

		return build;
	}


	public static class Build {
		
		private String id;

		private List<Vector3d> wireVertices = new ArrayList<>();

		private List<WebGL_Segment> wireSegments = new ArrayList<>();

		private List<Vector3d> surfaceVertices = new ArrayList<>();

		private List<Vector3d> surfaceNormals = new ArrayList<>();

		private List<Vector2d> surfaceTexCoords = new ArrayList<>();

		private List<WebGL_Triangle> surfaceTriangles = new ArrayList<>();

		private List<WebGL_RenderingUnit.Build> renderables = new ArrayList<>();
		
		private Map<String, Integer> renderablesIndices = new HashMap<>();
		
		
		public Build(String id) {
			super();
			this.id = id;
		}
		
		public String getIdentifier(){
			return id;
		}
		
		public void add(String name, WebGL_RenderingUnit.Build unit){
			renderables.add(unit);
			renderablesIndices.put(name, renderables.size()-1);
		}
		
		public int getIndex(String renderableName){
			return renderablesIndices.get(renderableName);
		}
		
		
		public int getNumberOfUnits(){
			return renderables.size();
		}
		
		public void writeOutline(Writer writer) throws IOException{

			// wire
			if(!wireSegments.isEmpty()){
				writer.append("shape.isWireEnabled=true;\n");
				writer.append("shape.nbWireVertices="+wireVertices.size()+";\n");
				writer.append("shape.nbWireSegments="+wireSegments.size()+";\n");
			}
			else{
				writer.append("shape.isWireEnabled=false;\n");
			}

			// surface
			if(!surfaceTriangles.isEmpty()){
				writer.append("shape.isSurfaceEnabled=true;\n");
				writer.append("shape.nbSurfaceVertices="+surfaceVertices.size()+";\n");
				writer.append("shape.nbSurfaceTraingles="+surfaceTriangles.size()+";\n");
				writer.append("shape.surfaces=[");
				
			}
			else{
				writer.append("shape.isSurfaceEnabled=false;\n");
			}
			
			
			// output renderables
			if(!wireSegments.isEmpty() || !surfaceTriangles.isEmpty()){
				boolean isStarted = false;
				writer.append("shape.renderables=[");
				for(WebGL_RenderingUnit.Build renderable : renderables){
					if(isStarted){ writer.append(", "); } else{ isStarted = true; }
					renderable.writeOutline(writer);
				}
				writer.append("];\n");
			}
		}

		public void writeVertexArraysBlock(DataOutputStream outputStream) throws IOException{
			writeArrayOfVector3d(wireVertices, outputStream);
			writeArrayOfVector3d(surfaceVertices, outputStream);
			writeArrayOfVector3d(surfaceNormals, outputStream);
			writeArrayOfVector2d(surfaceTexCoords, outputStream);
		}
		
		public void writeElementArray(DataOutputStream outputStream) throws IOException {
			for(WebGL_Segment segment : wireSegments){
				segment.write(outputStream);
			}
			for(WebGL_Triangle triangle : surfaceTriangles){
				triangle.write(outputStream);
			}
		}
		
		
		/**
		 * 
		 * @return
		 */
		public String[][] getDefaultModeStyles(){
			int n = renderables.size();
			String[][] modes = new String[n][WebGL_ShapeInstance.NB_MODES];
			for(int i=0; i<n; i++){
				modes[i] = renderables.get(i).getDefaultModeStyles();
			}
			return modes;
		}

	}


	public static void writeArrayOfVector2d(List<Vector2d> vectors, DataOutputStream outputStream) throws IOException{
		for(Vector2d vector : vectors){
			outputStream.writeFloat((float) vector.get(0));
			outputStream.writeFloat((float) vector.get(1));
		}	
	}

	public static void writeArrayOfVector3d(List<Vector3d> vectors, DataOutputStream outputStream) throws IOException{
		float x,y,z;
		for(Vector3d vector : vectors){
			x = (float) vector.get(0);
			y = (float) vector.get(1);
			z = (float) vector.get(2);
			outputStream.writeFloat(x);
			outputStream.writeFloat(y);
			outputStream.writeFloat(z);
		}
	}

}

