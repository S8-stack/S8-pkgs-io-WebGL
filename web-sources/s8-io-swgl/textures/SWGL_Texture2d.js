

import { NeObject } from "/s8-io-bohr-neon/NeObject.js";
import { gl } from "/s8-io-swgl/swgl.js";

export class SWGL_Texture2d extends NeObject {

    /**
     * @type {string}
     */
    pathname;


    /**
     * @type { WebGLTexture }
     */
    baseTexture;


     /**
     * @type {boolean}
     */
    isInitiated = false;

    /**
     * @type {boolean}
     */
    isInitialized = false;

	constructor() {
	}

    S8_set_pathname(pathname) {
        this.pathname = pathname;

        if(!this.isInitiated && !this.isInitialized){
            this.isInitiated = true;
            this.baseTexture = gl.createTexture();

            let image = new Image();
            var _this = this;
            
            this.image.onload = function () { _this.store(image); };
            this.image.src = this.pathname;
        }
    }


    S8_render(){
    }


    /**
     * 
     * @param {Image} image 
     */
	store(image) {
        gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.isInitialized = true;
	}

	bind(index) {
		if (this.isInitialized) {
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this.baseTexture);
		}
	}

	dispose() {
		gl.deleteTexture(this.baseTexture);
	}
}