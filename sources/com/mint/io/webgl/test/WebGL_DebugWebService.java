package com.mint.io.webgl.test;

import java.io.OutputStream;
import java.io.OutputStreamWriter;

import com.mint.io.webgl.WebGL_WebService;
import com.mint.io.webgl.primitive.Sphere;
import com.mint.io.webgl.shape.WebGL_Shape;
import com.mint.io.webgl.shape.mesh.WebGL_ElementType;
import com.mint.mathematics.linear.Ad;
import com.mint.mathematics.linear.Vd;
import com.mint.web.WebRequest;
import com.mint.web.WebServer;
import com.mint.web.WebService;


/**
 * 
 * @author pc
 *
 */
public class WebGL_DebugWebService extends WebService {
	
	
	public final static String KEYWORD = "WebGLDebug";
	
	private WebGL_WebService webGL_Service;
	
	@Override
	public String getWebServiceKeyword() {
		return KEYWORD;
	}

	@Override
	public void link(WebServer server) {
		webGL_Service = (WebGL_WebService) server.getWebService("WebGL");
	}

	@Override
	public void process(WebRequest request, OutputStream outputStream) throws Exception {
		
		String id0 = buildSpheres(3, 3, 3, 5.0, 5.0, 5.0);
		String id1 = buildSpheres(2, 2, 2, 5.0, 5.0, 5.0);
		
		WebGL_Shape.AttributesOptions options = new WebGL_Shape.AttributesOptions();
		options.isVertexDefined = true;
		options.isNormalDefined = true;
		options.isTexCoordDefined = true;
		WebGL_Shape shape = new WebGL_Shape(options, WebGL_ElementType.TRIANGLE);
		

		new Sphere(6.0, 20).draw(shape, new Ad(new Vd(0, 12, 0.0)));
		
		String id2 = webGL_Service.put(shape);
		
		
		OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF8");
		writer.append("var shapeId0=\""+id0+"\"; var shapeId1=\""+id1+"\"; var shapeId2=\""+id2+"\";");
		writer.close();
		outputStream.close();
	}

	
	
	private String buildSpheres(int nx, int ny, int nz, double ax, double ay, double az){
		
		WebGL_Shape.AttributesOptions options = new WebGL_Shape.AttributesOptions();
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
	
	
}
