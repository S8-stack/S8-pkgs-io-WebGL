package com.qx.level1.io.webgl._meta;

import com.qx.level0.lang.xml.annotation.XML_Type;
import com.qx.level0.meta.loader.QxModuleLoader;
import com.qx.level0.meta.nodes.FileMetaDescriptor;
import com.qx.level0.meta.sources.SourceMetaLoader;
import com.qx.level0.meta.sources.WebSource;
import com.qx.level0.meta.targets.WebSourcesTarget;
import com.qx.level0.meta.variables.MetaScope;
import com.qx.level1.io.webgl.programs.WebGL_ProgramMetaSourceLoader;

@XML_Type(name = "glsh")
public class WebGL_ProgramMetaDescriptor extends FileMetaDescriptor {

	@Override
	public void load(QxModuleLoader loader, MetaScope local, Object[] targets) throws Exception {

		SourceMetaLoader sourceLoader = new WebGL_ProgramMetaSourceLoader(pathname, local.getBufferCapacity());

		String webPathname = local.getWebPathname()+pathname+".glsh";
		WebSource source = new WebSource(webPathname, sourceLoader, 
				local.getLoadingPolicy(), 
				local.getLevel(), 
				local.getCacheControl());

		WebSourcesTarget target = WebSourcesTarget.retrieve(targets);
		target.append(source);
	}

}
