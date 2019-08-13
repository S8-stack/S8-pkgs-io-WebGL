

/**
 * canvas
 */
var canvas;

/**
 * WebGL context
 */
var gl;

/**
 * Scene
 */
var scene;


var logNode;


var glBkAddress;

/**
 * startup function
 */
var WebGL_start = function(){


	// WebGL_Service static address
	glBkAddress = new Uint8Array(
			[0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x08, // path
				0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08]); // index	


	/**
	 * Global variable
	 * Note that the canvas element has ALWAYS id = "WebGL_Canvas"
	 */
	canvas = document.getElementById("WebGL_Canvas");
	var pxComputedWidth = canvas.offsetWidth;
	var pxComputedHeight = canvas.offsetHeight;
	canvas.width = pxComputedWidth;
	canvas.height = pxComputedHeight;


	try {
		gl = canvas.getContext("webgl2", {stencil : true});
		gl.viewportWidth = pxComputedWidth;
		gl.viewportHeight = pxComputedHeight;

		/*
		var ext = gl.getExtension("OES_element_index_uint");
		if(ext==null){
			alert("Do not support OES UINT");
		}
		 */

	} catch (e) {
		alert("Could not initialise WebGL, sorry :-("+e);
	}


	logNode = document.getElementById("log64");

	/**
	 * Scene
	 */
	scene = new WebGL_Scene();
	scene.render();


	// create control
	var control = new WebGL_Controller(scene);
	control.start();


};