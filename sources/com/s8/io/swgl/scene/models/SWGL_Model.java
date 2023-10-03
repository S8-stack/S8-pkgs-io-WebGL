package com.s8.io.swgl.scene.models;

import com.s8.api.objects.web.WebS8Object;
import com.s8.api.objects.web.WebS8Session;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Model extends WebS8Object {


	public SWGL_Model(WebS8Session branch) {
		super(branch, SWGL_Root.WEB+"scene/models/SWGL_Model");
	}



	/** @param {Float32Array} coefficients */
	public void setMatrix(float[] affine) {
		vertex.fields().setFloat32ArrayField("matrix", affine);
	}
	
	

	/** @param {Float32Array} coefficients */
	public void setMesh(SWGL_Mesh mesh) {
		vertex.fields().setObjectField("mesh", mesh);
	}


}
