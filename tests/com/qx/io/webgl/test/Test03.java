package com.qx.io.webgl.test;


import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.qx.io.webgl.shape.WebGL_AttributesSettings;
import com.qx.web.webgl.WebGL_Resources;

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
