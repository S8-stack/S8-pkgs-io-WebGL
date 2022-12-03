package com.s8.io.swgl.appearances;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.models.SWGL_Mesh;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Renderer<A extends SWGL_Appearance> extends NeObject {

	private Map<String, A> map = new HashMap<String, A>();
	
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Renderer(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"appearances/SWGL_Renderer");
	}
	
	
	/**
	 * 
	 * @param program
	 */
	public void setProgram(SWGL_Program program) {
		vertex.setObj("program", program);
	}
	

	/**
	 * 
	 * @param appearances
	 */
	public void setAppearances(ArrayList<A> appearances) {
		vertex.setObjList("appearances", appearances);
	}
	
	/**
	 * 
	 * @param appearance
	 */
	public void appendAppearance(A appearance) {
		vertex.addObjToList("appearances", appearance);
	}
	
	
	
	public void append(String name, SWGL_Mesh model) {
		
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
		vertex.addObjToList("appearances", appearance);
	}
	
	
	

}
