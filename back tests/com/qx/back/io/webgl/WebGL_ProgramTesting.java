package com.qx.back.io.webgl;

import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.qx.back.base.bytes.BufferByteInput;
import com.qx.back.base.bytes.BufferByteOutput;
import com.qx.back.base.bytes.ByteInput;
import com.qx.back.base.bytes.ByteOutput;
import com.qx.back.blocks.base.BkBase;
import com.qx.back.blocks.block.BkContext;
import com.qx.back.blocks.block.BkPath;
import com.qx.back.blocks.block.Block;
import com.qx.back.blocks.object.BkObjectsContext;
import com.qx.back.blocks.object.ObjectsBlock;
import com.qx.back.blocks.object.type.fields.PrimitiveBkFieldHandler;
import com.qx.back.blocks.tests.extensions.MathVector3dField;

public class WebGL_ProgramTesting {

	public static void main(String[] args) throws Exception {
		
		/* <setup> */

		// getting FileChannel from file
		Path root = Paths.get("data/");

		BkObjectsContext objectContext = new BkObjectsContext(
				new PrimitiveBkFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				WebGL_Service.class);
		
		ObjectsBlock.Prototype proto = new ObjectsBlock.Prototype(objectContext);
		
		BkContext context = new BkContext(new Block.Prototype[] { proto });
		
		BkBase base = new BkBase(context, root, 4, true);

		BkPath staticPath = WebGL_Back.SERVICE_ADDRESS.path;
		ObjectsBlock block = proto.createBlock(base.getBlockHandler(staticPath));
		
		WebGL_Service service = new WebGL_Service(block, WebGL_Back.SERVICE_ADDRESS.index);
		
		base.save();
		
		block = (ObjectsBlock) base.getBlockHandler(WebGL_Back.SERVICE_ADDRESS.path).block;
		service = (WebGL_Service) block.getObject(WebGL_Back.SERVICE_ADDRESS.index);
		
		ByteBuffer buffer = ByteBuffer.allocate(1024);
		ByteOutput outflow = new BufferByteOutput(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInput inflow = new BufferByteInput(buffer);
		
		System.out.println(service.getProgram(inflow).getVertexShaderSourceCode());
	}
}
