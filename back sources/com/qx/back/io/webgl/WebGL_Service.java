package com.qx.back.io.webgl;

import com.qx.back.base.bytes.ByteInput;
import com.qx.back.blocks.BkException;
import com.qx.back.blocks.BkMethod;
import com.qx.back.blocks.BkType;
import com.qx.back.blocks.object.BkIndex;
import com.qx.back.blocks.object.BkObject;
import com.qx.back.blocks.object.ObjectsBlock;
import com.qx.back.io.bohr.BohrObject;
import com.qx.back.io.webgl.appearances.WebGL_OldStyle;
import com.qx.back.io.webgl.appearances.WebGL_AppearanceBase;
import com.qx.back.io.webgl.programs.WebGL_ProgramSources;
import com.qx.back.io.webgl.programs.WebGL_ProgramsBase;
import com.qx.back.lang.xml.XML_Context;


@BkType(code=0x00001200, sub= {})
public class WebGL_Service extends BkObject {

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

	@BkMethod(code=0x04)
	public BohrObject getStyle(ByteInput inflow) throws Exception{
		String id = inflow.getStringUTF8();
		WebGL_OldStyle style = styles.get(id);
		if(style==null){
			throw new Exception("No style for id="+id);	
		}
		return style.toBohr();
	}
	
	
	@BkMethod(code=0x08)
	public BohrObject getProgram(ByteInput inflow) throws Exception{
		String id = inflow.getStringUTF8();
		WebGL_ProgramSources programSources = programs.get(id);
		if(programSources==null) {
			throw new Exception("No prgm for id="+id);
		}
		return programSources.toBohr();
	}
}
