package com.qx.level1.io.webgl.tests.loading;

import java.util.HashMap;
import java.util.Map;

import com.qx.level0.io.bohr._meta.BohrObjectMetaDescriptor;
import com.qx.level0.io.bohr._meta.BohrObjectTypeCodeMetaVariable;
import com.qx.level0.lang.xml.XML_Context;
import com.qx.level0.meta.ModuleMetaDescriptor;
import com.qx.level0.meta.sources.WebSource;
import com.qx.level0.meta.targets.MetaTarget;
import com.qx.level0.meta.targets.WebSourcesTarget;
import com.qx.level0.meta.variables.CacheControlMetaVariable;
import com.qx.level0.meta.variables.MetaScope;
import com.qx.level0.meta.variables.MetaVariable;
import com.qx.level0.meta.variables.PackageMetaVariable;
import com.qx.level0.meta.variables.WebPathnameMetaVariable;
import com.qx.level1.io.webgl.WebGL_ModuleLoader;
import com.qx.level1.io.webgl._meta.WebGL_ProgramMetaDescriptor;

public class WebGL_LoadingTest02 {

	public static void main(String[] args) throws Exception {

		WebGL_ModuleLoader loader = new WebGL_ModuleLoader();

		XML_Context context = new XML_Context(
				new Class<?>[] { ModuleMetaDescriptor.class	},
				new Class<?>[] { 
					BohrObjectTypeCodeMetaVariable.class, 
					BohrObjectMetaDescriptor.class,
					WebGL_ProgramMetaDescriptor.class});
		ModuleMetaDescriptor moduleDescriptor = (ModuleMetaDescriptor) context.deserialize(loader.getResource("module.xml"));

		MetaScope.Prototype prototype = new MetaScope.Prototype(new MetaVariable.Prototype[] {
				PackageMetaVariable.PROTOTYPE, 
				WebPathnameMetaVariable.PROTOTYPE, 
				CacheControlMetaVariable.PROTOTYPE,
				BohrObjectTypeCodeMetaVariable.PROTOTYPE
		});


		MetaTarget[] targets = new MetaTarget[MetaTarget.INDEX_RANGE];
		
		// web sources
		Map<String, WebSource> map = new HashMap<>();
		new WebSourcesTarget(map).store(targets);

		
		moduleDescriptor.build(loader, prototype, targets);
		System.out.println(map);
		WebSource src = map.get("/webgl/programs/standard.glsh");
		System.out.println(src.load().head.unrollToString_UTF8());
	}

}
