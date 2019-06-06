package com.qx.back.io.webgl.styles;

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
@XML_Type(name="WebGL_Style", sub= {})
public class WebGL_Style extends BohrObject {

	private String pathname;

	private String code;

	private boolean isLoaded;

	private Object lock;

	public WebGL_Style() {
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
					InputStream inputStream = WebGL_Style.class.getResourceAsStream(pathname+".js");
					if(inputStream==null){
						throw new IOException("cannot find "+pathname);
					}
					BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
					String line;

					while((line = bufferReader.readLine())!= null){
						builder.append(line);
						builder.append('\n');
					}
					bufferReader.close();
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

}
