package com.qx.io.webgl.shape;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name="Style")
@XmlAccessorType(XmlAccessType.NONE)
public class WebGL_StyleSettings {
	
	@XmlElement(name="prgm")
	public String program;

}
