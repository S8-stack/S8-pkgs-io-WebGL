package com.mint.io.webgl.shape.mesh;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.mint.io.webgl.shape.WebGL_Shape;

public class WebGL_ElementArray {

	
	/**
	 * 
	 */
	private WebGL_ElementType type;

	/**
	 * 
	 */
	private List<WebGL_Element> elements = new ArrayList<WebGL_Element>();

	/**
	 * 
	 */
	private WebGL_Shape shape;


	public WebGL_ElementArray(WebGL_ElementType type, WebGL_Shape shape) {
		super();
		this.type = type;
		this.shape = shape;
	}

	public void add(WebGL_Element element){
		element.shiftInPlace(shape.getElementIndexOffset());
		elements.add(element);
	}
	
	public int getNumberOfElements(){
		return elements.size();
	}
	
	public List<WebGL_Element> getElements(){
		return elements;
	}
	
	public void add(WebGL_ElementArray array){
		int offset = shape.getElementIndexOffset();
		for(WebGL_Element element : array.getElements()){
			elements.add(element.shift(offset));
		}
	}

	private static final int MAX_NUMBER_OF_ELEMENT_PER_LINE = 20;

	/**
	 * 
	 * @param writer
	 * @param elements
	 * @throws IOException
	 */
	public void writeSetup(Writer writer) throws IOException{
		writer.append("this.element = new WebGL_ElementArrayBuffer("+type.size+",[");
		int n = elements.size(), c=0;
		WebGL_Element element;
		for(int i=0; i<n; i++){
			element = elements.get(i);
			writer.append(element+((i==n-1)?"]);\n":", "));
			if(c==MAX_NUMBER_OF_ELEMENT_PER_LINE-1){
				writer.append("\n");
				c=0;
			}
			c++;
		}
	}
	
	/**
	 * 
	 * @param writer
	 * @param vectors
	 * @throws IOException
	 */
	public void write(DataOutputStream outputStream) throws IOException{
		for(WebGL_Element element : elements){
			element.write(outputStream);
		}	
	}


	public int getDimension() {
		return type.size;
	}
}
