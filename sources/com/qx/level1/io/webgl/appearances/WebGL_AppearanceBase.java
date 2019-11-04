package com.qx.level1.io.webgl.appearances;

import java.util.HashMap;
import java.util.Map;

import com.qx.level0.lang.xml.annotation.XML_SetElement;
import com.qx.level0.lang.xml.annotation.XML_Type;

/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Styles", sub= {})
public class WebGL_AppearanceBase {

	private Map<String, WebGL_OldStyle> styles;
	
	public WebGL_AppearanceBase() {
		super();
	}
	
	@XML_SetElement(name="styles")
	public void setStyles(WebGL_OldStyle[] stylesArray) {
		this.styles = new HashMap<>();
		for(WebGL_OldStyle style : stylesArray) {
			styles.put(style.getPathname(), style);
		}
	}
	
	public WebGL_OldStyle get(String id) {
		return styles.get(id);
	}

}
