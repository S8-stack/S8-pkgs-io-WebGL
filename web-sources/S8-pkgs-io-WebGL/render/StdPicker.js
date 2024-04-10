

import { GL } from "/S8-pkgs-io-WebGL/swgl.js";
import { SWGL_Scene } from "/S8-pkgs-io-WebGL/scene/SWGL_Scene.js";




/**
 * 
 */
export class StdPicker {



    /**
     * @type{WebGL2RenderingContext}
     */
    gl;


    /**
     * @type{SWGL_Scene}
     */
    scene = null;

    /**
     * HTML node width
     * @type {number}
     */
    htmlWidth = 0;


    /**
     * HTML node height
     * @type {number}
     */
    htmlHeight = 0;

    /**
     * WebGL (gl) Canvas width
     * @type {number}
     */
    glWidth = 0;


    /**
     * WebGL (gl) Canvas width
     * @type {number}
  */
    glHeight = 0;



    /**
     * 
     */
    props = { filter: GL.LINEAR };




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


    /** @type {boolean} */
    isInitialized = false;

    /** @type {boolean} */
    isRendered = false;


    DEBUG_isFramebufferDisplayed = false;



   
    constructor() {
    }



    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    WebGL_relink(gl){
        this.gl = gl;
        this.scene.WebGL_relink(gl);
    }



    /**
     * 
     * @param {number} xScreen screen position 
     * @param {number} yScreen screen position
     * 
     * @returns {number}
     */
    pick(xScreen, yScreen) {

        /* render if not already done */
        this.render();

        const gl = this.gl;

        // bind buffer
        gl.bindFramebuffer(GL.FRAMEBUFFER, this.fbo);

        // read data out of FBO
        const data = new Uint8Array(4);

        const rect = gl.canvas.getBoundingClientRect();

        let xTexCoord = (xScreen - rect.left) * this.glWidth / rect.width;
        let yTexCoord = (rect.height - (yScreen - rect.top)) * this.glHeight / rect.height;

        //var pickedColor = new Uint8Array(4); 
        gl.readPixels(xTexCoord, yTexCoord, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);



        /** Unbind the underlying FBO */
        gl.bindFramebuffer(GL.FRAMEBUFFER, null);

        const index = data[0] + data[1] * 256 + data[2] * 65536;

        return index;

    }


    clear() {
        this.isRendered = false;
    }

    render() {
        if (!this.isRendered) {
            const gl = this.gl;

            /* initialize if not already done */
            this.initialize();

            /** Bind the underlying FBO */
            gl.bindFramebuffer(GL.FRAMEBUFFER, this.fbo);

            // You also need to set the viewport by calling gl.viewport whenever you switch framebuffers.
            /* EDIT : we don't change the viewport */
            gl.viewport(0, 0, this.glWidth, this.glHeight);

            //this.environment.setBackgroundColor();
            //gl.clearStencil(128);
            //this.fbo.unbind();

            //Set-up canvas parameters
            gl.enable(GL.DEPTH_TEST);

            //gl.viewport(0, 0, this.width, this.height);

            //this.fbo.bind();
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);


            /* render */
            if (this.scene) {
                this.scene.WebGL_render(gl);
            }

            if (this.DEBUG_isFramebufferDisplayed) {

                // read data out of FBO
                const debugData = new Uint8Array(4 * this.glWidth * this.glHeight);
                gl.readPixels(0, 0, this.glWidth, this.glHeight, gl.RGBA, gl.UNSIGNED_BYTE, debugData);

                // Create a 2D canvas to store the result
                let canvas2d = document.createElement("canvas");
                canvas2d.width = this.glWidth;
                canvas2d.height = this.glHeight;
                let context2d = canvas2d.getContext('2d');

                // Copy the pixels to a 2D canvas
                let imageData = context2d.createImageData(this.glWidth, this.glHeight);
                imageData.data.set(debugData);
                context2d.putImageData(imageData, 0, 0);

                //background-image = 
                let target = document.getElementById("framebuffer-display");
                if (!target) {
                    target = document.createElement("div");
                    target.id = "framebuffer-display";
                    document.getElementById("xenon-page-layer-popover").appendChild(target);
                }
                target.style = `position: absolute; top: 5vh; left: 5vw; 
            width: 25vw; height: 25vh; 
            background-size: contain; background-repeat: no-repeat;`;
                target.style.backgroundImage = "url('" + canvas2d.toDataURL("image/png") + "')";
            }


            /**
             * Unbind the underlying FBO
             */
            /* return to the default frame buffer */
            gl.bindFramebuffer(GL.FRAMEBUFFER, null);

            /* That includes putting it back when setting things back to the canvas */
            /* EDIT:  we don't change the viewport anymore
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            */
            gl.viewport(0, 0, this.glWidth, this.glHeight);

            this.isRendered = true;
        }
    }


    /**
     * 
     * @param {SWGL_Scene} scene 
     */
    setScene(scene) {
        this.scene = scene;
    }


    /**
     * 
     * @param {number} width 
     * @param {number} height 
     */
    resize(width, height) {

        // dispose previous buffers (if already built)
        this.dispose();
        if (this.scene) { this.scene.resize(width, height); }

        this.htmlWidth = width;
        this.htmlHeight = height;
    }


    /**
     * 
     * @param {object} props
       
         *  // picking style ->  gl.NEAREST);
                // offset rendering style -> gl.LINEAR);
         */
    initialize() {

        const gl = this.gl;

        /*  gl.getParameter(gl.VIEWPORT);
            e.g. Int32Array[0, 0, 640, 480]
        */
        //const glViewport = gl.getParameter(gl.VIEWPORT);

        const width = gl.drawingBufferWidth;
        if (width != this.glWidth) {
            this.glWidth = width;
            this.dispose();
            this.isInitialized = false;
        }

        const height = gl.drawingBufferHeight;
        if (height != this.glHeight) {
            this.glHeight = height;
            this.dispose();
            this.isInitialized = false;
        }


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
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.glWidth, this.glHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

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
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.glWidth, this.glHeight);

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











    dispose() {
        if (this.isInitialized) {
            const gl = this.gl;
            gl.deleteTexture(this.tex);
            gl.deleteRenderbuffer(this.rbo);
            gl.deleteFramebuffer(this.fbo);
            this.isInitialized = false;
            this.isRendered = false;
        }
    }

}


