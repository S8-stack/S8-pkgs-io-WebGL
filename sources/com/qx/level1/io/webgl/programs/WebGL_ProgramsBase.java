package com.qx.level1.io.webgl.programs;

import java.util.HashMap;
import java.util.Map;

import com.qx.level0.lang.xml.annotation.XML_SetElement;
import com.qx.level0.lang.xml.annotation.XML_Type;

/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Programs", sub= {}, isRoot = true)
public class WebGL_ProgramsBase {

	private Map<String, WebGL_ProgramSources> programs;
	
	public WebGL_ProgramsBase() {
		super();
	}
	
	@XML_SetElement(tag="programs")
	public void setPrograms(WebGL_ProgramSources[] programsArray) {
		this.programs = new HashMap<>();
		for(WebGL_ProgramSources style : programsArray) {
			programs.put(style.getPathname(), style);
		}
	}
	
	public WebGL_ProgramSources get(String id) {
		return programs.get(id);
	}

}
