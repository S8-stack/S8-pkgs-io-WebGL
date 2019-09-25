package com.qx.io.webgl.tests;

import com.qx.base.loader.QxModuleResourceLoader;
import com.qx.io.webgl.QxModule;
import com.qx.web.resources.WebResourcesBase;

public class TestLoading {

	public static void main(String[] args) throws Exception {
		WebResourcesBase base = new WebResourcesBase();
		base.load(new QxModuleResourceLoader[] { QxModule.LOADER}, true);
	}

}
