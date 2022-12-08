package com.s8.io.swgl.models;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Model extends NeObject {


	public SWGL_Model(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"models/SWGL_Model");
	}



	/** @param {Float32Array} coefficients */
	public void setMatrix(float[] affine) {
		vertex.setFloat32Array("matrix", affine);
	}
	
	

	/** @param {Float32Array} coefficients */
	public void setMesh(SWGL_Mesh mesh) {
		vertex.setObj("mesh", mesh);
	}
	

	/** 
	 * 
	 * @param {} coefficients 
	 * 
	 */
	public void setUpdaters(List<NeObject> updaters) {
		vertex.setObjList("updaters", updaters);
	}



}
