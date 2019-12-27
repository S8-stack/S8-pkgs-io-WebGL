package com.qx.level1.io.webgl.programs;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.qx.level0.lang.xml.annotation.XML_SetAttribute;
import com.qx.level0.lang.xml.annotation.XML_Type;
import com.qx.level1.io.bohr.BohrObject;
import com.qx.level1.io.bohr.BohrOutflow;
import com.qx.level1.io.webgl.WebGL_Back;


/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Program", sub= {})
public class WebGL_ProgramSources {

	private String pathname;

	private String vertexShaderSourceCode;

	private String fragmentShaderSourceCode;

	private String javascriptSourceCode;

	private boolean isLoaded;

	private Object lock;

	public WebGL_ProgramSources() {
		super();
		lock = new Object();
		isLoaded = false;
	}

	@XML_SetAttribute(tag="path")
	public void setPathname(String pathname) {
		this.pathname = pathname;
	}

	public String getPathname() {
		return pathname;
	}
	
	
	public BohrObject toBohr() {
		
		return new BohrObject() {
			
			@Override
			public int getTypeCode() {
				return WebGL_Back.WEBGL_BOHR_PREFIX+0x0002;
			}

			@Override
			public void composeBody(BohrOutflow ouflow) throws IOException {
				load();
				ouflow.putString(vertexShaderSourceCode);
				ouflow.putString(fragmentShaderSourceCode);
				ouflow.putString(javascriptSourceCode);
			}
		};
	}


	private void load() throws IOException{
		if(!isLoaded) {
			synchronized (lock) {
				if(!isLoaded) {
					
					// write vertex shader source
					vertexShaderSourceCode = read(pathname+"/vertex.vsh");

					// write fragment shader source
					fragmentShaderSourceCode = read(pathname+"/fragment.fsh");

					// write js code
					javascriptSourceCode = read(pathname+"/setup.js");

					// is now loaded
					isLoaded = true;	
				}
			}
		}
	}
	

	public String getVertexShaderSourceCode() throws IOException {
		load();
		return vertexShaderSourceCode;
	}

	public String getFragmentShaderSourceCode() throws IOException {
		load();
		return fragmentShaderSourceCode;
	}

	public String getJavascriptSourceCode() throws IOException {
		load();
		return javascriptSourceCode;
	}

	/**
	 * 
	 * @param pathname
	 * @return
	 * @throws IOException
	 */
	private static String read(String pathname) throws IOException{

		StringBuilder builder = new StringBuilder();
		InputStream inputStream = WebGL_ProgramSources.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new IOException("cannot find "+pathname);
		}
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
		String line;

		while((line = bufferReader.readLine())!= null){
			builder.append(line);
			builder.append('\n');
		}
		inputStream.close();
		
		// to string
		return builder.toString();
	}


}
