

import { S8, S8Orbital } from '/s8/S8';
import { Mat01NbAppearance } from './appearances/mat01/Mat01NbAppearance';
import { NbContext } from './nebulae';
import { NbGear } from './scene/NbGear';
import { NbScene } from './scene/NbScene';
import { ElementaryNbShGen } from './models/generators/ElementaryNbShGen';
import { NbMesh } from './models/NbMesh';
import { HexahedronNbMeshBuilder } from './models/primitives/HexahedronNbMeshBuilder';


S8.import_CSS("/nebulae/nb-style.css");


/** window */
export class NbFullScreenWindow extends S8Orbital {


    /**
     * 
     */
    constructor(){
        super();

        this.node = document.createElement("div");
        this.node.classList.add("nb-fullscreen");

        this.node.appendChild(NbContext.canvasNode);
    }


    /**
     * 
     */
    S8_set(){
       throw "Unsup";
    }


    /**
     * render
     */
    S8_render(){
        
        console.log("");

        let scene = new NbScene();

        // appearance
        let matApp01 = new Mat01NbAppearance("(auto)");
        matApp01.name = "primary";
        scene.setAppearances([matApp01]);

        // build mesh
        let h = new HexahedronNbMeshBuilder();
        let meshProps = matApp01.renderer.getMeshProperties();
        meshProps.vertexCapacity = 24;
        meshProps.elementCapacity = 12;

        let cubeMesh = NbMesh.create(meshProps);
        h.buildSurface(cubeMesh);

        // build shape generator
        let shapeGen = new ElementaryNbShGen("(internal)");
        shapeGen.mesh = cubeMesh;

        // build gear
        let gear = new NbGear("(internal)");
        gear.shapeGenerator = shapeGen;

        scene.setGears([gear]);

        scene.start();

        gear.update();
    }



    /**
     * 
     * @returns 
     */
    getEnvelope(){
        return this.node;
    }

}