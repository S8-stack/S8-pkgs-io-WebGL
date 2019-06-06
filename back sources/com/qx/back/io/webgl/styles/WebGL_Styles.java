package com.qx.back.io.webgl.styles;

import java.util.HashMap;
import java.util.Map;

import com.qx.back.lang.xml.annotation.XML_SetElement;
import com.qx.back.lang.xml.annotation.XML_Type;

/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Styles", sub= {})
public class WebGL_Styles {

	private Map<String, WebGL_Style> styles;
	
	public WebGL_Styles() {
		super();
	}
	
	@XML_SetElement(name="styles")
	public void setStyles(WebGL_Style[] stylesArray) {
		this.styles = new HashMap<>();
		for(WebGL_Style style : stylesArray) {
			styles.put(style.getPathname(), style);
		}
	}
	
	public WebGL_Style get(String id) {
		return styles.get(id);
	}

}
