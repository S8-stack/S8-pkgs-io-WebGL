package com.qx.back.io.webgl;

import com.qx.back.base.bytes.ByteInput;
import com.qx.back.blocks.BkException;
import com.qx.back.blocks.BkMethod;
import com.qx.back.blocks.BkType;
import com.qx.back.blocks.object.BkIndex;
import com.qx.back.blocks.object.BkObject;
import com.qx.back.blocks.object.ObjectsBlock;
import com.qx.back.io.webgl.programs.WebGL_ProgramSources;
import com.qx.back.io.webgl.programs.WebGL_ProgramsBase;
import com.qx.back.io.webgl.styles.WebGL_Style;
import com.qx.back.io.webgl.styles.WebGL_Styles;
import com.qx.back.lang.xml.XML_Context;


@BkType(code=0x00001200, sub= {})
public class WebGL_Service extends BkObject {

	private WebGL_ProgramsBase programs;
	
	private WebGL_Styles styles;


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
			
			context = new XML_Context(WebGL_Styles.class);
			styles = (WebGL_Styles) context.deserialize(WebGL_Style.class.getResourceAsStream("styles.xml"));
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
		
	
	}

	@BkMethod(code=0x04)
	public synchronized WebGL_Style getStyle(ByteInput inflow) throws Exception{
		String id = inflow.getStringUTF8();
		return styles.get(id);
	}
	
	
	@BkMethod(code=0x08)
	public synchronized WebGL_ProgramSources getProgram(ByteInput inflow) throws Exception{
		String id = inflow.getStringUTF8();
		return programs.get(id);
	}
}
