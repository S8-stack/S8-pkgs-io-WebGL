package com.s8.io.swgl.scene.pipes;

import java.util.List;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.scene.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public abstract class SWGL_Appearance extends WebS8Object {
	

	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Appearance(WebS8Session branch, String typeName) {
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
