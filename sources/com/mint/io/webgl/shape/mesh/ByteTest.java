package com.mint.io.webgl.shape.mesh;

public class ByteTest {

	public static void main(String[] args){

		
		byte b;
		for(int i=0; i<266; i++){
			b=(byte)(i & 0xFF);
			System.out.println(i+" byte0: "+String.format("%02X ", b));
		}
		
		int number = 256*256-1;

		byte b0 = (byte)(number & 0xFF);
		byte b1 = (byte)((number >> 8) & 0xFF);
		byte b2 = (byte)((number >> 16) & 0xFF);
		byte b3 = (byte)((number >> 24) & 0xFF);

		
		System.out.println("byte0:"+String.format("%02X ", b0));
		System.out.println("byte1:"+String.format("%02X ", b1));
		System.out.println("byte2:"+String.format("%02X ", b2));
		System.out.println("byte3:"+String.format("%02X ", b3));

		
	}
}
