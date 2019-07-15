package com.qx.back.io.webgl;

import com.qx.back.blocks.BkBase;
import com.qx.back.blocks.Block;
import com.qx.back.blocks.BlockContext;
import com.qx.back.blocks.BlockHandler;
import com.qx.back.blocks.BlockPath;
import com.qx.back.blocks.objects.ObjectsBlock;
import com.qx.back.blocks.objects.type.BkTypesContext;

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
