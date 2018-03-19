package com.qx.io.webgl.test;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import com.qx.io.webgl.shape.WebGL_AttributesSettings;

public class Test02 {

	public static void main(String[] args) throws JAXBException {

		WebGL_AttributesSettings options = new WebGL_AttributesSettings();
		JAXBContext context = JAXBContext.newInstance(WebGL_AttributesSettings.class);
		Marshaller marshaller = context.createMarshaller();
		marshaller.marshal(options, new File("output/test.xml"));

		Unmarshaller unmarshaller = context.createUnmarshaller();
		options = (WebGL_AttributesSettings) unmarshaller.unmarshal(new File("output/test.xml"));
		System.out.println("done");
	}

}
