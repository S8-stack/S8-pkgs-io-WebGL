

import { NeObject } from "/s8-io-bohr/neon/NeObject.js";
import { gl } from "/s8-ng-geo/nebulae/nebulae.js";



export class NbTexture2d extends NeObject {

    /**
     * @type {string}
     */
    pathname;


    /**
     * @type { WebGLTexture }
     */
    texture;


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
    }


    S8_render(){
        if(!this.isInitiated && !this.isInitialized){
            this.isInitiated = true;
            this.texture = gl.createTexture();

            let image = new Image();
            var _this = this;
            
            this.image.onload = function () { _this.store(image); };
            this.image.src = this.pathname;
        }
    }


    /**
     * 
     * @param {Image} image 
     */
	store(image) {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.isInitialized = true;
	}

	bind(location, index) {
		if (this.isInitialized) {
			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(location, index);
		}
	}

	dispose() {
		gl.deleteTexture(this.texture);
	}
}