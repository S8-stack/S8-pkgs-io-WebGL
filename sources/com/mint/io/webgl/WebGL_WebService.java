package com.mint.io.webgl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBException;

import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.web.WebRequest;
import com.mint.web.WebServer;
import com.mint.web.WebService;
import com.mint.web.utilities.IdentifierGenerator;

public class WebGL_WebService extends WebService {

	public final static String KEYWORD = "WebGL";
	

	@Override
	public String getWebServiceKeyword() {
		return KEYWORD;
	}

	@Override
	public void link(WebServer server) {
		//server.addRerouting("/lib", "lib");
	}


	private enum Action {
		GetShape, GetStyle, GetProgram;
	}


	/**
	 * identifier generator for shape access codes
	 */
	private IdentifierGenerator idGen = new IdentifierGenerator(12, "shape");


	private Map<String, WebGL_Shape> shapes = new HashMap<String, WebGL_Shape>();


	/**
	 * put a shape in the WebGL service for later display within client side
	 * @param shape
	 * @return
	 */
	public String put(WebGL_Shape shape){
		String id = idGen.create();
		shapes.put(id, shape);
		return id;
	}




	@Override
	public void process(WebRequest request, OutputStream outputStream) throws IOException, JAXBException, Exception {

		String id = request.get("id");
		
		switch(Action.valueOf(request.get("action"))){

		// Shape
		case GetShape: getShape(id, outputStream); break;

		// Style
		case GetStyle: getStyle(id, outputStream); break;

		// Program
		case GetProgram: getProgram(id, outputStream); break;
		
		}

	}


	private void getShape(String id, OutputStream outputStream) throws Exception{
		BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
		if(shapes.containsKey(id)){
			shapes.get(id).write(bufferedWriter);
			shapes.remove(id);
		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		bufferedWriter.close();
	}
	
	
	private void getStyle(String id, OutputStream outputStream) throws Exception{
		OutputStreamWriter writer = new OutputStreamWriter(outputStream);
		writeResource("apps/webgl/styles/"+id+".js", writer, "\n");
		writer.close();
	}


	private void getProgram(String id, OutputStream outputStream) throws Exception{

		OutputStreamWriter writer = new OutputStreamWriter(outputStream);
		// write vertex shader source
		writer.append("var vertex_shader_source = \"");
		writeResource("apps/webgl/programs/"+id+"/vertex.vsh", writer, "");
		writer.append("\";\n");

		// write fragment shader source
		writer.append("var fragment_shader_source = \"");
		writeResource("apps/webgl/programs/"+id+"/fragment.fsh", writer, "");
		writer.append("\";\n");

		// write js code
		writeResource("apps/webgl/programs/"+id+"/setup.js", writer, "\n");
		writer.close();

	}
	private static void writeResource(String pathname, OutputStreamWriter writer, String endOfLine) throws Exception{

		InputStream inputStream = WebServer.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new Exception("cannot find "+pathname);
		}
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
		String line;

		while((line = bufferReader.readLine())!= null){
			writer.append(line+endOfLine);
		}
		bufferReader.close();	
	}

}
