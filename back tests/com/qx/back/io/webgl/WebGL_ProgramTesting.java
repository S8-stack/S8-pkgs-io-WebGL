package com.qx.back.io.webgl;

import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.qx.back.base.bytes.BufferByteInflow;
import com.qx.back.base.bytes.BufferByteOutflow;
import com.qx.back.base.bytes.ByteInflow;
import com.qx.back.base.bytes.ByteOutflow;
import com.qx.back.blocks.base.BkBase;
import com.qx.back.blocks.block.BkPath;
import com.qx.back.blocks.block.Block;
import com.qx.back.blocks.tests.example.MyPipeLine;
import com.qx.back.blocks.tests.extensions.MathVector3dField;
import com.qx.back.blocks.type.BkContext;
import com.qx.back.blocks.type.fields.PrimitiveBkFieldHandler;

public class WebGL_ProgramTesting {

	public static void main(String[] args) throws Exception {
		
		/* <setup> */

		// getting FileChannel from file
		Path root = Paths.get("data/");

		BkContext context = new BkContext(
				new PrimitiveBkFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				MyPipeLine.class);


		BkBase base = new BkBase(context, root, 4, true);

		Block block = base.getBlock(new BkPath("0000000001000012"));
		
		WebGL_Service service = new WebGL_Service(block, Block.ROOT_INDEX);
		
		ByteBuffer buffer = ByteBuffer.allocate(1024);
		ByteOutflow outflow = new BufferByteOutflow(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInflow inflow = new BufferByteInflow(buffer);
		
		System.out.println(service.getProgram(inflow).getCode());
	}
}
