package com.s8.pkgs.io.webgl.scene.pipes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Pipe<A extends SWGL_Appearance> extends S8WebObject {

	private Map<String, A> map = new HashMap<String, A>();
	
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Pipe(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/SWGL_Pipe");
	}
	
	
	/**
	 * 
	 * @param program
	 */
	public void setProgram(SWGL_Program program) {
		vertex.outbound().setObjectField("program", program);
	}
	

	/**
	 * 
	 * @param appearances
	 */
	public void setAppearances(List<A> appearances) {
		vertex.outbound().setObjectListField("appearances", appearances);
	}
	
	public void setAppearances(A[] appearances) {
		vertex.outbound().setObjectListField("appearances", appearances);
	}
	

	public void setAppearance(A appearance) {
		vertex.outbound().setObjectListField("appearances", appearance);
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
		ArrayList<A> list = new ArrayList<>();
		list.add(appearance);
		vertex.outbound().setObjectListField("appearances", list);
		
	}


	
	

}
