

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



/**
 * startup function
 */
var WebGL_start = function(){

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
		gl = canvas.getContext("webgl", {stencil : true});
		gl.viewportWidth = pxComputedWidth;
		gl.viewportHeight = pxComputedHeight;
		
		var ext = gl.getExtension("OES_element_index_uint");
		if(ext==null){
			alert("Do not support OES UINT");
		}

	} catch (e) {
		alert("Could not initialise WebGL, sorry :-("+e);
	}



	/**
	 * Scene
	 */
	scene = new WebGL_Scene();
	scene.render();

}