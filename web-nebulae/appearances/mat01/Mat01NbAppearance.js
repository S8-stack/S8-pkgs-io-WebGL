import { NbAppearance } from "../NbAppearance";


/**
 * 
 */
export class Mat01NbAppearance extends NbAppearance {

    constructor(id){
        super(id, "mat01");
	    this.ambient = [0.2, 0.2, 0.2, 0.0];
	    this.diffuse = 	[0.3, 0.3, 0.5, 0.0];
	    this.specular = [0.3, 0.2, 0.8, 0.0];
	    this.shininess = 20;	
    }


    /**
     * 
     * @param {string} code 
     * @param {string} value 
     */
    BOHR_set(code, value) {
        switch(code) {

            // basics
            case 0x02: this.name = value; break;
            case 0x04: this.setModels(value); break;

            // params
            case 0x20: ambient = value; break;
            case 0x21: diffuse = value; break;
            case 0x22: specular = value; break;
            case 0x23: shininess = value; break;
            default: throw `Unsupported code: ${code}`;
        }
    }

    /**
     * 
     */
    BOHR_render(){
        // nothing to render...
    }

}
