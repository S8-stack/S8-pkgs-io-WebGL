import { gl } from "/s8-io-swgl/swgl.js";
import { NeObject } from "/s8-io-bohr-neon/NeObject.js";
import { FrameBufferObject } from "./FrameBufferObject.js";
import { SWGL_Scene } from "/s8-io-swgl/scene/SWGL_Scene.js";





/**
 * 
 */
export class SWGL_Picker extends NeObject {


    /**
     * @type {number}
     */
    width = 0;


    /**
     * @type {number}
     */
    height = 0;



    /**
     * 
     */
    props = { filter: gl.LINEAR };




    /**
     * @type{WebGLFramebuffer}
     */
    fbo;


    /**
     * @type {WebGLTexture}
     */
    tex;


    /**
     * @type {WebGLRenderbuffer}
     */
    rbo;




    /**
     * @type {boolean}
     */
    isInitialized = false;



    constructor() {
        super();
    }



    /**
     * 
     * @param {SWGL_Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @returns {Uint8Array}
     */
    pick(scene, x, y, debug = false) {

        /**
         * Bind the underlying FBO
         */

        /* initialize if not already done */
        this.initialize();

        // bind buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        // You also need to set the viewport by calling gl.viewport whenever you switch framebuffers.
        gl.viewport(0, 0, this.width, this.height);

       

        //this.environment.setBackgroundColor();
        //gl.clearStencil(128);
        //this.fbo.unbind();

        //Set-up canvas parameters
        gl.enable(gl.DEPTH_TEST);

        //gl.viewport(0, 0, this.width, this.height);

         //this.fbo.bind();
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        /* render */
        scene.WebGL_render();

        if (debug) {


            let width = this.width;
            let height = this.height;


            // read data out of FBO
            const debugData = new Uint8Array(4 * width * height);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, debugData);

            // Create a 2D canvas to store the result
            let canvas2d = document.createElement("canvas");
            canvas2d.width = width;
            canvas2d.height = height;
            let context2d = canvas2d.getContext('2d');

            // Copy the pixels to a 2D canvas
            let imageData = context2d.createImageData(width, height);
            imageData.data.set(debugData);
            context2d.putImageData(imageData, 0, 0);

            //background-image = 
            let target = document.getElementById("framebuffer-display");
            target.style.backgroundImage = "url('" + canvas2d.toDataURL("image/png") + "')";

        }





        // read data out of FBO
        const data = this.pickColor(x, y);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);


        /**
         * Unbind the underlying FBO
         */
        /* return to the default frame buffer */
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        /* That includes putting it back when setting things back to the canvas */
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);




        let index = data[0] + data[1] * 256 + data[2] * 65536;
        return index;
    }





    /**
     * 
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {

        // dispose previous buffers (if already built)
        this.dispose();

        this.width = width;
        this.height = height;
    }


    /**
     * 
     * @param {object} props
       
         *  // picking style ->  gl.NEAREST);
                // offset rendering style -> gl.LINEAR);
         */
    initialize() {

        if (!this.isInitialized) {


            /*
             * 	Build Frame Buffer Object
             */

            // create a framebuffer object 
            this.fbo = gl.createFramebuffer();

            // attach the texture and the render buffer to the frame buffer */ 
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);


            /*
             * Build COLOR_ATTACHMENT0 of Frame Buffer Object
             */

            /* generate a texture id */
            this.tex = gl.createTexture();

            /* bind the texture */
            gl.bindTexture(gl.TEXTURE_2D, this.tex);

            /* create the texture in the GPU */
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            /* set texture parameters */
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            /* unbind the texture */
            gl.bindTexture(gl.TEXTURE_2D, null);

            /* attach the texture and the render buffer to the frame buffer */
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.tex, 0);


              /*
             * Build DEPTH_ATTACHMENT of Frame Buffer Object
             */

            /* create a renderbuffer object for the depth buffer */
            this.rbo = gl.createRenderbuffer();

            /* bind the texture */
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);

            /* create the render buffer in the GPU */
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);

            /* unbind the render buffer */
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.rbo);



            /*
             * Error checking
             */


            if (!gl.isFramebuffer(this.fbo)) {
                throw ("Invalid framebuffer");
            }

            let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            switch (status) {
                case gl.FRAMEBUFFER_COMPLETE:
                    break;
                case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                    throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                    break;
                case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                    throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                    break;
                case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                    throw ("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                    break;
                case gl.FRAMEBUFFER_UNSUPPORTED:
                    throw ("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                    break;
                default:
                    throw ("Incomplete framebuffer: " + status);
            }

            /* handle an error : frame buffer incomplete */
            /* return to the default frame buffer */
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);


            this.isInitialized = true;
        }
    }







    /**
     * 
     * @param {number} x screen position 
     * @param {*} y screen position
     * @returns {Uint8Array} picked color
     */
    pickColor(x, y) {

        // read
        let data = new Uint8Array(4);

        //var pickedColor = new Uint8Array(4); 
        gl.readPixels(x, this.height - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);

        return data;
    }





    dispose() {
        if (this.isInitialized) {
            gl.deleteTexture(this.tex);
            gl.deleteRenderbuffer(this.rbo);
            gl.deleteFramebuffer(this.fbo);
            this.isInitialized = false;
        }
    }

}


