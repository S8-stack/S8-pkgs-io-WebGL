import { Control } from "./Control.js";



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