package com.qx.io.webgl.shape;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name="AttirbutesOptions")
@XmlAccessorType(XmlAccessType.NONE)
public class WebGL_AttributesSettings {
	
	@XmlElement(name="vertex")
	public boolean isVertexDefined;
	
	@XmlElement(name="normal")
	public boolean isNormalDefined;
	
	@XmlElement(name="uTangent")
	public boolean isUTangentDefined;

	@XmlElement(name="vTangent")
	public boolean isVTangentDefined;

	@XmlElement(name="texCoord")
	public boolean isTexCoordDefined;
	
	@XmlElement(name="color")
	public boolean isColorDefined;
	
	
	public void or(WebGL_AttributesSettings settings){
		isVertexDefined = isVertexDefined || settings.isVertexDefined;
		isNormalDefined = isNormalDefined || settings.isNormalDefined;
		isUTangentDefined = isUTangentDefined || settings.isUTangentDefined;
		isVTangentDefined = isVTangentDefined || settings.isVTangentDefined;
		isTexCoordDefined = isTexCoordDefined || settings.isTexCoordDefined;
		isColorDefined = isColorDefined || settings.isColorDefined;
	}
	

}
