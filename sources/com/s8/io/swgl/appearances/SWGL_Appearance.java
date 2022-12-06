package com.s8.io.swgl.appearances;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public abstract class SWGL_Appearance extends NeObject {
	

	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Appearance(NeBranch branch, String typeName) {
		super(branch, typeName);
	}
	
	
	
	public void setModels(List<SWGL_Model> models) {
		vertex.setObjList("models", models);
	}
	
	/**
	 * 
	 * @param model
	 */
	public void appendModel(SWGL_Model model) {
		vertex.addObjToList("models", model);
	}
	
	
	/**
	 * 
	 * @param model
	 */
	public void remove(SWGL_Model model) {
		vertex.removeObjFromList("models", model);
	}

}
