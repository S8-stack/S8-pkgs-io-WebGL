package com.qx.io.webgl.test;

import java.io.OutputStream;
import java.io.OutputStreamWriter;

import com.qx.io.https.protocol.header.MIME_Type;
import com.qx.io.https.protocol.session.HTTPS_Session;
import com.qx.io.https.server.HTTPS_ServerConnection;
import com.qx.io.https.server.HTTPS_ServerTask.Processing;
import com.qx.io.https.server.POST.HTTPS_POST_Node;
import com.qx.io.https.server.POST.HTTPS_POST_RootNode;
import com.qx.io.https.server.POST.annotation.HTTPS_POST_Method;
import com.qx.io.webgl.WebGL_Node;
import com.qx.io.webgl.primitive.Sphere;
import com.qx.io.webgl.shape.WebGL_AttributesSettings;
import com.qx.io.webgl.shape.WebGL_Shape;
import com.qx.io.webgl.shape.mesh.WebGL_ElementType;
import com.qx.maths.Ad;
import com.qx.maths.Vd;


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
	public void process(HTTPS_ServerConnection connection) throws Exception {

		String id0 = buildSpheres(3, 3, 3, 5.0, 5.0, 5.0);
		String id1 = buildSpheres(2, 2, 2, 5.0, 5.0, 5.0);

		WebGL_AttributesSettings options = new WebGL_AttributesSettings();
		options.isVertexDefined = true;
		options.isNormalDefined = true;
		options.isTexCoordDefined = true;
		WebGL_Shape shape = new WebGL_Shape(options, WebGL_ElementType.TRIANGLE);


		new Sphere(6.0, 20).draw(shape, new Ad(new Vd(0, 12, 0.0)));

		String id2 = webGL_Service.put(shape);

		
		connection.sendContent(MIME_Type.TEXT);

		OutputStream outputStream = connection.getOutputStream();
		OutputStreamWriter writer = new OutputStreamWriter(outputStream);
		writer.append("var shapeId0=\""+id0+"\"; var shapeId1=\""+id1+"\"; var shapeId2=\""+id2+"\";");
		writer.close();
	}



	private String buildSpheres(int nx, int ny, int nz, double ax, double ay, double az){

		WebGL_AttributesSettings options = new WebGL_AttributesSettings();
		options.isVertexDefined = true;
		options.isNormalDefined = true;
		options.isTexCoordDefined = true;
		WebGL_Shape shape = new WebGL_Shape(options, WebGL_ElementType.TRIANGLE);


		Sphere sphere = new Sphere(2.0, 20);

		Vd center;
		for(int ix=0; ix<nx; ix++){
			for(int iy=0; iy<ny; iy++){
				for(int iz=0; iz<nz; iz++){
					center = new Vd(ix*ax-(nx-1)*ax/2.0, iy*ay-(ny-1)*ay/2.0, iz*az-(nz-1)*az/2.0);
					sphere.draw(shape, new Ad(center));
				}
			}
		}

		String id = webGL_Service.put(shape);
		return id;
	}


	@Override
	public HTTPS_POST_Node getSubNode(String id, HTTPS_Session session) {
		switch (id) {
		case WebGL_Node.HTTPS_TAG: return webGL_Service;
		default: return null;
		}
	}


}
