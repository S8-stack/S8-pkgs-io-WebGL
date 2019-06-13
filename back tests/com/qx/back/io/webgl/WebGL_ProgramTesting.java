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
import com.qx.back.blocks.block.BlocksContext;
import com.qx.back.blocks.object.BkObjectsContext;
import com.qx.back.blocks.object.ObjectsBlock;
import com.qx.back.blocks.object.type.fields.PrimitiveBkFieldHandler;
import com.qx.back.blocks.tests.example.MyPipeLine;
import com.qx.back.blocks.tests.extensions.MathVector3dField;

public class WebGL_ProgramTesting {

	public static void main(String[] args) throws Exception {
		
		/* <setup> */

		// getting FileChannel from file
		Path root = Paths.get("data/");

		
		BlocksContext blocksContext = new BlocksContext(new Block.Prototype[] {
				ObjectsBlock.PROTOTYPE		
		});
		BkObjectsContext objectContext = new BkObjectsContext(
				new PrimitiveBkFieldHandler.Builder[] {
						new MathVector3dField.Builder()
				}, 
				MyPipeLine.class);


		BkBase base = new BkBase(blocksContext, objectContext, root, 4, true);

		ObjectsBlock block = (ObjectsBlock) base.getBlock(new BkPath("0000000001000012"));
		
		WebGL_Service service = new WebGL_Service(block, ObjectsBlock.ROOT_INDEX);
		
		ByteBuffer buffer = ByteBuffer.allocate(1024);
		ByteOutput outflow = new BufferByteOutput(buffer);
		outflow.putStringUTF8("standard");
		buffer.flip();
		ByteInput inflow = new BufferByteInput(buffer);
		
		System.out.println(service.getProgram(inflow).getCode());
	}
}
