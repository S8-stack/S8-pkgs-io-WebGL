package com.qx.io.webgl.appearances;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.qx.base.bytes.ByteOutflow;
import com.qx.lang.xml.annotation.XML_SetAttribute;
import com.qx.lang.xml.annotation.XML_Type;
import com.qx.web.io.bohr.BohrObject;
import com.qx.web.io.bohr.BohrScope;


/**
 * 
 * @author pc
 *
 */
@XML_Type(name="WebGL_Style", sub= {})
public class WebGL_OldStyle {

	private String pathname;

	private String code;

	private boolean isLoaded;

	private Object lock;

	public WebGL_OldStyle() {
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
	
	public BohrObject toBohr() {
		
		return new BohrObject() {
			
			@Override
			public int getTypeCode() {
				return 0x10000123;
			}

			@Override
			public void send(ByteOutflow ouflow) throws IOException {
				load();
				ouflow.putString(code);
			}

			@Override
			public void getSubNodes(BohrScope scope) {
				// no sub objects
			}
		};
		
	}

	


	public void load() throws IOException{
		if(!isLoaded) {
			synchronized (lock) {
				if(!isLoaded) {
					StringBuilder builder = new StringBuilder();
					InputStream inputStream = WebGL_OldStyle.class.getResourceAsStream(pathname+".js");
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
