package com.qx.io.webgl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
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


	@HTTPS_POST_Method(mapping="getShapeInstance", processing=Processing.CPU_SHORT)
	public synchronized void getShapeInstance(HTTPS_Connection socket, @QueryParam(name="id") String id) throws Exception {

		socket.sendContent(MIME_Type.TEXT_PLAIN);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
		if(shapeInstances.containsKey(id)){
			shapeInstances.get(id).writeOutline(writer);

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
			shapeModels.get(id).writeOutline(writer);

		}else{
			throw new Exception("Shape with id:"+id+" cannot be retrieved.");
		}
		writer.close();
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
