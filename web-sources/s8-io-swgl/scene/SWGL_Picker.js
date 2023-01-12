import { gl } from "/s8-io-swgl/swgl.js";
import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { FrameBufferObject } from "./FrameBufferObject.js";





/**
 * 
 */
export class SWGL_Picker extends NeObject {




    /**
     * @type{FrameBufferObject}
     */
    fbo = new FrameBufferObject({ filter: gl.NEAREST });


    constructor() {
        super();
    }


	/**
	 * 
	 * @param {number} width 
	 * @param {number} height 
	 */
	resize(width, height){
		// share same view with screen scene -> no required update on scene view
        this.fbo.resize(width, height);
	}


    subInitialize() {
        /* nothing to do here */
    }
    


    /**
     * 
     * @param {*} target 
     * @returns {number} index of target
     */
    pick(scene, x, y) {

        /* bind fbo */
        this.fbo.bind();

        //this.fbo.bind();
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        //this.environment.setBackgroundColor();
        //gl.clearStencil(128);
        //this.fbo.unbind();

        //Set-up canvas parameters
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, this.width, this.height);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
       
        this.render(scene);

        // read data out of FBO
        const data = this.fbo.pickColor(x, y);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        /* unbind fbo */
        this.fbo.unbind();

        let index = data[0] + data[1] * 256 + data[2] * 65536;
        return index;
    }

}


