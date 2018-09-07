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
import com.qx.io.https.server.HTTPS_Connection;
import com.qx.io.https.server.POST.HTTPS_POST_Node;
import com.qx.io.https.server.POST.HTTPS_POST_Task.Processing;
import com.qx.io.https.server.POST.annotation.HTTPS_POST_Method;
import com.qx.io.https.server.POST.annotation.QueryParam;
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
	private IdentifierGenerator shapeModelIdGenenerator = new IdentifierGenerator(12, "shmod");

	/**
	 * identifier generator for shape access codes
	 */
	private IdentifierGenerator shapeInstanceIdGenenerator = new IdentifierGenerator(12, "shins");


	private Map<String, ShapeModelEntry> shapeModels = new HashMap<>();
	
	private Map<String, ShapeInstanceEntry> shapeInstances = new HashMap<>();


	private class ShapeModelEntry {

		private WebGL_ShapeModel.Build shapeModel;
		private int count; 

		public ShapeModelEntry(WebGL_ShapeModel.Build shapeModel) {
			super();
			this.count = 0;
			this.shapeModel = shapeModel;
		}
		
		public String getIdentifier(){
			return shapeModel.getIdentifier();
		}

		public synchronized WebGL_ShapeModel.Build get(){
			count++;
			if(count==3){
				shapeModels.remove(getIdentifier());
			}
			return shapeModel;
		}
	}
	
	private class ShapeInstanceEntry {

		private String id;
		private WebGL_ShapeInstance shape;
		private int count; 

		public ShapeInstanceEntry(String id, WebGL_ShapeInstance shape) {
			super();
			this.count = 0;
			this.shape = shape;
			this.id= id;
		}

		public synchronized WebGL_ShapeInstance get(){
			count++;
			if(count==3){
				shapeInstances.remove(id);
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
	 * put a shape in the WebGL service for later display within client side
	 * @param shapeModel
	 * @return
	 */
	public synchronized String putShapeModel(WebGL_ShapeModel shapeModel){
		String id = shapeModelIdGenenerator.create();
		shapeModels.put(id, new ShapeModelEntry(shapeModel.build(id)));
		return id;
	}
	
	/**
	 * put a shape in the WebGL service for later display within client side
	 * @param shape
	 * @return
	 */
	public synchronized String putShapeInstance(WebGL_ShapeInstance shape){
		String id = shapeInstanceIdGenenerator.create();
		shapeInstances.put(id, new ShapeInstanceEntry(id, shape));
		return id;
	}


	/**
	 * Dispose a list of shapes
	 * @param identifiers
	 */
	public synchronized void disposeInstances(List<String> identifiers){
		for(String id : identifiers){
			if(shapeInstances.containsKey(id)){
				shapeInstances.remove(id);
			}
		}
	}


	@HTTPS_POST_Method(mapping="getShapeInstance", processing=Processing.CPU_SHORT)
	public synchronized void getShapeInstance(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception {

		socket.sendContent(MIME_Type.TEXT_PLAIN);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
		if(shapeInstances.containsKey(id)){
			shapeInstances.get(id).get().writeOutline(writer);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		writer.close();
	}
	
	@HTTPS_POST_Method(mapping="getShapeModel", processing=Processing.CPU_SHORT)
	public synchronized void getShapeModel(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception {

		socket.sendContent(MIME_Type.TEXT_PLAIN);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
		if(shapeModels.containsKey(id)){
			shapeModels.get(id).get().writeOutline(writer);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		writer.close();
	}

	@HTTPS_POST_Method(mapping="getVertexArraysBlock", processing=Processing.CPU_LONG)
	public synchronized void getVertexArraysBlock(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception {
		socket.sendContent(MIME_Type.APPLICATION_OCTET_STREAM);
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(socket.getOutputStream()));  

		if(shapeModels.containsKey(id)){
			shapeModels.get(id).get().writeVertexArraysBlock(dataOutputStream);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
	}


	@HTTPS_POST_Method(mapping="getElementArraysBlock", processing=Processing.CPU_LONG)
	public synchronized void getElementArraysBlock(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception{
		socket.sendContent(MIME_Type.APPLICATION_ARRAY_BUFFER);
		DataOutputStream dataOutputStream = new DataOutputStream(new BufferedOutputStream(socket.getOutputStream()));  
		if(shapeModels.containsKey(id)){
			shapeModels.get(id).get().writeElementArray(dataOutputStream);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		dataOutputStream.close();
	}

	
	@HTTPS_POST_Method(mapping="getStyle", processing=Processing.CPU_SHORT)
	public synchronized void getStyle(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception{
		socket.sendContent(MIME_Type.TEXT_PLAIN);
		OutputStreamWriter writer = new OutputStreamWriter(socket.getOutputStream());
		writeResource("webgl/styles/"+id+".js", writer, "\n");
		writer.close();
	}
	

	@HTTPS_POST_Method(mapping="getProgram", processing=Processing.CPU_SHORT)
	public synchronized void getProgram(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception{
		socket.sendContent(MIME_Type.TEXT_PLAIN);
		OutputStreamWriter writer = new OutputStreamWriter(socket.getOutputStream());
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
