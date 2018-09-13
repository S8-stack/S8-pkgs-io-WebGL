package com.qx.io.webgl.test;


import com.qx.io.https.protocol.session.HTTPS_StubUserDatabase;
import com.qx.io.https.server.HTTPS_Server;

public class ServiceTest {

	public static void main(String[] args) throws Exception {
		HTTPS_Server server = new HTTPS_Server("config/server", new HTTPS_StubUserDatabase());
		server.setRootNode(new DemoNode());
		server.start();
	}

}
