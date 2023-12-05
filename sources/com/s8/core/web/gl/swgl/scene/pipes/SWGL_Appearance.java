package com.s8.core.web.gl.swgl.scene.pipes;

import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.core.web.gl.swgl.scene.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public abstract class SWGL_Appearance extends S8WebFrontObject {
	

	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Appearance(S8WebFront branch, String typeName) {
		super(branch, typeName);
	}
	
	
	
	public void setModels(List<SWGL_Model> models) {
		vertex.fields().setObjectListField("models", models);
	}
	
	/**
	 * 
	 * @param model
	 */
	public void appendModel(SWGL_Model model) {
		vertex.fields().addObjToList("models", model);
	}
	
	
	/**
	 * 
	 * @param model
	 */
	public void remove(SWGL_Model model) {
		vertex.fields().removeObjFromList("models", model);
	}

}
