package com.s8.pkgs.io.webgl.scene.pipes;

import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.scene.models.SWGL_Model;


/**
 * 
 * @author pierreconvert
 *
 */
public abstract class SWGL_Appearance extends S8WebObject {
	

	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public SWGL_Appearance(S8WebFront branch, String typeName) {
		super(branch, typeName);
	}
	
	
	
	public void setModels(List<SWGL_Model> models) {
		vertex.outbound().setObjectListField("models", models);
	}
	
	public void setModel(SWGL_Model model) {
		vertex.outbound().setObjectListField("models", new SWGL_Model[] { model });
	}
	
	
}
