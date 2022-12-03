package com.s8.io.swgl.models;

import java.util.List;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.swgl.SWGL_Root;
import com.s8.io.swgl.maths.SWGL_Vector;

public class NbMesh extends NeObject {


	public NbMesh(NeBranch branch) {
		super(branch, SWGL_Root.WEB+"models/NbMesh");
	}



	/** @param {Float32Array} coefficients */
	public void setMatrix(float[] affine) {
		vertex.setFloat32Array("matrix", affine);
	}



	/**
	 * 
	 * @param points
	 */
	public void setPositionVertexAttributes(List<SWGL_Vector> points) {
		if(points != null) {
			int nVertices = points.size();
			float[] buffer = new float[3 * nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = points.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
				buffer[i++] = vector.getZFloat();
			}
			vertex.setFloat32Array("positions", buffer);	
		}
	}


	/**
	 * 
	 * @param normals
	 */
	public void setNormalVertexAttributes(List<SWGL_Vector> normals) {
		if(normals != null) {
			int nVertices = normals.size();
			float[] buffer = new float[3*nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = normals.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
				buffer[i++] = vector.getZFloat();
			}
			vertex.setFloat32Array("normals", buffer);	
		}
	}



	/**
	 * 
	 * @param uTangents
	 */
	public void setUTangentVertexAttributes(List<SWGL_Vector> uTangents) {
		if(uTangents != null) {
			int nVertices = uTangents.size();
			float[] buffer = new float[3*nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = uTangents.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
				buffer[i++] = vector.getZFloat();
			}
			vertex.setFloat32Array("uTangents", buffer);	
		}
	}


	/**
	 * 
	 * @param vTangents
	 */
	public void setVTangentVertexAttributes(List<SWGL_Vector> vTangents) {
		if(vTangents != null) {
			int nVertices = vTangents.size();
			float[] buffer = new float[3*nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = vTangents.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
				buffer[i++] = vector.getZFloat();
			}
			vertex.setFloat32Array("vTangents", buffer);
		}

	}



	/**
	 * 
	 * @param texCoords
	 */
	public void setTexCoordVertexAttributes(List<SWGL_Vector> texCoords) {
		if(texCoords != null) {
			int nVertices = texCoords.size();
			float[] buffer = new float[2 * nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = texCoords.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
			}
			vertex.setFloat32Array("texCoords", buffer);	
		}
	}

	/**
	 * 
	 * @param colors
	 */
	public void setColorVertexAttributes(List<SWGL_Vector> colors) {
		if(colors != null) {
			int nVertices = colors.size();
			float[] buffer = new float[3*nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = colors.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
				buffer[i++] = vector.getZFloat();
			}
			vertex.setFloat32Array("colors", buffer);	
		}
	}
	
	
	/**
	 * 
	 * @param colors
	 */
	public void setAppCoordsAttributes(List<SWGL_Vector> appCoords) {
		if(appCoords != null) {
			int nVertices = appCoords.size();
			float[] buffer = new float[3*nVertices];
			SWGL_Vector vector;
			int i = 0;
			for(int index = 0; index < nVertices; index ++) {
				vector = appCoords.get(index);
				buffer[i++] = vector.getXFloat();
				buffer[i++] = vector.getYFloat();
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
