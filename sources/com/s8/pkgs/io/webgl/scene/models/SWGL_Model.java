package com.s8.pkgs.io.webgl.scene.models;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebFrontObject;
import com.s8.pkgs.io.webgl.WebSources;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Model extends S8WebFrontObject {


	public SWGL_Model(S8WebFront branch) {
		super(branch, WebSources.ROOT + "scene/models/SWGL_Model");
	}



	/** @param {Float32Array} coefficients */
	public void setMatrix(float[] affine) {
		vertex.outbound().setFloat32ArrayField("matrix", affine);
	}
	
	

	/** @param {Float32Array} coefficients */
	public void setMesh(SWGL_Mesh mesh) {
		vertex.outbound().setObjectField("mesh", mesh);
	}


}
