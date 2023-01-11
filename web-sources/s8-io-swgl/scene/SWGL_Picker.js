import { gl } from "/s8-io-swgl/swgl.js";
import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { FrameBufferObject } from "./FrameBufferObject.js";
import { SWGL_Scene } from "scene/SWGL_Scene.js";
import { StaticViewController } from "view/StaticViewController.js";





/**
 * 
 */
export class SWGL_Picker extends FrameBufferObject {


    constructor() {
        super({ filter: gl.NEAREST });
    }



    /*
    subInitialize() {
    }
    */


    /**
     * 
     * @param {*} target 
     */
    render(scene, target) {


        this.bindFBO();

        //this.fbo.bind();
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        //this.environment.setBackgroundColor();
        gl.clearStencil(128);
        //this.fbo.unbind();

        //Set-up canvas parameters
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, this.width, this.height);

        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        //OpenGL initialization

        // render scene
        scene.WebGL_render();

        // read data out of FBO
        const data = new Uint8Array(4 * this.width * this.height);
        gl.readPixels(0, 0, this.width, this.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.unbindFBO();

        // Copy the pixels to a 2D canvas
        let imageData = this.context2d.createImageData(this.width, this.height);
        imageData.data.set(data);
        this.context2d.putImageData(imageData, 0, 0);

        //background-image = 
        target.style.backgroundImage = "url('" + this.canvas2d.toDataURL() + "')";

    }

}


