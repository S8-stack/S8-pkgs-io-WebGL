package com.mint.io.webgl.shape;


import java.io.IOException;
import java.io.Writer;

import com.mint.io.webgl.shape.mesh.WebGL_ElementArray;
import com.mint.io.webgl.shape.mesh.WebGL_ElementType;
import com.mint.io.webgl.shape.vertex.WebGL_AttributeArray;
import com.mint.io.webgl.shape.vertex.WebGL_ColorArray;
import com.mint.io.webgl.shape.vertex.WebGL_NormalArray;
import com.mint.io.webgl.shape.vertex.WebGL_TexCoordArray;
import com.mint.io.webgl.shape.vertex.WebGL_UTangentArray;
import com.mint.io.webgl.shape.vertex.WebGL_VTangentArray;
import com.mint.io.webgl.shape.vertex.WebGL_VertexArray;
import com.mint.mathematics.linear.Ad;
import com.mint.mathematics.linear.BoundingBox;
import com.mint.mathematics.linear.Md;

/**
 * Can only be created with factory include in the class as inner class
 * @author Pierre Convert
 *
 */
public class WebGL_Shape {


	/**
	 * 
	 */

	private WebGL_VertexArray vertexArray;
	public boolean isVertexDefined(){ return vertexArray!=null; }
	public WebGL_VertexArray getVertexArray(){ return vertexArray; }

	private WebGL_NormalArray normalArray;
	public boolean isNormalDefined(){ return normalArray!=null; }
	public WebGL_NormalArray getNormalArray(){ return normalArray; }

	private WebGL_UTangentArray uTangentArray;
	public boolean isUTangentDefined(){ return uTangentArray!=null; }
	public WebGL_UTangentArray getUTangentArray(){ return uTangentArray; }

	private WebGL_VTangentArray vTangentArray;
	public boolean isVTangentDefined(){ return vTangentArray!=null; }
	public WebGL_VTangentArray getVTangentArray(){ return vTangentArray; }

	private WebGL_TexCoordArray texCoordArray;
	public boolean isTexCoordDefined(){ return texCoordArray!=null; }
	public WebGL_TexCoordArray getTexCoordArray(){ return texCoordArray; }

	private WebGL_ColorArray colorArray;
	public boolean isColorDefined(){ return colorArray!=null; }
	public WebGL_ColorArray getColorArray(){ return colorArray; }


	/**
	 * 
	 */
	private Ad currentTransformation;


	public Ad getCurrentTransformation(){
		return currentTransformation;
	}



	/**
	 * elements
	 */
	private WebGL_ElementArray elementsArray;


	/**
	 * Offset for patches
	 */
	private int elementIndexOffset = 0;



	/**
	 * options
	 */
	private AttributesOptions options;


	private WebGL_ElementType elementType;

	public static class AttributesOptions {
		public boolean isVertexDefined;
		public boolean isNormalDefined;
		public boolean isUTangentDefined;
		public boolean isVTangentDefined;
		public boolean isTexCoordDefined;
		public boolean isColorDefined;
	}


	/**
	 * @return the elementType
	 */
	public WebGL_ElementType getElementType() {
		return elementType;
	}


	/**
	 * @return the options
	 */
	public AttributesOptions getAttributesOptions() {
		return options;
	}


	/**
	 * 
	 * @param dimension
	 * @param identifier
	 */
	public WebGL_Shape(AttributesOptions attributeOptions, WebGL_ElementType elementType) {

		// options
		this.options = attributeOptions;

		// WebGL_ElementType
		this.elementType = elementType;

		// transformation
		currentTransformation = Ad.STANDARD_3D;

		// vertex attributes
		if(attributeOptions.isVertexDefined){
			vertexArray = new WebGL_VertexArray(this);
		}

		// normal attributes
		if(attributeOptions.isNormalDefined){
			normalArray = new WebGL_NormalArray(this);
		}

		// uTangent attributes
		if(attributeOptions.isUTangentDefined){
			uTangentArray = new WebGL_UTangentArray(this);
		}

		// vTangent attributes
		if(attributeOptions.isVTangentDefined){
			vTangentArray = new WebGL_VTangentArray(this);
		}

		// texCoord attributes
		if(attributeOptions.isTexCoordDefined){
			texCoordArray = new WebGL_TexCoordArray(this);
		}

		// color attributes
		if(attributeOptions.isColorDefined){
			colorArray = new WebGL_ColorArray(this);
		}

		// elements
		elementsArray = new WebGL_ElementArray(elementType, this);
	}






	/**
	 * per vertex attributes
	 */
	private WebGL_AttributeArray[] attributeArrays;

	public WebGL_AttributeArray[] getAttributeArrays(){
		if(attributeArrays==null){
			WebGL_AttributeArray[] tempAttributeArrays = new WebGL_AttributeArray[]{
					vertexArray,
					normalArray,
					uTangentArray,
					vTangentArray,
					texCoordArray,
					colorArray
			};

			int nbOfAttributeArraysDefined = 0;
			for(WebGL_AttributeArray attributeArray : tempAttributeArrays){
				if(attributeArray!=null){
					nbOfAttributeArraysDefined++;
				}
			}
			attributeArrays = new WebGL_AttributeArray[nbOfAttributeArraysDefined];
			int index=0;
			for(WebGL_AttributeArray attributeArray : tempAttributeArrays){
				if(attributeArray!=null){
					attributeArrays[index] = attributeArray;
					index++;
				}
			}
		}
		return attributeArrays;
	}


