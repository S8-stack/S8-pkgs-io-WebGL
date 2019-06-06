package com.qx.back.io.webgl.programs;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.qx.back.base.bytes.ByteOutflow;
import com.qx.back.io.bohr.BohrObject;
import com.qx.back.io.bohr.BohrScope;
import com.qx.back.lang.xml.annotation.XML_SetAttribute;
import com.qx.back.lang.xml.annotation.XML_Type;


/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Program", sub= {})
public class WebGL_Program extends BohrObject {

	private String pathname;

	private String code;

	private boolean isLoaded;

	private Object lock;

	public WebGL_Program() {
		super();
		lock = new Object();
		isLoaded = false;
	}

	@XML_SetAttribute(name="path")
	public void setPathname(String pathname) {
		this.pathname = pathname;
	}

	public String getPathname() {
		return pathname;
	}

	@Override
	public int getTypeCode() {
		return 0x10000123;
	}

	@Override
	public void send(ByteOutflow ouflow) throws IOException {
		load();
		ouflow.putStringUTF8(code);
	}

	@Override
	public void getSubNodes(BohrScope scope) {
		// no sub objects
	}


	public void load() throws IOException{
		if(!isLoaded) {
			synchronized (lock) {
				if(!isLoaded) {
					
					StringBuilder builder = new StringBuilder();
					
					// write vertex shader source
					builder.append("var vertex_shader_source =");
					writeGLSL(builder, pathname+"/vertex.vsh");
					builder.append(";\n");

					// write fragment shader source
					builder.append("var fragment_shader_source =");
					writeGLSL(builder, pathname+"/fragment.fsh");
					builder.append(";\n");

					// write js code
					writeJS(builder, pathname+"/setup.js");

					code = builder.toString();
					isLoaded = true;	
				}
			}
		}
	}
	
	public String getCode() throws IOException {
		load();
		return code;
	}
	

	private static void writeJS(StringBuilder builder, String pathname) throws IOException{

		InputStream inputStream = WebGL_Program.class.getResourceAsStream(pathname);
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
	}


	private static void writeGLSL(StringBuilder builder, String pathname) throws IOException{

		InputStream inputStream = WebGL_Program.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new IOException("cannot find "+pathname);
		}
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
		String line;

		boolean isStarted = false;
		while((line = bufferReader.readLine())!= null){
			builder.append("\n");
			if(isStarted){
				builder.append('+');
			}
			builder.append('\"');
			builder.append(line);
			builder.append("\\");
			builder.append('n');

			builder.append("\"");
			if(!isStarted){
				isStarted = true;	
			}
		}
		inputStream.close();
	}

}
