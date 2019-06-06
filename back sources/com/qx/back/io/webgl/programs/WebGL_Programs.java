package com.qx.back.io.webgl.programs;

import java.util.HashMap;
import java.util.Map;

import com.qx.back.lang.xml.annotation.XML_SetElement;
import com.qx.back.lang.xml.annotation.XML_Type;

/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Programs", sub= {})
public class WebGL_Programs {

	private Map<String, WebGL_Program> programs;
	
	public WebGL_Programs() {
		super();
	}
	
	@XML_SetElement(name="programs")
	public void setPrograms(WebGL_Program[] programsArray) {
		this.programs = new HashMap<>();
		for(WebGL_Program style : programsArray) {
			programs.put(style.getPathname(), style);
		}
	}
	
	public WebGL_Program get(String id) {
		return programs.get(id);
	}

}
