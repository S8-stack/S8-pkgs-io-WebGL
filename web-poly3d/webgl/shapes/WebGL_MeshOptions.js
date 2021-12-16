

function WebGL_MeshOptions(){
	// no affines (see WebGL_Object for space positioned model)

	/* <wire> */
	
	/** wire */
	this.isWireEnabled = true;

	/** wire */
	this.isWireColorAttributeEnabled = false;
	/* </wire> */
	
	/* <surface> */
	
	/** surface */
	this.isSurfaceEnabled = true;

	/** surface normal */
	this.isSurfaceNormalAttributeEnabled = true;

	/** surface tex coord */
	this.isSurfaceTexCoordAttributeEnabled = false;

	/** surface color */
	this.isSurfaceColorAttributeEnabled = false;

	/** surface {U,V}-tangents */
	this.isSurfaceTangentAttributeEnabled = false;

	/* </surface> */
}


BOHR_TYPES.set(WEBGL_BOHR_PREFIX+200, WebGL_MeshOptions);

WebGL_MeshOptions.prototype = {

		parse : function(input){
			
			// <geometry-attributes>
			var options = input.getBooleanArray8();
			
			this.isWireEnabled = options[0];
			this.isWireColorAttributeEnabled = options[1];
			
			this.isSurfaceEnabled = options[2];
			this.isSurfaceNormalAttributeEnabled = options[3];
			this.isSurfaceTexCoordAttributeEnabled = options[4];
			this.isSurfaceColorAttributeEnabled = options[5];
			this.isSurfaceTangentAttributeEnabled = options[6];
			
			// </geometry-attributes>
		}
};
