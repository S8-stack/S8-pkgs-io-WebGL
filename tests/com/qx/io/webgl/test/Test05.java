package com.qx.io.webgl.test;

import java.io.InputStream;

import com.qx.web.Web;

public class Test05 {

	public static void main(String[] args) {
		String pathname = "webgl/graphics/skycube/mountain/mountain_posy.jpg";
		InputStream resourceInputStream = Web.class.getResourceAsStream(pathname);
		System.out.println(resourceInputStream);
	}

}
