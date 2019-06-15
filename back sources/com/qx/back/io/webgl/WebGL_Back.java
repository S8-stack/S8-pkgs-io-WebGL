package com.qx.back.io.webgl;

import com.qx.back.blocks.base.BkAddress;
import com.qx.back.blocks.block.BkPath;
import com.qx.back.blocks.object.BkIndex;

public class WebGL_Back {

	public final static int WEBGL_BOHR_PREFIX = 0x000a0000;

	public final static long WEBGL_BK_ZONE = 0x120000;

	public final static BkAddress SERVICE_ADDRESS = new BkAddress(
			new BkPath(WEBGL_BK_ZONE+0x0a), // path
			new BkIndex(0x08)); // index
}
