

/**
 * 
 */
class SWGL_Context {


	/**
	 * 
	 */
	static VIEWPORT_OVERSAMPLING_FACTOR = 1.4;

	/** 
	 * @type {HTMLCanvasElement} 
	 */
	canvasNode;

	/**
	 * @type {WebGLRenderingContext}
	 */
	gl;

	/**
	 * @type {ResizeObserver}
	 */
	resizeObserver;

	/**
	 *  @type {boolean} 
	 */
	isVerbose = true;

	isInitialized = false;



	/**
	 * 
	 */
	abstractWidth;


	/**
	 * 
	 */
	abstractHeight;



	constructor() {
		this.canvasNode = document.createElement("canvas");

		try {
			/**
			 * {}
			 */
			this.gl = this.canvasNode.getContext("webgl2", {
				stencil: true,
				alpha: true,
				premultipliedAlpha: false  // Ask for non-premultiplied alpha 
			});

			/* Initialize with default HD params, resized later with actual parameters */
			this.gl.viewport(0, 0, 1920, 1080);

			/*
			var ext = gl.getExtension("OES_element_index_uint");
			if(ext==null){
				alert("Do not support OES UINT");
			}
			 */

		} catch (e) {
			alert("Could not initialise WebGL, sorry :-(" + e);
		}



	}

	getCanvasNode() {
		return this.canvasNode;
	}


	/**
	 * 
	 * @param {Fuction} listener 
	 */
	appendSizeListener(listener) {
		this.sizeListeners.add(listener);
	}

	/**
	 * 
	 * @param {Fuction} listener 
	 */
	removeSizeListener(listener) {
		this.sizeListeners.delete(listener);
	}




}


//export const SWGL_CONTEXT = new SWGL_Context();




/**
 * @type {WebGL2RenderingContext}
 * Root context
 */
//export const gl = SWGL_CONTEXT.gl;


/**
 * alias for rendering context
 */
export const GL = WebGL2RenderingContext;



