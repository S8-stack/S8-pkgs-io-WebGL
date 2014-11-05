package com.mint.io.webgl.shape.mesh;

import java.io.IOException;
import java.io.OutputStreamWriter;
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
		element.shift(shape.getElementIndexOffset());
		elements.add(element);
	}
	
	public List<WebGL_Element> getElements(){
		return elements;
	}
	
	public void add(WebGL_ElementArray array){
		for(WebGL_Element element : array.getElements()){
			add(element);
		}
	}

	private static final int MAX_NUMBER_OF_ELEMENT_PER_LINE = 20;

	/**
	 * 
	 * @param builder
	 * @param elements
	 * @throws IOException
	 */
	public void writeSetup(OutputStreamWriter builder) throws IOException{
		builder.append("this.element = new WebGL_ElementArrayBuffer("+type.size+",[");
		int n = elements.size(), c=0;
		WebGL_Element element;
		for(int i=0; i<n; i++){
			element = elements.get(i);
			builder.append(element+((i==n-1)?"]);\n":", "));
			if(c==MAX_NUMBER_OF_ELEMENT_PER_LINE-1){
				builder.append("\n");
				c=0;
			}
			c++;
		}
	}

	
	public void writeDispose(OutputStreamWriter builder) throws IOException{
		builder.append("this.element.dispose();");
	}
}
