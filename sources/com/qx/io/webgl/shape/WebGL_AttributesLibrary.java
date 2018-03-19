package com.qx.io.webgl.shape;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import com.qx.web.webgl.WebGL_Resources;


public class WebGL_AttributesLibrary {


	private Unmarshaller programUnmarshaller;

	private Map<String, WebGL_AttributesSettings> styleSettingsMap;

	private Map<String, WebGL_AttributesSettings> programSettingsMap;


	private Unmarshaller styleUnmarshaller;

	public WebGL_AttributesLibrary() {
		super();

		try {
			programUnmarshaller = JAXBContext.newInstance(WebGL_AttributesSettings.class).createUnmarshaller();
			programSettingsMap = new HashMap<String, WebGL_AttributesSettings>();

			styleUnmarshaller = JAXBContext.newInstance(WebGL_StyleSettings.class).createUnmarshaller();
			styleSettingsMap = new HashMap<String, WebGL_AttributesSettings>();
		}
		catch (JAXBException e) {
			e.printStackTrace();
		}

	}

	public synchronized WebGL_AttributesSettings getSettings(String styleId){
		WebGL_AttributesSettings settings = styleSettingsMap.get(styleId);
		if(settings==null){
			try{
				InputStream inpuStream = WebGL_Resources.class.getResourceAsStream("styles/"+styleId+"_attributes.xml");
				if(inpuStream==null){
					throw new Exception("No such style: "+styleId);
				}
				WebGL_StyleSettings styleSettings = (WebGL_StyleSettings) styleUnmarshaller.unmarshal(inpuStream);
				settings = getProgramSettings(styleSettings.program);
				styleSettingsMap.put(styleId, settings);	
			}
			catch(Exception exception){
				exception.printStackTrace();
				return null;
			}
		}
		return settings;
	}

	private WebGL_AttributesSettings getProgramSettings(String programId){
		WebGL_AttributesSettings settings = programSettingsMap.get(programId);
		if(settings==null){
			try {
				settings = (WebGL_AttributesSettings) programUnmarshaller.unmarshal((
						WebGL_Resources.class.getResourceAsStream("programs/"+programId+"/attributes.xml")));

				programSettingsMap.put(programId, settings);
			} catch (JAXBException e) {
				e.printStackTrace();
				return null;
			}
		}
		return settings;
	}

}
