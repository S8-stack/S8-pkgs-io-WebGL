package com.qx.io.webgl.shape;


import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Writer;

import com.qx.io.webgl.shape.mesh.WebGL_ElementArray;
import com.qx.io.webgl.shape.mesh.WebGL_ElementType;
import com.qx.io.webgl.shape.vertex.WebGL_AttributeArray;
import com.qx.io.webgl.shape.vertex.WebGL_ColorArray;
import com.qx.io.webgl.shape.vertex.WebGL_NormalArray;
import com.qx.io.webgl.shape.vertex.WebGL_TexCoordArray;
import com.qx.io.webgl.shape.vertex.WebGL_UTangentArray;
import com.qx.io.webgl.shape.vertex.WebGL_VTangentArray;
import com.qx.io.webgl.shape.vertex.WebGL_VertexArray;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.box.BoundingBox3d;
import com.qx.maths.matrix.SquareMatrix3d;

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
	private Affine3d currentTransformation;


	public Affine3d getCurrentTransformation(){
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
	private WebGL_AttributesSettings options;


	private WebGL_ElementType elementType;

	


	/**
	 * @return the elementType
	 */
	public WebGL_ElementType getElementType() {
		return elementType;
	}


	/**
	 * @return the options
	 */
	public WebGL_AttributesSettings getAttributesOptions() {
		return options;
	}


	/**
	 * 
	 * @param dimension
	 * @param identifier
	 */
	public WebGL_Shape(WebGL_AttributesSettings attributeOptions, WebGL_ElementType elementType) {

		// options
		this.options = attributeOptions;

		// WebGL_ElementType
		this.elementType = elementType;

		// transformation
		currentTransformation = Affine3d.STANDARD;

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

	public void update(BoundingBox3d boundingBox3d){
		getVertexArray().update(boundingBox3d);
	}

	/**
	 * @return the numberOfvertices
	 */
	public int getNumberOfSurfaceVertices() {
		return getVertexArray().size();
	}

	public void startPatch(Affine3d transformation){
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
	public void transform(Affine3d affine3d){
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
	public void add(WebGL_Shape shape, Affine3d basis3d){

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
	public void writeOutline(Writer builder) throws IOException{

		// DEBUG
		//long time = System.nanoTime();

		/*
		 *	this.nbVertices
		 * 	this.nbElements;
		 * 
		 * 	(0) this.isVertexDefined
		 * 	(1) this.isNormalDefined
		 * 	(2) this.isUTangentDefined;
		 * 	(3) this.isVTangentDefined;
		 * 	(4) this.isTexCoordDefined;
		 * 	(5) this.isColorDefined;
		 * 
		 * 	this.elementDimension;
		 */

		// write setup
		builder.append("shape.nbVertices="+vertexArray.getNumberOfVertices()+";\n");
		builder.append("shape.nbElements="+elementsArray.getNumberOfElements()+";\n");

		builder.append("shape.isVertexDefined="+isVertexDefined()+";\n"); 
		builder.append("shape.isNormalDefined="+isNormalDefined()+";\n"); 
		builder.append("shape.isUTangentDefined="+isUTangentDefined()+";\n"); 
		builder.append("shape.isVTangentDefined="+isVTangentDefined()+";\n"); 
		builder.append("shape.isTexCoordDefined="+isTexCoordDefined()+";\n"); 
		builder.append("shape.isColorDefined="+isColorDefined()+";\n"); 
		
		builder.append("shape.elementDimension="+elementsArray.getDimension()+";\n"); 

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
		BoundingBox3d boundingBox3d = new BoundingBox3d();
		for(WebGL_Shape shape : shapes){
			shape.update(boundingBox3d);	
		}


		// first transformation set center to the screen center
		for(WebGL_Shape shape : shapes){
			shape.transform(new Affine3d(boundingBox3d.getCenter().opposite()));	
		}

		for(WebGL_Shape shape : shapes){
			shape.transform(new Affine3d(SquareMatrix3d.buildScaling(10.0/boundingBox3d.getRadius())));	
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
	
	
	
	

	
	public void writeVertexArraysBlock(DataOutputStream outputStream) throws IOException{
		if(isVertexDefined()){
			vertexArray.write(outputStream);
		}
		if(isNormalDefined()){
			normalArray.write(outputStream);
		}
		if(isUTangentDefined()){
			uTangentArray.write(outputStream);
		}
		if(isVTangentDefined()){
			vTangentArray.write(outputStream);
		}
		if(isTexCoordDefined()){
			texCoordArray.write(outputStream);
		}
		if(isColorDefined()){
			colorArray.write(outputStream);
		}
	}

	
	public void writeElementArray(DataOutputStream dataOutputStream) throws IOException {
		elementsArray.write(dataOutputStream);
	}

}

