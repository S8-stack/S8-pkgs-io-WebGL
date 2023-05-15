package com.s8.io.swgl.scene.models;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;


/**
 * 
 * @author pierreconvert
 *
 */
public class SWGL_Mesh extends NeObject {


	public SWGL_Mesh(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"scene/models/SWGL_Mesh");
	}


	/**
	 * 
	 * @param points
	 */
	public void setPositionVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("positions", data);	
		}
	}


	/**
	 * 
	 * @param normals
	 */
	public void setNormalVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("normals", data);	
		}
	}



	/**
	 * 
	 * @param uTangents
	 */
	public void setUTangentVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("uTangents", data);	
		}
	}


	/**
	 * 
	 * @param vTangents
	 */
	public void setVTangentVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("vTangents", data);
		}
	}



	/**
	 * 
	 * @param texCoords
	 */
	public void setTexCoordVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("texCoords", data);	
		}
	}

	/**
	 * 
	 * @param colors
	 */
	public void setColorVertexAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("colors", data);	
		}
	}
	
	
	/**
	 * 
	 * @param colors
	 */
	public void setAppCoordsAttributes(float[] data) {
		if(data != null) {
			vertex.setFloat32ArrayField("appCoords", data);	
		}
	}



	/**
	 * 
	 * @param colors
	 */
	public void setIndices(int dimension, long[] data) {
		vertex.setUInt8Field("dimension", dimension);
		vertex.setUInt32ArrayField("indices", data);	
	}

}
