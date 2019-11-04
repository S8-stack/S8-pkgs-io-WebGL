/**
 * 
 */
/**
 * @author pc
 *
 */
module com.qx.io.webgl {
	
	
	exports com.qx.level1.io.webgl;
	exports com.qx.level1.io.webgl.programs;
	exports com.qx.level1.io.webgl.appearances;
	exports com.qx.io.webgl.tests;

	requires transitive com.qx.base;
	requires transitive com.qx.blocks;
	requires transitive com.qx.level0.lang.xml;
	requires transitive com.qx.level0.maths;
	requires transitive com.qx.level1.maths;
	requires transitive com.qx.web.io.bohr;
}