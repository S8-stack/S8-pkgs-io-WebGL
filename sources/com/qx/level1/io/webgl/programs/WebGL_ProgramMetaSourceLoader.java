package com.qx.level1.io.webgl.programs;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.qx.level0.meta.sources.Load;
import com.qx.level0.meta.sources.Load.Status;
import com.qx.level0.meta.sources.SourceMetaLoader;
import com.qx.level0.utilities.bytes.ChainByteOutflow;

public class WebGL_ProgramMetaSourceLoader implements SourceMetaLoader {

	private String pathname;

	private int fragmentLength;
	
	public WebGL_ProgramMetaSourceLoader(String pathname, int fragmentLength) {
		super();
		this.pathname = pathname;
		this.fragmentLength = fragmentLength;
	}
		
	
	@Override
	public Load load() {
		
		try {
			// write vertex shader source
			String vertexShaderSourceCode = read(pathname+"/vertex.vsh");

			// write fragment shader source
			String fragmentShaderSourceCode = read(pathname+"/fragment.fsh");

			// write js code
			String javascriptSourceCode = read(pathname+"/setup.js");	

			ChainByteOutflow outflow = new ChainByteOutflow(fragmentLength);
			outflow.putString(vertexShaderSourceCode);
			outflow.putString(fragmentShaderSourceCode);
			outflow.putString(javascriptSourceCode);
			
			return new Load(Status.OK, outflow.getHead());
		}
		catch (IOException e) {
			return new Load(Status.NOT_FOUND);
		}
	}
	
	/**
	 * 
	 * @param pathname
	 * @return
	 * @throws IOException
	 */
	private static String read(String pathname) throws IOException{

		StringBuilder builder = new StringBuilder();
		InputStream inputStream = WebGL_ProgramMetaSourceLoader.class.getResourceAsStream(pathname);
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
