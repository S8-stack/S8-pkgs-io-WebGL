package com.s8.ng.geo.nebulae.models;

import java.util.List;

import com.s8.core.maths.space2d.MathVector2d;
import com.s8.core.maths.space3d.MathAffine3d;
import com.s8.core.maths.space3d.MathVector3d;
import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;

public class NbMesh extends NeObject {


	public NbMesh(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"models/NbMesh");
	}



	/** @param {Float32Array} coefficients */
	public void setMatrix(MathAffine3d affine) {
		vertex.setFloat32Array("matrix", affine.toFloat32Array());
	}



	/**
	 * 
	 * @param points
	 */
	public void setPositionVertexAttributes(List<MathVector3d> points) {
		if(points != null) {
			int nVertices = points.size();
			float[] buffer = new float[3*nVertices];
			MathVector3d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = points.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
				buffer[i++] = (float) vector.z;
			}
			vertex.setFloat32Array("positions", buffer);	
		}
	}


	/**
	 * 
	 * @param normals
	 */
	public void setNormalVertexAttributes(List<MathVector3d> normals) {
		if(normals != null) {
			int nVertices = normals.size();
			float[] buffer = new float[3*nVertices];
			MathVector3d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = normals.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
				buffer[i++] = (float) vector.z;
			}
			vertex.setFloat32Array("normals", buffer);	
		}
	}



	/**
	 * 
	 * @param uTangents
	 */
	public void setUTangentVertexAttributes(List<MathVector3d> uTangents) {
		if(uTangents != null) {
			int nVertices = uTangents.size();
			float[] buffer = new float[3*nVertices];
			MathVector3d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = uTangents.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
				buffer[i++] = (float) vector.z;
			}
			vertex.setFloat32Array("uTangents", buffer);	
		}
	}


	/**
	 * 
	 * @param vTangents
	 */
	public void setVTangentVertexAttributes(List<MathVector3d> vTangents) {
		if(vTangents != null) {
			int nVertices = vTangents.size();
			float[] buffer = new float[3*nVertices];
			MathVector3d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = vTangents.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
				buffer[i++] = (float) vector.z;
			}
			vertex.setFloat32Array("vTangents", buffer);
		}

	}



	/**
	 * 
	 * @param texCoords
	 */
	public void setTexCoordVertexAttributes(List<MathVector2d> texCoords) {
		if(texCoords != null) {
			int nVertices = texCoords.size();
			float[] buffer = new float[2 * nVertices];
			MathVector2d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = texCoords.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
			}
			vertex.setFloat32Array("texCoords", buffer);	
		}
	}

	/**
	 * 
	 * @param colors
	 */
	public void setColorVertexAttributes(List<MathVector3d> colors) {
		if(colors != null) {
			int nVertices = colors.size();
			float[] buffer = new float[3*nVertices];
			MathVector3d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = colors.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
				buffer[i++] = (float) vector.z;
			}
			vertex.setFloat32Array("colors", buffer);	
		}
	}
	
	
	/**
	 * 
	 * @param colors
	 */
	public void setAppCoordsAttributes(List<MathVector2d> appCoords) {
		if(appCoords != null) {
			int nVertices = appCoords.size();
			float[] buffer = new float[3*nVertices];
			MathVector2d vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = appCoords.get(index);
				buffer[i++] = (float) vector.x;
				buffer[i++] = (float) vector.y;
			}
			vertex.setFloat32Array("appCoords", buffer);	
		}
	}



	/**
	 * 
	 * @param colors
	 */
	public void setIndices(int dimension, List<Integer> indices) {
		vertex.setUInt8("dimension", dimension);

		int n = indices.size();
		long[] buffer = new long[n];
		for(int i = 0; i < n; i ++) {
			buffer[i] = indices.get(i);
		}
		vertex.setUInt32Array("indices", buffer);	
	}

}
