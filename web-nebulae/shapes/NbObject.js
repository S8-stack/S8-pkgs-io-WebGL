import { NbRenderingContext } from "../appearances/NbRenderingContext";
import { NbMesh } from "./NbMesh";
import { NbModelBuilder } from "./NbModel";


export class NbObject {


    /**
     * 
     * @param {NbRenderingContext} context 
     */
    constructor(context){
        this.renderingContext = context;

       /** @type {Map} meshes */
        this.meshes = new Map();
    }



    /**
     * 
     * @param {string} name (appearance name)
     * @returns {NbModelBuilder} modelBuilder the correspondingModelBuilder
     */
    getMesh(name){
        let mesh = this.meshes.get(name);
        if(mesh == undefined){
            let appearance = this.renderingContext.getAppearance(name);
            mesh = NbMesh.forProgram(appearance.program);
            this.meshes.set(name, mesh);
        }
        return mesh;
    }

   
    /**
     * 
     * @param {Float32Array} matrix 
     * @param {NbObject} object 
     */
    append(matrix, object){
        object.meshes.forEach((mesh, appearanceName) => {
            this.getMesh(appearanceName).append(matrix, mesh);
        });
    }
}