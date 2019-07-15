package com.qx.back.io.webgl;

import java.nio.ByteBuffer;
import java.nio.file.Path;

import com.qx.back.base.bytes.BufferByteInput;
import com.qx.back.base.bytes.BufferByteOutput;
import com.qx.back.base.bytes.ByteInput;
import com.qx.back.base.bytes.ByteOutput;
import com.qx.back.blocks.BkBase;
import com.qx.back.blocks.Block;
import com.qx.back.blocks.BlockContext;
import com.qx.back.blocks.objects.ObjectsBlock;
import com.qx.back.blocks.objects.extensions.MathVector3dField;
import com.qx.back.blocks.objects.type.BkTypesContext;
import com.qx.back.blocks.objects.type.fields.PrimitiveBkFieldHandler;

public class WebGL_ProgramTesting02 {

	public static void main(String[] args) throws Exception {
		
		/* <setup> */

		// getting FileChannel from file
		Path root = BkBase.DEBUG_UNIFIED_DB_ROOT;

		BkTypesContext objectContext = new BkTypesContext(
				new PrimitiveBkFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				WebGL_Service.class);
		
		ObjectsBlock.Prototype proto = new ObjectsBlock.Prototype(objectContext);
		
		BlockContext context = new BlockContext(new Block.Prototype[] { proto });
		
		BkBase base = new BkBase(context, root, 4, true);

		
		System.out.println("Look-up at: "+WebGL_Back.SERVICE_ADDRESS);
		ObjectsBlock block = (ObjectsBlock) base.getBlockHandler(WebGL_Back.SERVICE_ADDRESS.path).block;
		WebGL_Service service = (WebGL_Service) block.getObject(WebGL_Back.SERVICE_ADDRESS.index);
		
		ByteBuffer buffer = ByteBuffer.allocate(1024);
		ByteOutput outflow = new BufferByteOutput(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInput inflow = new BufferByteInput(buffer);
		
		System.out.println(service.getProgram(inflow));
	}
}
