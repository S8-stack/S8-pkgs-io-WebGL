package com.qx.io.webgl.tests;

import com.qx.base.resources.WebResourcesBase;
import com.qx.base.resources.QxModuleResourceLoader;
import com.qx.io.webgl.QxModule;

public class TestLoading {

	public static void main(String[] args) throws Exception {
		WebResourcesBase base = new WebResourcesBase();
		base.load(new QxModuleResourceLoader[] { QxModule.LOADER}, true);
	}

}
