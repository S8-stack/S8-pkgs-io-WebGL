
/**
 * CAD_Engine
 * 
 */
function WebGL_ShapeConfiguration(){

	// Material
	
	/** the default program for wire rendering */
	this.wireProgram = "color2";
	
	/** default value for shape material */
	this.wireColor = [0.12, 0.12, 0.12, 0.0];

	/** the default program for wire rendering */
	this.surfaceProgram = "standard";
	
	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceGlossiness = 0.7;
	
	/** default value for shape material -> "Standard" Unity-style shading */
	this.surfaceRoughness = 0.5;
	
	/** default value for shape material -> Phong shading */
	this.surfaceShininess = 0.5;
	
	/** default value for shape material -> multi-purposes */
	this.surfaceSpecularColor = [0.12, 0.8, 0.8, 0.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceDiffuseColor = [0.12, 0.8, 0.8, 0.0];

	/** default value for shape material -> multi-purposes */
	this.surfaceAmbientColor = [0.1, 0.1, 0.1, 0.0];
	
	
	// Geometry Attributes
	
	/** wire */
	this.isWireEnabled = true;
	
	/** wire */
	this.isWireColorAttributeEnabled = true;

	/** surface */
	this.isSurfaceEnabled = true;

	/** surface normal */
	this.isSurfaceNormalAttributeEnabled = true;
	
	/** surface tex coord */
	this.isSurfaceTexCoordAttributeEnabled = false;
	
	/** surface color */
	this.isSurfaceColorAttributeEnabled = false;
	
	/** surface {U,V}-tangent */
	this.isSurfaceTangentAttributeEnabled = false;
	
}


WebGL_ShapeConfiguration.prototype = {

		apply : function(shape){
			
			// material part
			shape.wireProgram = this.wireProgram;
			shape.wireColor = this.wireColor;

			shape.surfaceProgram = this.surfaceProgram;
			shape.surfaceGlossiness = this.surfaceGlossiness;
			shape.surfaceRoughness = this.surfaceRoughness;
			shape.surfaceShininess = this.surfaceShininess;
			shape.surfaceSpecularColor = this.surfaceSpecularColor;
			shape.surfaceDiffuseColor = this.surfaceDiffuseColor;
			shape.surfaceAmbientColor = this.surfaceAmbientColor;
			
			// geometry attributes
			shape.isWireEnabled = this.isWireEnabled;
			shape.isWireColorAttributeEnabled = this.isWireColorAttributeEnabled;
			
			shape.isSurfaceEnabled = this.isSurfaceEnabled;
			shape.isSurfaceNormalAttributeEnabled = this.isSurfaceNormalAttributeEnabled;
			shape.isSurfaceTexCoordAttributeEnabled = this.isSurfaceTexCoordAttributeEnabled;
			shape.isSurfaceColorAttributeEnabled = this.isSurfaceColorAttributeEnabled;
			shape.isSurfaceTangentAttributeEnabled = this.isSurfaceTangentAttributeEnabled;
		}
};
