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
	private IdentifierGenerator shapeModelIdGenenerator = new IdentifierGenerator(12, "mod");

	/**
	 * identifier generator for shape access codes
	 */
	private IdentifierGenerator shapeInstanceIdGenenerator = new IdentifierGenerator(12, "inst");


	private Map<String, WebGL_ObjectModel> models = new HashMap<>();

	private Map<String, WebGL_ObjectInstance> instances = new HashMap<>();



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
	public synchronized String push(WebGL_ObjectModel shapeModel){
		String id = shapeModelIdGenenerator.create();
		shapeModel.id = id;
		models.put(shapeModel.id, shapeModel);
		return id;
	}

	/**
	 * put a shape in the WebGL service for later display within client side
	 * @param shapeInstance
	 * @return
	 */
	public synchronized String push(WebGL_ObjectInstance shapeInstance){
		String id = shapeInstanceIdGenenerator.create();
		instances.put(id, shapeInstance);
		return id;
	}


	/**
	 * Dispose a list of shapes
	 * @param identifiers
	 */
	public synchronized void disposeInstances(List<String> identifiers){
		for(String id : identifiers){
			if(instances.containsKey(id)){
				instances.remove(id);
			}
		}
	}


	@HTTPS_POST_Method(mapping="getObjectInstance")
	public synchronized void getShapeInstance(HTTPS_Connection connection, @QueryParam(name="id") String id) {


		if(instances.containsKey(id)){
			String content;
			try {
				content = instances.get(id).writeOutline();
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


	@HTTPS_POST_Method(mapping="getObjectModel")
	public synchronized void getShapeModel(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception {

		if(models.containsKey(id)){
			byte[] content = models.get(id).getModel();
			connection.sendContent(MIME_Type.APPLICATION_ARRAY_BUFFER, content);
		}
		else{
			connection.respondNotOkStatus("Cannot find shape model with id="+id);
		}
	}


	@HTTPS_POST_Method(mapping="getStyle")
	public synchronized void getStyle(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception{
		StringBuilder builder = new StringBuilder();
		writeJS(builder, "webgl/styles/"+id+".js");
		String content = builder.toString();
		connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
	}


	@HTTPS_POST_Method(mapping="getProgram")
	public synchronized void getProgram(HTTPS_Connection connection, @QueryParam(name="id") String id) throws Exception{
		StringBuilder builder = new StringBuilder();

		// write vertex shader source
		builder.append("var vertex_shader_source =");
		writeGLSL(builder, "webgl/programs/"+id+"/vertex.vsh");
		builder.append(";\n");

		// write fragment shader source
		builder.append("var fragment_shader_source =");
		writeGLSL(builder, "webgl/programs/"+id+"/fragment.fsh");
		builder.append(";\n");

		// write js code
		writeJS(builder, "webgl/programs/"+id+"/setup.js");

		String content = builder.toString();

		connection.sendContent(MIME_Type.TEXT_PLAIN, content.getBytes());
	}



	private static void writeJS(StringBuilder builder, String pathname) throws Exception{

		InputStream inputStream = Web.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new Exception("cannot find "+pathname);
		}
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
		String line;

		while((line = bufferReader.readLine())!= null){
			builder.append(line);
			builder.append('\n');
		}
	}


	private static void writeGLSL(StringBuilder builder, String pathname) throws Exception{

		InputStream inputStream = Web.class.getResourceAsStream(pathname);
		if(inputStream==null){
			throw new Exception("cannot find "+pathname);
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
	}


	@Override
	public HTTPS_POST_Node getSubNode(String id, HTTPS_Session session) {
		return null; // no sub node
	}

}