	/**
	 * 
	 * @param type
	 * @return
	 */
	public WebGL_ElementArray getElementArray(){
		return elementsArray;
	}

	public void update(BoundingBox boundingBox3d){
		getVertexArray().update(boundingBox3d);
	}

	/**
	 * @return the numberOfvertices
	 */
	public int getNumberOfSurfaceVertices() {
		return getVertexArray().size();
	}

	public void startPatch(Ad transformation){
		this.currentTransformation = transformation;
		this.elementIndexOffset = getVertexArray().size();
	}


	public int getElementIndexOffset() {
		return elementIndexOffset;
	}


	/**
	 * Scale shape
	 * @param scalingFactor
	 */
	public void transform(Ad affine3d){
		if(isVertexDefined()){ vertexArray.transform(affine3d); }
		if(isNormalDefined()){ normalArray.transform(affine3d); }
		if(isUTangentDefined()){ uTangentArray.transform(affine3d); }
		if(isVTangentDefined()){ vTangentArray.transform(affine3d); }
	}


	/**
	 * 
	 * @param basis3d
	 * @return
	 */
	public void add(WebGL_Shape shape, Ad basis3d){

		// surface
		startPatch(basis3d);

		// vertex attributes
		if(isVertexDefined()){
			vertexArray.add(shape.getVertexArray());
		}

		// normal attributes
		if(isNormalDefined()){
			normalArray.add(shape.getNormalArray());
		}

		// uTangent attributes
		if(isUTangentDefined()){
			uTangentArray.add(shape.getUTangentArray());
		}

		// vTangent attributes
		if(isVTangentDefined()){
			vTangentArray.add(shape.getVTangentArray());
		}

		// texCoord attributes
		if(isTexCoordDefined()){
			texCoordArray.add(shape.getTexCoordArray());
		}

		// color attributes
		if(isColorDefined()){
			colorArray.add(shape.getColorArray());
		}

		// elements
		elementsArray.add(shape.getElementArray());
	}


	/**
	 * 
	 * @return
	 * @throws IOException 
	 */
	public void write(Writer builder) throws IOException{

		// DEBUG
		//long time = System.nanoTime();


		// write setup
		builder.append("shape.initialize = function(){\n");

		if(isVertexDefined()){ vertexArray.writeSetup(builder); }
		if(isNormalDefined()){ normalArray.writeSetup(builder); }
		if(isUTangentDefined()){ uTangentArray.writeSetup(builder); }
		if(isVTangentDefined()){ vTangentArray.writeSetup(builder); }
		if(isTexCoordDefined()){ texCoordArray.writeSetup(builder); }
		if(isColorDefined()){ colorArray.writeSetup(builder); }

		elementsArray.writeSetup(builder);
		builder.append("};\n");

		// write dispose
		builder.append("shape.dispose = function(){\n");

		if(isVertexDefined()){ vertexArray.writeDispose(builder); }
		if(isNormalDefined()){ normalArray.writeDispose(builder); }
		if(isUTangentDefined()){ uTangentArray.writeDispose(builder); }
		if(isVTangentDefined()){ vTangentArray.writeDispose(builder); }
		if(isTexCoordDefined()){ texCoordArray.writeDispose(builder); }
		if(isColorDefined()){ colorArray.writeDispose(builder); }

		elementsArray.writeDispose(builder);

		builder.append("};\n");
		/*
		time = System.nanoTime() - time;
		times.add(new Double(time));
		 */
	}

	/*
	private static List<Double> times = new ArrayList<Double>();

	public static void DEBUG_clearAverageTime(){
		times = new ArrayList<Double>();
	}

	public static void DEBUG_printAverageTime(){
		int n = times.size();
		double elapsed=0;
		for(double time : times){
			elapsed+=time;
		}
		elapsed/=(n*1e6);
		System.out.println("WebGL_Shape Average serialization done in: "+elapsed);
	}
	 */


	public static void focus(WebGL_Shape[] shapes){

		// build bounding box
		BoundingBox boundingBox3d = new BoundingBox(3);
		for(WebGL_Shape shape : shapes){
			shape.update(boundingBox3d);	
		}


		// first transformation set center to the screen center
		for(WebGL_Shape shape : shapes){
			shape.transform(new Ad(boundingBox3d.getCenter().opposite()));	
		}

		for(WebGL_Shape shape : shapes){
			shape.transform(new Ad(Md.scaleMatrix3D(10.0/boundingBox3d.getRadius())));	
		}
	}


	/**
	 * Check whether shape is empty
	 * @return
	 */
	public boolean isEmpty(){
		if(vertexArray==null){
			return true;
		}
		return vertexArray.isEmpty();
	}

}

