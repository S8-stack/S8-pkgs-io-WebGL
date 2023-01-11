
import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { gl } from "/s8-io-swgl/swgl.js";


/**
 * 
 */
export class FrameBufferObject extends NeObject {





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
     * @type {number}
     */
    width;


    /**
     * @type {number}
     */
    height;



    /**
     * 
     */
    props = { filter: gl.LINEAR };


    /**
     * @type {boolean}
     */
    isInitialized = false;


    constructor(props) {
        super();
        this.props = props;
    }





    S8_set_width(size) {
        this.width = size;
        this.isInitialized = false;
    }


    S8_set_height(size) {
        this.height = size;
        this.isInitialized = false;
    }




    /**
     * 
     * @param {object} props
       
         *  // picking style ->  gl.NEAREST);
                // offset rendering style -> gl.LINEAR);
         */
    initialize() {
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
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.props.filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.props.filter);

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

        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
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



        this.subInitialize();
    }


    subInitialize() {

    }



    /**
     * Bind the underlying FBO
     */
    bind() {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    }


    /**
     * Unbind the underlying FBO
     */
    unbind() {
        /* return to the default frame buffer */
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    /**
     * 
     * @param {Uint8Array} pickedColor (Uint8Array(4))
     * @param {number} x 
     * @param {number} y 
     */
    pick(pickedColor, x, y) {
        //var pickedColor = new Uint8Array(4); 
        gl.readPixels(x, this.height - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pickedColor);
    }

    dispose() {
        if (this.isInitialized) {
            gl.deleteTexture(this.tex);
            gl.deleteRenderbuffer(this.rbo);
            gl.deleteFramebuffer(this.fbo);
        }
    }

}