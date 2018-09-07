package com.qx.io.webgl;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.qx.maths.affine.Affine3d;
import com.qx.maths.vector.Vector3d;

public class WebGL_Wire extends WebGL_RenderingUnit {


	/**
	 * segments
	 */
	private List<WebGL_Segment> segments;

	public WebGL_Wire(String name) {
		super(name);

		// elements
		segments = new ArrayList<>();
	}

	public List<WebGL_Segment> getSegments(){
		return segments;
	}

	public void addSegment(WebGL_Segment segment){
		segment.shift(indexOffset);
		segments.add(segment);
	}


	/**
	 * 
	 * @param basis3d
	 * @return
	 */
	public void add(Affine3d affine, WebGL_Wire wire){

		// affine
		setAffine(affine);

		// wire
		startPatch();

		// vertices attributes
		for(Vector3d vertex : wire.getVertices()){
			addVertex(vertex);
		}

		// elements
		for(WebGL_Segment segment : wire.segments){
			addSegment(segment);
		}
	}



	@Override
	public int getNumberOfElements() {
		return segments.size();
	}


	public static class Build extends WebGL_RenderingUnit.Build {

		private int verticesOffset;

		private int segmentsOffset;

		private int segmentsLength;

		public Build(int verticesOffset, int segmentsOffset, int segmentsLength) {
			super();
			this.verticesOffset = verticesOffset;
			this.segmentsOffset = segmentsOffset;
			this.segmentsLength = segmentsLength;
		}

		@Override
		public void writeOutline(Writer writer) throws IOException {
			writer.append("new WebGL_Wire("+verticesOffset+","+segmentsOffset+","+segmentsLength+")");
		}
		
		@Override
		public String[] getDefaultModeStyles(){
			String[] modes = new String[WebGL_ShapeInstance.NB_MODES];
			for(int i=0; i<WebGL_ShapeInstance.NB_MODES; i++){
				modes[i] = "darkWire";
			}
			return modes;
		}
	}

}
