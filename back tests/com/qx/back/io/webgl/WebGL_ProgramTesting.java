package com.qx.back.io.webgl;

import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.qx.back.base.bytes.BufferByteInput;
import com.qx.back.base.bytes.BufferByteOutput;
import com.qx.back.base.bytes.ByteInput;
import com.qx.back.base.bytes.ByteOutput;
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
		ByteOutput outflow = new BufferByteOutput(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInput inflow = new BufferByteInput(buffer);
		
		System.out.println(service.getProgram(inflow).getCode());
	}
}
