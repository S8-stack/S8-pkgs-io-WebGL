package com.qx.io.webgl.shape;


import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Writer;

import com.qx.io.webgl.shape.mesh.WebGL_ElementArray;
import com.qx.io.webgl.shape.mesh.WebGL_ElementType;
import com.qx.io.webgl.shape.vertex.WebGL_NormalArray;
import com.qx.io.webgl.shape.vertex.WebGL_TexCoordArray;
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
	
	public WebGL_VertexArray getVertexArray(){
		return vertexArray;
	}

	private WebGL_NormalArray normalArray;
	
	public WebGL_NormalArray getNormalArray(){
		return normalArray;
	}

	private WebGL_TexCoordArray texCoordArray;
	
	public WebGL_TexCoordArray getTexCoordArray(){
		return texCoordArray;
	}
	


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


	private WebGL_ElementType elementType;

	


	/**
	 * @return the elementType
	 */
	public WebGL_ElementType getElementType() {
		return elementType;
	}


	/**
	 * 
	 * @param dimension
	 * @param identifier
	 */
	public WebGL_Shape(WebGL_ElementType elementType) {


		// WebGL_ElementType
		this.elementType = elementType;

		// transformation
		currentTransformation = Affine3d.STANDARD;

		// vertex attributes
		vertexArray = new WebGL_VertexArray(this);
	
		// normal attributes
		normalArray = new WebGL_NormalArray(this);

		// texCoord attributes
		texCoordArray = new WebGL_TexCoordArray(this);
	
		// elements
		elementsArray = new WebGL_ElementArray(elementType, this);
	}






	/**
	 * per vertex attributes
	 */
	//private WebGL_AttributeArray[] attributeArrays;

	/*
	public WebGL_AttributeArray[] getAttributeArrays(){
		if(attributeArrays==null){
			WebGL_AttributeArray[] tempAttributeArrays = new WebGL_AttributeArray[]{
					vertexArray,
					normalArray,
					texCoordArray
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
	*/


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
		vertexArray.transform(affine3d);
		normalArray.transform(affine3d);
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
		vertexArray.add(shape.getVertexArray());
		
		// normal attributes
		normalArray.add(shape.getNormalArray());

		// texCoord attributes
		texCoordArray.add(shape.getTexCoordArray());
		
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
		 * 	this.elementDimension;
		 */

		// write setup
		builder.append("shape.nbVertices="+vertexArray.getNumberOfVertices()+";\n");
		builder.append("shape.nbElements="+elementsArray.getNumberOfElements()+";\n");
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
		vertexArray.write(outputStream);
		normalArray.write(outputStream);
		texCoordArray.write(outputStream);
	}

	
	public void writeElementArray(DataOutputStream dataOutputStream) throws IOException {
		elementsArray.write(dataOutputStream);
	}

}

