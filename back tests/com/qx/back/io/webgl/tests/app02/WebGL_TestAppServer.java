package com.qx.back.io.webgl.tests.app02;

import java.nio.file.Path;
import java.util.concurrent.Executors;

import com.qx.back.base.resources.FrontResourceBase;
import com.qx.back.blocks.BkBase;
import com.qx.back.blocks.Block;
import com.qx.back.blocks.BlockContext;
import com.qx.back.blocks.objects.ObjectsBlock;
import com.qx.back.blocks.objects.type.BkTypesContext;
import com.qx.back.blocks.objects.type.fields.PrimitiveFieldHandler;
import com.qx.back.blocks.tests.extensions.MathVector3dField;
import com.qx.back.io.http2.messages.HTTP2_Message;
import com.qx.back.io.webgl.WebGL_Service;
import com.qx.back.web.server.WebServer;
import com.qx.back.web.server.WebServerConfiguration;
import com.qx.back.web.server.methods.WebMethodService;
import com.qx.back.web.server.resources.FrontResourceService;

public class WebGL_TestAppServer {

	public static void main(String[] args) throws Exception {

		WebServerConfiguration config = 
				WebServerConfiguration.load("config/server/config2.xml");


		FrontResourceBase resources = new FrontResourceBase();
		com.qx.front.base.BaseFront.LOADER.load(resources);
		com.qx.front.maths.MathFront.LOADER.load(resources);
		com.qx.front.blocks.BkFront.LOADER.load(resources);
		com.qx.front.io.bohr.BohrFront.LOADER.load(resources);
		com.qx.front.web.WebFront.LOADER.load(resources);
		com.qx.front.io.webgl.WebGL_Front.LOADER.load(resources);
		//com.qx.front.io.webgl.tests.WebGL_TestsApp.LOADER.load(resources);

		/*
		 * traverse
		 */
		resources.traverse((p,r)->System.out.println(p+" -> "+r.getPath()));


		FrontResourceService staticResourcesServer = new FrontResourceService(
				resources,
				Executors.newSingleThreadExecutor());


		BkTypesContext objectsContext = new BkTypesContext(
				new PrimitiveFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				WebGL_Service.class);

		ObjectsBlock.Prototype proto = new ObjectsBlock.Prototype(objectsContext);

		BlockContext context = new BlockContext(new Block.Prototype[] { proto });



		// getting FileChannel from file
		Path root = BkBase.DEBUG_UNIFIED_DB_ROOT;

		BkBase base = new BkBase(context, root, 4, true);

		WebMethodService webMethodsService = new WebMethodService(base);

		new WebServer(config) {	
			@Override
			public void onMessageReceived(HTTP2_Message request) {
				System.out.println("[HTTP2_Endpoint] New message received! ->\n"+request);		

				switch(request.getMethod()) {

				case GET:
					System.out.println("[Server] GET servicing...");				
					staticResourcesServer.serve(request);
					break;

				case POST:
					System.out.println("[Server] POST servicing...");
					/*
					try {
						ByteInflow inflow = new BufferByteInflow(request.getDataFragmentHead().flatten());
						System.out.println(inflow.getFloat32());
					} 
					catch (IOException e) {
						e.printStackTrace();
					}
					 */
					webMethodsService.serve(request);
					break;

				default:
					break;

				}
			}
		};	
	}
}
