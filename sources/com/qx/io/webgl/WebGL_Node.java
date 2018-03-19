package com.qx.io.webgl;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.qx.io.https.protocol.header.MIME_Type;
import com.qx.io.https.protocol.session.HTTPS_Session;
import com.qx.io.https.server.HTTPS_ServerConnection;
import com.qx.io.https.server.HTTPS_ServerTask.Processing;
import com.qx.io.https.server.POST.HTTPS_POST_Node;
import com.qx.io.https.server.POST.annotation.HTTPS_POST_Method;
import com.qx.io.https.server.POST.annotation.QueryParam;
import com.qx.io.webgl.shape.WebGL_AttributesLibrary;
import com.qx.io.webgl.shape.WebGL_AttributesSettings;
import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.utils.IdentifierGenerator;
import com.qx.web.Web;

public class WebGL_Node implements HTTPS_POST_Node {

	/**
	 * Preferred tag for HTTPS mapping
	 */
	public final static String HTTPS_TAG = "webGL";
	

	/**
	 * identifier generator for shape access codes
	 */
	private IdentifierGenerator idGen = new IdentifierGenerator(12, "shape");


	private WebGL_AttributesLibrary attributesLibrary = new WebGL_AttributesLibrary();


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
	 * 
	 */
	public WebGL_Node() {
		super();
	}



	/**
	 * Give access to the correct settings
	 * @param styleId
	 * @return
	 */
	public WebGL_AttributesSettings getAttributesSettings(String styleId){
		return attributesLibrary.getSettings(styleId);
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


	/**
	 * Dispose a list of shapes
	 * @param identifiers
	 */
	public synchronized void dispose(List<String> identifiers){
		for(String id : identifiers){
			if(shapes.containsKey(id)){
				shapes.remove(id);
			}
		}
	}


	@HTTPS_POST_Method(mapping="getShape", processing=Processing.CPU_SHORT)
	public synchronized void getShapeOutline(
			HTTPS_ServerConnection connection,
			@QueryParam(name="id") String id) throws Exception {

		connection.sendContent(MIME_Type.TEXT_PLAIN);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
		if(shapes.containsKey(id)){
			shapes.get(id).get().writeOutline(writer);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		writer.close();
	}

	@HTTPS_POST_Method(mapping="getVertexArraysBlock", processing=Processing.CPU_LONG)
	public synchronized void getVertexArraysBlock(
			HTTPS_ServerConnection connection,
			@QueryParam(name="id") String id) throws Exception{
		connection.sendContent(MIME_Type.APPLICATION_OCTET_STREAM);
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(connection.getOutputStream()));  

		if(shapes.containsKey(id)){
			shapes.get(id).get().writeVertexArraysBlock(dataOutputStream);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
	}


	@HTTPS_POST_Method(mapping="getElementArray", processing=Processing.CPU_LONG)
	public synchronized void getElementArray(HTTPS_ServerConnection connection, @QueryParam(name="id") String id) throws Exception{
		connection.sendContent(MIME_Type.APPLICATION_ARRAY_BUFFER);
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(connection.getOutputStream()));  
		if(shapes.containsKey(id)){
			shapes.get(id).get().writeElementArray(dataOutputStream);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
	}

	
	@HTTPS_POST_Method(mapping="getStyle", processing=Processing.CPU_SHORT)
	public synchronized void getStyle(HTTPS_ServerConnection connection, @QueryParam(name="id") String id) throws Exception{
		connection.sendContent(MIME_Type.TEXT_PLAIN);
		OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
		writeResource("webgl/styles/"+id+".js", writer, "\n");
		writer.close();
	}
	

	@HTTPS_POST_Method(mapping="getProgram", processing=Processing.CPU_SHORT)
	public synchronized void getProgram(HTTPS_ServerConnection connection, @QueryParam(name="id") String id) throws Exception{
		connection.sendContent(MIME_Type.TEXT_PLAIN);
		OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
		// write vertex shader source
		writer.append("var vertex_shader_source = \"");
		writeResource("webgl/programs/"+id+"/vertex.vsh", writer, "");
		writer.append("\";\n");

		// write fragment shader source
		writer.append("var fragment_shader_source = \"");
		writeResource("webgl/programs/"+id+"/fragment.fsh", writer, "");
		writer.append("\";\n");

		// write js code
		writeResource("webgl/programs/"+id+"/setup.js", writer, "\n");
		writer.close();
	}

	
	private static void writeResource(String pathname, OutputStreamWriter writer, String endOfLine) throws Exception{

		InputStream inputStream = Web.class.getResourceAsStream(pathname);
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



	@Override
	public HTTPS_POST_Node getSubNode(String id, HTTPS_Session session) {
		return null; // no sub node
	}

}
