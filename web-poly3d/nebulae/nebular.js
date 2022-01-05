

/**
 * canvas
 */
var canvas;

/**
 * Scene
 */
var scene;


var logNode;


var glBkAddress;



export class WebGL_Context {

	constructor(){
		this.canvasNode = document.createElement("canvas");


	/**
	 * Global variable
	 * Note that the canvas element has ALWAYS id = "WebGL_Canvas"
	 */
	
	 let pxComputedWidth = this.canvasNode.offsetWidth;
	 let pxComputedHeight = this.canvasNode.offsetHeight;
	 this.canvasNode.width = pxComputedWidth;
	 this.canvasNode.height = pxComputedHeight;

		try {
			/**
			 * {}
			 */
			this.gl = this.canvasNode.getContext("webgl2", {stencil : true});
			this.gl.viewportWidth = pxComputedWidth;
			this.gl.viewportHeight = pxComputedHeight;
	
			/*
			var ext = gl.getExtension("OES_element_index_uint");
			if(ext==null){
				alert("Do not support OES UINT");
			}
			 */
	
		} catch (e) {
			alert("Could not initialise WebGL, sorry :-("+e);
		}
	}

	getCanvasNode(){
		return this.canvasNode;
	}

	
}


export const WebGL_CTX = new WebGL_Context();



/**
 * 
 */
export const gl = WebGL_CTX.gl;




export class WebGL_Screen {

	constructor(){
		
	}

}



/**
 * startup function
 */
var WebGL_start = function(){


	// WebGL_Service static address
	glBkAddress = new Uint8Array(
			[0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x00, 0x08, // path
				0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08]); // index	





	


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