package com.qx.io.webgl.tests;

import java.io.InputStream;

import com.qx.lang.xml.XML_Context;
import com.qx.web.WebLoader;
import com.qx.web.WebResourceBase;

public class TestLoading {

	public static void main(String[] args) throws Exception {

		Class<?> type = com.qx.io.webgl.QxModule.class;
		XML_Context context = new XML_Context(WebLoader.class);
		WebResourceBase base = new WebResourceBase();
		
		try(InputStream inputStream = type.getResourceAsStream("web-resources.xml")){
			WebLoader loader = (WebLoader) context.deserialize(inputStream);
			inputStream.close();	
			loader.load(base, type, true);
		}
		System.out.println(base);
		
	}

}
