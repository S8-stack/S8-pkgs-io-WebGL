package com.s8.pkgs.io.webgl.scene.pipes.phys2;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.scene.pipes.SWGL_Appearance;
import com.s8.pkgs.io.webgl.utilities.SWGL_Texture2d;


/**
 * 
 * @author pierreconvert
 *
 */
public class Phys2Appearance extends SWGL_Appearance {


	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public Phys2Appearance(S8WebFront branch) {
		super(branch, WebSources.ROOT+"scene/pipes/phys2/Phys2Appearance");
	}


	/**
	 * 
	 * @param texture
	 */
	public void setMatProperties(SWGL_Texture2d texture) {
		vertex.outbound().setObjectField("matProperties", texture);
	}


	/**
	 * 
	 * @param texture
	 */
	public void setMatDiffuseColors(SWGL_Texture2d texture) {
		vertex.outbound().setObjectField("matDiffuseColors", texture);
	}


	/**
	 * 
	 * @param texture
	 */
	public void setMatSpecularColors(SWGL_Texture2d texture) {
		vertex.outbound().setObjectField("matSpecularColors", texture);
	}



	/**
	 * @type {number} number of squares 
	 */
	public final static int TEXTURE_NB_SQUARES = 256;


	public final static int MAX_NB_MATERIALS = 256 * 256;

	/**
	 * @type {number} square size
	 */
	public final static int TEXTURE_SQUARE_SIZE = 4;


	/**
	 * 
	 * @param materialIndex
	 * @param texCoords
	 * @param offset
	 */
	public static float[] createTexCoordsFromMatIndex(int nVertices, int materialIndex) {
		
		int iy = materialIndex / TEXTURE_NB_SQUARES;
		int ix = materialIndex % TEXTURE_NB_SQUARES;
		
		float[] texCoords = new float[2 * nVertices];
		
		float x = (ix + 0.5f) * TEXTURE_SQUARE_SIZE;
		float y = (iy + 0.5f) * TEXTURE_SQUARE_SIZE;
		
		int offset = 0;
		for(int i = 0; i < nVertices; i++) {
			texCoords[offset + 0] = x;
			texCoords[offset + 1] = y;
			
			/* offset */
			offset +=2;
		}
		return texCoords;	
	}

}
