package com.qx.level1.io.webgl;

import java.io.IOException;

import com.qx.base.bytes.ByteOutflow;
import com.qx.web.io.bohr.BohrObject;
import com.qx.web.io.bohr.BohrScope;

/**
 * 
 * @author pc
 *
 */
public class WebGL_MeshOptions extends BohrObject {



	/**
	 * Enables the wire on the shape
	 */
	public boolean isWireEnabled = true;


	/**
	 * Enables per vertex color attribute
	 */
	public boolean isWireColorAttributeEnabled = false;


	/**
	 * Enables the surface part
	 */
	public boolean isSurfaceEnabled = true;


	/**
	 * Enables normals for the surface
	 */
	public boolean isSurfaceNormalAttributeEnabled = true;


	/**
	 * Enables tex coordinates for the surface. Disabled by default.
	 */
	public boolean isSurfaceTexCoordAttributeEnabled = false;


	/**
	 * Enable surface color per vertex attribute. Disabled by default.
	 */
	public boolean isSurfaceColorAttributeEnabled = false;


	/**
	 * Enable surface U-tangent and V-tangent (bump mapping shader). Disabled by default.
	 */
	public boolean isSurfaceTangentAttributeEnabled = false;

	public final static int TYPE_CODE = 200;

	@Override
	public int getTypeCode() {
		return WebGL_Back.WEBGL_BOHR_PREFIX+TYPE_CODE;
	}

	@Override
	public void send(ByteOutflow output) throws IOException {

		// geometry attributes
		boolean[] options = new boolean[8];
		options[0] = isWireEnabled;
		options[1] = isWireColorAttributeEnabled;
		options[2] = isSurfaceEnabled;
		options[3] = isSurfaceNormalAttributeEnabled;
		options[4] = isSurfaceTexCoordAttributeEnabled;
		options[5] = isSurfaceColorAttributeEnabled;
		options[6] = isSurfaceTangentAttributeEnabled;
		output.putFlags(options);
	}

	@Override
	public void getSubNodes(BohrScope scope) {
		// none
	}



}
