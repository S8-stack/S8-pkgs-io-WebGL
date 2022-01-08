

/**
 * 
 */
export class NbRenderingContext {

    constructor() {
        super();

        // rendering pipes
        this.pipes = new Array();

        // renderint pipes by name
        this.pipesByName = new Map();
    }

    S8_set(code, value){
        switch(code){
            case 0x02 : this.setPipes(value); break;
        }
    }

    setPipes(pipes){
        this.pipes = pipes;
    }

    S8_render(){
        this.apperancesByName = new Map();
        this.pipes.forEach(pipe => {
            pipe.explore(this.apperancesByName);
        })
    }

    /**
     * 
     * @param {string} name 
     * @returns {NbAppearance} appearance
     */
    getAppearance(name){
        let appearance = this.apperancesByName.get(name);
        if(appearance == undefined){
            throw "No appearance defined for name: "+this.appearanceName;
        }
        return appearance;
    }

}