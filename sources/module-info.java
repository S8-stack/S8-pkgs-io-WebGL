/**
 * 
 */
/**
 * @author pc
 *
 */
module com.qx.level1.io.webgl {
	
	exports com.qx.level1.io.webgl._meta;
	exports com.qx.level1.io.webgl;
	exports com.qx.level1.io.webgl.appearances;
	exports com.qx.level1.io.webgl.shapes;
	exports com.qx.level1.io.webgl.programs;

	requires transitive com.qx.level0.utilities;
	requires transitive com.qx.level0.lang.xml;
	requires transitive com.qx.level0.maths;
	requires transitive com.qx.level0.web;
	requires transitive com.qx.level0.db.blocks;
	requires transitive com.qx.level1.maths;
	requires transitive com.qx.level0.io.bohr;
	
}