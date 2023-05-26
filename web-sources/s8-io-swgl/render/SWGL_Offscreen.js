import { gl } from "/s8-io-swgl/swgl.js";
import { NeObject } from "/s8-io-bohr-neon/NeObject.js";
import { FrameBufferObject } from "./FrameBufferObject.js";
import { SWGL_Scene } from "scene/SWGL_Scene.js";
import { StaticViewController } from "control/StaticViewController.js";





/**
 * 
 */
export class SWGL_Offscreen extends NeObject {



    /**
     * @type{FrameBufferObject}
     */
    fbo = new FrameBufferObject({ filter: gl.LINEAR });


    /**
     * @type{number}
     */
    width;

    /**
     * @type{number}
     */
    height;


    S8_set_width(size) {
        this.width = size;
        this.fbo.resize(this.width, this.height);
    }
    

    S8_set_height(size) {
        this.height = size;
        this.fbo.resize(this.width, this.height);
    }



    /**
     * @type{HTMLCanvasElement}
     */
    canvas2d = null;

    constructor() {
        super();



        /* listen screen size */
		let _this = this;
		this.sizeListener = function(width, height){ _this.resize(width, height); };
		SWGL_CONTEXT.appendSizeListener(this.sizeListener);
    }





	/**
	 * 
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize(width, height){
		if(this.scene != null){
			this.scene.resize(width, height);
		}
	}



    subInitialize() {

        // Create a 2D canvas to store the result
        this.canvas2d = document.createElement("canvas");
        this.canvas2d.width = this.width;
        this.canvas2d.height = this.height;
        this.context2d = this.canvas2d.getContext('2d');
    }


    /**
     * 
     * @param {*} target 
     */
    render(scene, target) {

        this.initialize();

        this.bind();

        //this.fbo.bind();
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        //this.environment.setBackgroundColor();
        gl.clearStencil(128);
        //this.fbo.unbind();

        //Set-up canvas parameters
        gl.enable(gl.DEPTH_TEST);


        const width = this.fbo.width, height = this.fbo.height;

        //gl.viewport(0, 0, this.width, this.height);

        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        //OpenGL initialization

        // render scene
        scene.WebGL_render();

        // read data out of FBO
        const data = new Uint8Array(4 * width * height);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.unbindFBO();

        // Copy the pixels to a 2D canvas
        let imageData = this.context2d.createImageData(width, height);
        imageData.data.set(data);
        this.context2d.putImageData(imageData, 0, 0);

        //background-image = 
        target.style.backgroundImage = "url('" + this.canvas2d.toDataURL() + "')";

    }

}


