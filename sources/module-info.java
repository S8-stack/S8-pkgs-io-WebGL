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

	requires transitive com.qx.level0.utilities;
	requires transitive com.qx.level0.lang.xml;
	requires transitive com.qx.level0.maths;
	requires transitive com.qx.level1.maths;
	requires transitive com.qx.level1.io.bohr;
	requires transitive com.qx.level0.web;
	requires transitive com.qx.level0.blocks;
}