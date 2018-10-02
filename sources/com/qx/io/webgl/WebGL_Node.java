package com.qx.io.webgl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.qx.io.https.connection.HTTPS_Connection;
import com.qx.io.https.protocol.header.MIME_Type;
import com.qx.io.https.protocol.session.HTTPS_Session;
import com.qx.io.https.server.node.HTTPS_POST_Node;
import com.qx.io.https.server.node.annotation.HTTPS_POST_Method;
import com.qx.io.https.server.node.annotation.QueryParam;
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


	private Map<String, WebGL_ShapeModel> shapeModels = new HashMap<>();
	
	private Map<String, WebGL_ShapeInstance> shapeInstances = new HashMap<>();


	
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
	public synchronized String push(WebGL_ShapeModel shapeModel){
		String id = shapeModelIdGenenerator.create();
		shapeModel.id = id;
		shapeModels.put(shapeModel.id, shapeModel);
		return id;
	}
	
	/**
	 * put a shape in the WebGL service for later display within client side
	 * @param shapeInstance
	 * @return
	 */
	public synchronized String push(WebGL_ShapeInstance shapeInstance){
		String id = shapeInstanceIdGenenerator.create();
		shapeInstances.put(id, shapeInstance);
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


	@HTTPS_POST_Method(mapping="getShapeInstance")
	public synchronized void getShapeInstance(HTTPS_Connection connection, @QueryParam(name="id") String id) {

		
		if(shapeInstances.containsKey(id)){
			String content;
			try {
				content = shapeInstances.get(id).writeOutline();
				connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
			}
			catch (IOException e) {
				e.printStackTrace();
				connection.respondNotOkStatus("Cannot load shape instance with id="+id);
			}
		}
		else{
			connection.respondNotOkStatus("Cannot find shape instance with id="+id);
		}
		
	}
	
	
	@HTTPS_POST_Method(mapping="getShapeModel")
	public synchronized void getShapeModel(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception {

		if(shapeModels.containsKey(id)){
			String content = shapeModels.get(id).getConstructionScript();
			connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
		}
		else{
			connection.respondNotOkStatus("Cannot find shape model with id="+id);
		}
	}

	
	@HTTPS_POST_Method(mapping="getStyle")
	public synchronized void getStyle(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception{
		String content = writeResource("webgl/styles/"+id+".js", "\n");
		connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
	}
	

	@HTTPS_POST_Method(mapping="getProgram")
	public synchronized void getProgram(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception{
		StringBuilder builder = new StringBuilder();
		
		// write vertex shader source
		builder.append("var vertex_shader_source = \"");
		writeResource("webgl/programs/"+id+"/vertex.vsh", builder, "");
		builder.append("\";\n");

		// write fragment shader source
		builder.append("var fragment_shader_source = \"");
		writeResource("webgl/programs/"+id+"/fragment.fsh", builder, "");
		builder.append("\";\n");

		// write js code
		writeResource("webgl/programs/"+id+"/setup.js", builder, "\n");
		
		String content = builder.toString();
		
		connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
	}

	
	private static String writeResource(String pathname, String endOfLine) throws Exception{
		StringBuilder builder = new StringBuilder();
		writeResource(pathname, builder, endOfLine);
		return builder.toString();
	}
	
	private static void writeResource(String pathname, StringBuilder builder, String endOfLine) throws Exception{

		InputStream inputStream = Web.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new Exception("cannot find "+pathname);
		}
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
		String line;
		
		while((line = bufferReader.readLine())!= null){
			builder.append(line);
			builder.append(endOfLine);
		}
	}



	@Override
	public HTTPS_POST_Node getSubNode(String id, HTTPS_Session session) {
		return null; // no sub node
	}

}
