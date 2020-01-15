package com.qx.level1.io.webgl;

import static com.qx.level1.ng.nanos.NgMethodRole.LOOK_UP;

import com.qx.level0.db.blocks.BkException;
import com.qx.level0.db.blocks.objects.BkObjectHandle;
import com.qx.level0.lang.xml.XML_Context;
import com.qx.level1.io.bohr.BohrObject;
import com.qx.level1.io.webgl.appearances.WebGL_AppearanceBase;
import com.qx.level1.io.webgl.appearances.WebGL_OldStyle;
import com.qx.level1.io.webgl.programs.WebGL_ProgramSources;
import com.qx.level1.io.webgl.programs.WebGL_ProgramsBase;
import com.qx.level1.ng.NgNano;
import com.qx.level1.ng.objects.NgObject;
import com.qx.level1.ng.objects.NgObjectType;

/**
 * 
 * @author pc
 *
 */
public class WebGL_Service extends NgObject {

	/** prototype for type handling */
	public final static NgObjectType TYPE = new NgObjectType(WebGL_Service.class);
	public @Override NgObjectType getType() { return TYPE; }

	
	private WebGL_ProgramsBase programs;

	private WebGL_AppearanceBase styles;


	/**
	 * @throws BkException 
	 * 
	 */
	public WebGL_Service(BkObjectHandle handle) {
		super(handle);
		
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

	public @NgNano(code=0x04, method = LOOK_UP) BohrObject getStyle(String id) throws Exception {
		WebGL_OldStyle style = styles.get(id);
		if(style==null){
			throw new Exception("No style for id="+id);	
		}
		return style.toBohr();
	}


	public @NgNano(code=0x06, method = LOOK_UP) BohrObject getProgram(String id) throws Exception{
		WebGL_ProgramSources programSources = programs.get(id);
		if(programSources==null) {
			throw new Exception("No prgm for id="+id);
		}
		return programSources.toBohr();
	}

	@Override
	public void runPostDeserial() {
		
	}

	@Override
	public void runPreSerial() {
		
	}

}
