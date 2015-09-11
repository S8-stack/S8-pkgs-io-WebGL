package com.mint.io.webgl;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
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


	/**
	 * identifier generator for shape access codes
	 */
	private IdentifierGenerator idGen = new IdentifierGenerator(12, "shape");


	private Map<String, ShapeEntry> shapes = new HashMap<String, ShapeEntry>();
	

	private class ShapeEntry {
		
		private String id;
		private WebGL_Shape shape;
		private int count; 
		
		public ShapeEntry(String id, WebGL_Shape shape) {
			super();
			this.count = 0;
			this.shape = shape;
			this.id= id;
		}
	
		public synchronized WebGL_Shape get(){
			count++;
			if(count==3){
				shapes.remove(id);
			}
			return shape;
		}
	}
	
	
	
	
	/**
	 * put a shape in the WebGL service for later display within client side
	 * @param shape
	 * @return
	 */
	public synchronized String put(WebGL_Shape shape){
		String id = idGen.create();
		ShapeEntry entry = new ShapeEntry(id, shape);
		shapes.put(id, entry);
		return id;
	}




	@Override
	public void process(WebRequest request, OutputStream outputStream) throws IOException, JAXBException, Exception {

		String id = request.get("id");
		
		switch(request.get("action")){

		// Shape
		case "GetShape": getShapeOutline(id, outputStream); break;

		// Vertex Arrays Block
		case "GetVertexArraysBlock": getVertexArraysBlock(id, outputStream); break;

		// Element Array
		case "GetElementArray": getElementArray(id, outputStream); break;

		// Style
		case "GetStyle": getStyle(id, outputStream); break;

		// Program
		case "GetProgram": getProgram(id, outputStream); break;
		
		}

	}


	private void getShapeOutline(String id, OutputStream outputStream) throws Exception{
		BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
		if(shapes.containsKey(id)){
			shapes.get(id).get().writeOutline(bufferedWriter);
			
		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		bufferedWriter.close();
	}
	
	private void getVertexArraysBlock(String id, OutputStream outputStream) throws Exception{
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(outputStream));
		if(shapes.containsKey(id)){
			shapes.get(id).get().writeVertexArraysBlock(dataOutputStream);
			
		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
	}
	
	private void getElementArray(String id, OutputStream outputStream) throws Exception{
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(outputStream));
		if(shapes.containsKey(id)){
			shapes.get(id).get().writeElementArray(dataOutputStream);
			
		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
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
