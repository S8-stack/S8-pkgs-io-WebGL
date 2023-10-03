package com.s8.io.swgl.scene.pipes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.scene.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Pipe<A extends SWGL_Appearance> extends WebS8Object {

	private Map<String, A> map = new HashMap<String, A>();
	
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Pipe(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/pipes/SWGL_Pipe");
	}
	
	
	/**
	 * 
	 * @param program
	 */
	public void setProgram(SWGL_Program program) {
		vertex.fields().setObjectField("program", program);
	}
	

	/**
	 * 
	 * @param appearances
	 */
	public void setAppearances(ArrayList<A> appearances) {
		vertex.fields().setObjectListField("appearances", appearances);
	}
	
	/**
	 * 
	 * @param appearance
	 */
	public void appendAppearance(A appearance) {
		vertex.fields().addObjToList("appearances", appearance);
	}
	
	
	
	public void append(String name, SWGL_Model model) {
		
	}
	
	
	/**
	 * 
	 * @param name
	 * @param appearance
	 */
	public void define(String name, A appearance) {
		
		// keep track through mapping
		map.put(name, appearance);
		
		// appearance
		vertex.fields().addObjToList("appearances", appearance);
	}
	
	
	

}
