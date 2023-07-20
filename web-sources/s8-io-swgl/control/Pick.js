import { Control } from "./Control.js";
import { S8 } from "/s8-io-bohr-atom/S8.js";
import { SWGL_Picker } from "/s8-io-swgl/render/SWGL_Picker.js";



export class Pick extends Control {




    constructor(){
        super();
    }


    onClick(event){
        if (event.shiftKey) {
            const pickingScene = this.controller.screen.pickingScene;

            const picker = this.controller.screen.picker;
    
    
            const x = event.clientX;
            const y = event.clientY;
           
            /**
             * 
             */
            let color = picker.pick(pickingScene, x, y, false);
    
            console.log(color);
            return true; // captured
        }
    }


}