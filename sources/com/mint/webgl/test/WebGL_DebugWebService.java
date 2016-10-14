package com.mint.webgl.test;

import java.io.OutputStreamWriter;



import com.mint.http.HTTP_POST_Service;
import com.mint.http.HTTP_Request;
import com.mint.http.HTTP_Response;
import com.mint.math.Ad;
import com.mint.math.Vd;
import com.mint.webgl.WebGL_Service;
import com.mint.webgl.primitive.Sphere;
import com.mint.webgl.shape.WebGL_AttributesSettings;
import com.mint.webgl.shape.WebGL_Shape;
import com.mint.webgl.shape.mesh.WebGL_ElementType;


/**
 * 
 * @author pc
 *
 */
public class WebGL_DebugWebService extends HTTP_POST_Service {


	private WebGL_Service webGL_Service;

	
	public WebGL_DebugWebService(WebGL_Service webGL_Service) {
		super("WebGLDebug");
		this.webGL_Service = webGL_Service;
	}


	@Override
	public void process(HTTP_Request request, HTTP_Response response) throws Exception {

		String id0 = buildSpheres(3, 3, 3, 5.0, 5.0, 5.0);
		String id1 = buildSpheres(2, 2, 2, 5.0, 5.0, 5.0);

		WebGL_AttributesSettings options = new WebGL_AttributesSettings();
		options.isVertexDefined = true;
		options.isNormalDefined = true;
		options.isTexCoordDefined = true;
		WebGL_Shape shape = new WebGL_Shape(options, WebGL_ElementType.TRIANGLE);


		new Sphere(6.0, 20).draw(shape, new Ad(new Vd(0, 12, 0.0)));

		String id2 = webGL_Service.put(shape);


		OutputStreamWriter writer = response.start_TEXT();
		writer.append("var shapeId0=\""+id0+"\"; var shapeId1=\""+id1+"\"; var shapeId2=\""+id2+"\";");
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


}
