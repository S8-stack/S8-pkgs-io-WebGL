package com.qx.io.webgl;

import com.qx.base.bytes.ByteInflow;
import com.qx.blocks.BkException;
import com.qx.blocks.objects.BkIndex;
import com.qx.blocks.objects.BkMethod;
import com.qx.blocks.objects.BkObject;
import com.qx.blocks.objects.ObjectsBlock;
import com.qx.blocks.objects.type.BkTypeHandler;
import com.qx.io.webgl.appearances.WebGL_AppearanceBase;
import com.qx.io.webgl.appearances.WebGL_OldStyle;
import com.qx.io.webgl.programs.WebGL_ProgramSources;
import com.qx.io.webgl.programs.WebGL_ProgramsBase;
import com.qx.lang.xml.XML_Context;
import com.qx.web.io.bohr.BohrObject;


public class WebGL_Service extends BkObject {

	/** prototype for type handling */
	public final static BkTypeHandler PROTOTYPE = new BkTypeHandler(WebGL_Service.class);
	public @Override BkTypeHandler getPrototype() { return PROTOTYPE; }

	private WebGL_ProgramsBase programs;

	private WebGL_AppearanceBase styles;


	/**
	 * @throws BkException 
	 * 
	 */
	public WebGL_Service(ObjectsBlock block, BkIndex index) throws BkException {
		super(block, index);

		XML_Context context;
		try {
			context = new XML_Context(WebGL_ProgramsBase.class);
			programs = (WebGL_ProgramsBase) context.deserialize(WebGL_ProgramSources.class.getResourceAsStream("programs.xml"));

			context = new XML_Context(WebGL_AppearanceBase.class);
			styles = (WebGL_AppearanceBase) context.deserialize(WebGL_OldStyle.class.getResourceAsStream("styles.xml"));
		} 
		catch (Exception e) {
			e.printStackTrace();
		}


	}

	@BkMethod(code=0x04, rights=0x0)
	public BohrObject getStyle(ByteInflow inflow) throws Exception{
		String id = inflow.getString();
		WebGL_OldStyle style = styles.get(id);
		if(style==null){
			throw new Exception("No style for id="+id);	
		}
		return style.toBohr();
	}


	@BkMethod(code=0x08, rights=0x0)
	public BohrObject getProgram(ByteInflow inflow) throws Exception{
		String id = inflow.getString();
		WebGL_ProgramSources programSources = programs.get(id);
		if(programSources==null) {
			throw new Exception("No prgm for id="+id);
		}
		return programSources.toBohr();
	}

}
