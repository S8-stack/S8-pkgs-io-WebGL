package com.qx.io.webgl.tests;

import com.qx.blocks.BkBase;
import com.qx.blocks.Block;
import com.qx.blocks.BlockContext;
import com.qx.blocks.BlockHandler;
import com.qx.blocks.BlockPath;
import com.qx.blocks.objects.ObjectsBlock;
import com.qx.blocks.objects.type.BkTypesContext;
import com.qx.io.webgl.WebGL_Back;
import com.qx.io.webgl.WebGL_Service;

/**
 * 
 * @author pc
 *
 */
public class WebGL_BaseFill {
	
	
	public static void main(String[] args) throws Exception {
		
		BkTypesContext objectsContext = new BkTypesContext(WebGL_Back.class);
		ObjectsBlock.Prototype blockProto = new ObjectsBlock.Prototype(objectsContext);
		BlockContext context = new BlockContext(new Block.Prototype[] { blockProto });
		BkBase base = new BkBase(context, BkBase.DEBUG_UNIFIED_DB_ROOT, 4, true);
		
		BlockHandler handler = base.getBlockHandler(new BlockPath("080008"));
		ObjectsBlock block = new ObjectsBlock(handler, blockProto);
		
		new WebGL_Service(block, ObjectsBlock.ROOT_INDEX);
		
		base.save();
		
	}

	
}
