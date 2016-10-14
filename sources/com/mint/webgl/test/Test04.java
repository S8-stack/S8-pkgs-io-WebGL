package com.mint.webgl.test;


import javax.xml.bind.JAXBException;

import com.mint.webgl.shape.WebGL_AttributesLibrary;
import com.mint.webgl.shape.WebGL_AttributesSettings;

public class Test04 {

	public static void main(String[] args) throws JAXBException {

		WebGL_AttributesLibrary lib = new WebGL_AttributesLibrary();
		WebGL_AttributesSettings settings = lib.getSettings("blackWire");
		System.out.println(settings);
	}

}
