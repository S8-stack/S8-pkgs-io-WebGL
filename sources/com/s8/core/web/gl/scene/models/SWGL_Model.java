package com.s8.core.web.gl.scene.models;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.core.web.gl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Model extends S8WebFrontObject {


	public SWGL_Model(S8WebFront branch) {
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
