import { S8 } from "/s8-io-bohr/atom/S8.js";
import { NbContext as NbContext } from "/s8-ng-geo/nebulae/nebulae.js";
import { SWGL_Scene } from "./scene/SWGL_Scene.js";


import { CubeElement } from "/s8-stack-web/carbide/cube/CubeElement.js";



S8.import_CSS('/s8-ng-geo/nebulae/nebulae.css');

export class NbCanvasWrapper extends CubeElement {



    /**
     * @type {HTMLDivElement}
     */
    wrapperNode;


    /**
     * @type {ResizeObserver}
     */
    resizeObserver;

	/**
	 * @type {SWGL_Scene} the active scene
	 */
	scene;


    /**
     * @type {boolean}
     */
    isVerbose = false;

    constructor(){
        super();
        this.wrapperNode = document.createElement("div");
        this.wrapperNode.setAttribute('id', 'nebulae-canvas');


        let _this = this;
		this.resizeObserver = new ResizeObserver(function(entries) {
			// since we are observing only a single element, so we access the first element in entries array
			let rect = entries[0].contentRect;
		
			// current width & height
			let wrapperNodeWidth = rect.width;
			let wrapperNodeHeight = rect.height;

            _this.resize(wrapperNodeWidth, wrapperNodeHeight);
		});
		
		// start observing for resize
		this.resizeObserver.observe(this.wrapperNode);
    }

    /**
     * 
     * @param {SWGL_Scene} scene 
     */
    S8_set_scene(scene){
        this.scene = scene;
    }



    S8_render(){
        this.wrapperNode.appendChild(NbContext.canvasNode);
        this.forceResize();
        this.scene.start();
    }


    forceResize(){
        let pxComputedWidth = this.wrapperNode.offsetWidth;
        let pxComputedHeight = this.wrapperNode.offsetHeight;
        this.resize(pxComputedWidth, pxComputedHeight);
    }

    /**
     * 
     * @param {number} width (in [px])
     * @param {number} height (in [px])
     */
    resize(width, height){

        // resize context
        NbContext.resize(width, height);

        if(this.isVerbose){
            console.log(`WebGL Canvas dimensions are now: width = ${this.canvasWidth}, height = ${this.canvasHeight}`);
        }
    }




    /**
     * @implements {S8Object.getEnvelope}
     */
    getEnvelope(){
        return this.wrapperNode;
    }


    S8_dispose(){
    }

}