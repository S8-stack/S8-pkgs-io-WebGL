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
import com.qx.back.blocks.BlockPath;
import com.qx.back.blocks.objects.ObjectsBucket;
import com.qx.back.blocks.objects.type.BkTypesContext;
import com.qx.back.blocks.objects.type.fields.PrimitiveFieldHandler;
import com.qx.back.blocks.tests.extensions.MathVector3dField;

public class WebGL_ProgramTesting {

	public static void main(String[] args) throws Exception {
		
		/* <setup> */

		// getting FileChannel from file
		Path root = BkBase.DEBUG_UNIFIED_DB_ROOT;

		BkTypesContext objectContext = new BkTypesContext(
				new PrimitiveFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				WebGL_Service.class);
		
		ObjectsBucket.Prototype proto = new ObjectsBucket.Prototype(objectContext);
		
		BlockContext context = new BlockContext(new Block.Prototype[] { proto });
		
		BkBase base = new BkBase(context, root, 4, true);

		BlockPath staticPath = WebGL_Back.SERVICE_ADDRESS.path;
		ObjectsBucket block = proto.createBlock(base.getBucketHandler(staticPath));
		
		WebGL_Service service = new WebGL_Service(block, WebGL_Back.SERVICE_ADDRESS.index);
		
		base.save();
		
		block = (ObjectsBucket) base.getBucketHandler(WebGL_Back.SERVICE_ADDRESS.path).block;
		service = (WebGL_Service) block.getObject(WebGL_Back.SERVICE_ADDRESS.index);
		
		ByteBuffer buffer = ByteBuffer.allocate(1024);
		ByteOutput outflow = new BufferByteOutput(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInput inflow = new BufferByteInput(buffer);
		
		System.out.println(service.getProgram(inflow));
	}
}
