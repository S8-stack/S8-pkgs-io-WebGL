package com.qx.io.webgl;

import com.qx.blocks.BkAddress;
import com.qx.blocks.BkPath;
import com.qx.blocks.objects.BkIndex;

public class WebGL_Back {

	public final static int WEBGL_BOHR_PREFIX = 0x000a0000;

	public final static long WEBGL_BK_ZONE = 0x120000;

	public final static BkAddress SERVICE_ADDRESS = new BkAddress(
			new BkPath(WEBGL_BK_ZONE+0x0a), // path
			new BkIndex(0x08)); // index
}
