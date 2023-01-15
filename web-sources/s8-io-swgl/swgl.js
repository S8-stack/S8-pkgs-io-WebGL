

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


	/**
	 * @type {Set<Function>}
	 */
	sizeListeners = new Set();


	constructor() {
		this.canvasNode = document.createElement("canvas");

		try {
			/**
			 * {}
			 */
			this.gl = this.canvasNode.getContext("webgl2", { stencil: true });

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
	appendSizeListener(listener){
		this.sizeListeners.add(listener);
		this.resize(); // trigger a resize for update
	}

	/**
	 * 
	 * @param {Fuction} listener 
	 */
	removeSizeListener(listener){
		this.sizeListeners.delete(listener);
	}


	initialize() {
		if (!this.isInitialized) {

			//OpenGL initialization
			gl.clearStencil(128);

			//Set-up canvas parameters
			gl.enable(gl.DEPTH_TEST);

			this.isInitialized = true;
		}
	}

	/**
	 * 
	 * @param {number} width
	 * @param {number} height
	 */
	resize(width, height) {

		this.abstractWidth = width;
		this.abstractHeight = height;
		
// set viewport parameters
/* this.gl.viewportWidth = width; */
/* this.gl.viewportHeight = height; */
		
		
		/* device pixel ratio */
		let pixelRatio = window.devicePixelRatio || SWGL_Context.VIEWPORT_OVERSAMPLING_FACTOR;

		// resize canavs drawing buffer
		let drawingBufferWidth = Math.round(pixelRatio * width);
		let drawingBufferHeight = Math.round(pixelRatio * height);

		// resize canvas
		this.canvasNode.width = drawingBufferWidth;
		this.canvasNode.height = drawingBufferHeight;

		// and set viewport accordingly
		this.gl.viewport(0, 0, drawingBufferWidth, drawingBufferHeight);

	// resize DOM node as well
		this.canvasNode.style.width = `${width}px`;
		this.canvasNode.style.height = `${height}px`;

		// broadcast
		this.sizeListeners.forEach(listener => listener(width, height));
	}


}


export const SWGL_CONTEXT = new SWGL_Context();




/**
 * @type {WebGL2RenderingContext}
 * Root context
 */
export const gl = SWGL_CONTEXT.gl;

