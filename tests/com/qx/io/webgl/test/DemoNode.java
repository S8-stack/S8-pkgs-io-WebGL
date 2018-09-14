package com.qx.io.webgl.test;

import com.qx.io.https.protocol.header.MIME_Type;
import com.qx.io.https.protocol.session.HTTPS_Session;
import com.qx.io.https.server.HTTPS_Connection;
import com.qx.io.https.server.POST.HTTPS_POST_Node;
import com.qx.io.https.server.POST.HTTPS_POST_RootNode;
import com.qx.io.https.server.POST.HTTPS_POST_Task.Processing;
import com.qx.io.https.server.POST.annotation.HTTPS_POST_Method;
import com.qx.io.webgl.WebGL_Node;
import com.qx.io.webgl.WebGL_ShapeInstance;
import com.qx.io.webgl.WebGL_ShapeModel;
import com.qx.maths.affine.Affine3d;
import com.qx.maths.matrix.SquareMatrix3d;
import com.qx.maths.vector.Vector3d;


/**
 * 
 * @author pc
 *
 */
public class DemoNode extends HTTPS_POST_RootNode {


	private WebGL_Node webGL_Service;

	
	public DemoNode() {
		super();
		this.webGL_Service = new WebGL_Node();
	}


	@HTTPS_POST_Method(mapping="getDemoShapes", processing=Processing.CPU_SHORT)
	public void process(HTTPS_Connection connection) throws Exception {

		WebGL_ShapeModel model = new WebGL_ShapeModel();
		webGL_Service.push(model);
	
		String id0 = webGL_Service.push(new WebGL_ShapeInstance(new Affine3d(
				new Vector3d(0.0, 0.0, 0.0),
				SquareMatrix3d.yRotationMatrix(Math.PI/4.0)), model));
		
		String id1 = webGL_Service.push(new WebGL_ShapeInstance(new Affine3d(
				new Vector3d(2.0, 0.0, 0.0),
				SquareMatrix3d.yRotationMatrix(Math.PI/8.0)), model));
		
		String id2 = webGL_Service.push(new WebGL_ShapeInstance(new Affine3d(new Vector3d(2.0, 2.0, 0.0)), model));

		connection.sendText(MIME_Type.APPLICATION_JS, "var id0=\""+id0+"\", id1=\""+id1+"\", id2=\""+id2+"\";");
	}


	@Override
	public HTTPS_POST_Node getSubNode(String id, HTTPS_Session session) {
		switch (id) {
		case WebGL_Node.HTTPS_TAG: return webGL_Service;
		default: return null;
		}
	}


}
