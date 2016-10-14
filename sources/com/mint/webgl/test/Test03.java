package com.mint.webgl.test;


import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.mint.web.apps.webgl.WebGL_Resources;
import com.mint.webgl.shape.WebGL_AttributesSettings;

public class Test03 {

	public static void main(String[] args) throws JAXBException {

		WebGL_AttributesSettings options;
		JAXBContext context = JAXBContext.newInstance(WebGL_AttributesSettings.class);

		Unmarshaller unmarshaller = context.createUnmarshaller();
		
		options = (WebGL_AttributesSettings) unmarshaller.unmarshal(
				WebGL_Resources.class.getResourceAsStream("programs/color/attributes.xml"));
		System.out.println(options);
	}

}
