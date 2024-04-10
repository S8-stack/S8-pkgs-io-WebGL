
import { S8Object } from "/S8-api/S8Object.js";

import { Shader } from "./Shader.js";
import { SWGL_Appearance } from "/S8-pkgs-io-WebGL/scene/pipes/SWGL_Appearance.js";
import { SWGL_Environment } from "/S8-pkgs-io-WebGL/scene/environment/SWGL_Environment.js";
import { GL } from "/S8-pkgs-io-WebGL/swgl.js";



export const VertexAttributesShaderLayout = {
	POSITIONS_LOCATION: 0x0,
	NORMALS_LOCATION: 0x1,
	U_TANGENTS_LOCATION : 0x2,
	V_TANGENTS_LOCATION : 0x3,
	TEX_COORDS_LOCATION : 0x4,
	COLORS_LOCATION : 0x5
};



export class SWGL_Program extends S8Object {


    /**
     * @type{WebGL2RenderingContext}
     */
    gl;

    /**
     * 
     * @param {string} pathname 
     */
    pathname;

    /**
     * @type {WebGLProgram}
     */
    handle;

    /**
     * @type {Shader}
     */
    vertexShader;

    /**
     * @type {Shader}
     */
    fragmentShader;

    /**
     * @type {boolean}
     */
    isInitiated = false;


    /**
     * @type {boolean}
     */
    isCompiled = false;


    /**
	 * @type {Float32Array} Matrix4x4
	 */
	matrix_ProjectionViewModel = new Float32Array(16);

	/**
	 * @type {Float32Array} Matrix4x4
	 */
	matrix_ViewModel = new Float32Array(16);

	/**
	 * @type {Float32Array} Matrix4x4
	 */
	matrix_Normal = new Float32Array(16);


    /**
     * 
     * @param {String} pathname
     * 
     */
    constructor(pathname) {
        
        super(); // S8Object

        // pathname
        this.pathname = "/S8-pkgs-io-WebGL/scene/pipes" + pathname;
        this.vertexShader = new Shader(this.pathname, "vertex");
        this.fragmentShader = new Shader(this.pathname, "fragment");

    }

    /**
	 * @param {WebGL2RenderingContext} gl 
	 */
	WebGL_relink(gl){
		this.gl = gl;
		this.vertexShader.WebGL_relink(gl);
        this.fragmentShader.WebGL_relink(gl);
	}



    /**
     * To be overidden
     * @param{WebGL2RenderingContext} gl
     */
    enable() { 
        const gl = this.gl;
        // bind shader program
        gl.useProgram(this.handle);

        /* <enable-attributes> */
        gl.enableVertexAttribArray(this.pointAttributeLocation);
        gl.enableVertexAttribArray(this.normalAttributeLocation);
        gl.enableVertexAttribArray(this.texCoordAttributeLocation);
        gl.enableVertexAttribArray(this.colorAttributeLocation);
        gl.enableVertexAttribArray(this.uTangentAttributeLocation);
        gl.enableVertexAttribArray(this.vTangentAttributeLocation);
        /* </enable-attributes> */
    }


    /**
     * 
     * @param {SWGL_Environment} environment 
     */
    bindEnvironment(environment) {
        console.log("Method("+environment+") to be overridden:");
    }


    /**
     * 
     * @param {SWGL_Appearance} appearance 
     */
    bindAppearance(appearance) {
        console.log("Method("+appearance+") to be overridden:");
    }

    /**
     * Example only : to be overridden
     * @param {NbView} view 
     * @param {NbModel} model 
     */
    bindModel(view, model) {
        const gl = this.gl;
        /* <matrices> */
        // re-compute everything...
        let matrix_Model = model.matrix;
        M4.multiply(view.matrix_ProjectionView, matrix_Model, this.matrix_ProjectionViewModel);
        M4.multiply(view.matrix_View, matrix_Model, this.matrix_ViewModel);
        M4.transposeInverse(this.matrix_ViewModel, this.matrix_Normal);
        /* </matrices> */

        /* <bind-uniforms> */
        gl.uniformMatrix4fv(this.loc_Uniform_matrix_MVP, false, this.matrix_ProjectionViewModel);
        gl.uniformMatrix4fv(this.loc_Uniform_matrix_MV, false, this.matrix_ViewModel);
        gl.uniformMatrix3fv(this.loc_Uniform_matrix_N, false, this.matrix_Normal);
        /* </bind-uniforms> */


        /* <bind-attributes> */
        model.bindPointVertexAttributes(this.pointAttributeLocation);
        model.bindNormalVertexAttributes(this.normalAttributeLocation);
        model.bindUTangentVertexAttributes(this.uTangentAttributeLocation);
        model.bindVTangentVertexAttributes(this.vTangentAttributeLocation);
        model.bindTexCoordVertexAttributes(this.texCoordAttributeLocation);
        model.bindColorVertexAttributes(this.colorAttributeLocation);
        /* </bind-attributes> */

        /* <bind-elements> */
        model.bindElements();
        /* </bind-elements> */

    }


    /**
     * 
     * @param {WebGL2RenderingContext} gl 
     */
    disable() {
        const gl = this.gl;

        /* <disable-attributes> */
        gl.disableVertexAttribArray(this.pointAttributeLocation);
        gl.disableVertexAttribArray(this.normalAttributeLocation);
        gl.disableVertexAttribArray(this.texCoordAttributeLocation);
        gl.disableVertexAttribArray(this.colorAttributeLocation);
        gl.disableVertexAttribArray(this.uTangentAttributeLocation);
        gl.disableVertexAttribArray(this.vTangentAttributeLocation);
        /* </disable-attributes> */

        // unbind shader program
        gl.useProgram(null);
    }



    S8_render(){ 
         /* nothing to do */
    }


    /* <build-section> */

    /**
	 * @param {WebGL2RenderingContext} gl
     * @param {Function} onCompiled 
     */
    compile(onCompiled) {
        const gl = this.gl;
        if (!this.isCompiled && !this.isInitiated) {

            // lock preventing any further call to this method
            this.isInitiated = true;

            let _this = this;
            let onShadersBuilt = function () {
                if (!_this.isCompiled
                    && _this.vertexShader.isBuilt
                    && _this.fragmentShader.isBuilt) {
                    _this.finalizeCompilation(onCompiled);
                }
            }
            this.vertexShader.build(onShadersBuilt);
            this.fragmentShader.build(onShadersBuilt);
        }
    }



    /**
     * Linking of uniforms and attributes (to be overriden) 
     * @param {WebGL2RenderingContext} gl
     */
    link() {

        const gl = this.gl;

        /* <uniforms> */
        this.loc_Uniform_matrix_MVP = gl.getUniformLocation(this.handle, "ModelViewProjection_Matrix");
        this.loc_Uniform_matrix_MV = gl.getUniformLocation(this.handle, "ModelView_Matrix");
        this.loc_Uniform_matrix_N = gl.getUniformLocation(this.handle, "Normal_Matrix");
        this.loc_Uniform_matrix_M = gl.getUniformLocation(this.handle, "Model_Matrix");
        /* </uniforms> */

        /* <attributes> */
        this.pointAttributeLocation = gl.getAttribLocation(this.handle, "vertex");
        this.normalAttributeLocation = gl.getAttribLocation(this.handle, "normal");
        this.texCoordAttributeLocation = gl.getAttribLocation(this.handle, "texCoord");
        this.colorAttributeLocation = gl.getAttribLocation(this.handle, "color");
        this.uTangentAttributeLocation = gl.getAttribLocation(this.handle, "uTangent");
        this.vTangentAttributeLocation = gl.getAttribLocation(this.handle, "vTangent");
        /* </attributes> */
    }

    /**
     * 
	 * @param {WebGL2RenderingContext} gl
     * @param {Function} onCompiled 
     */
    finalizeCompilation(onCompiled) {
        const gl = this.gl;

        if (!this.isCompiled) {

            // Create shader program
            this.handle = gl.createProgram();

            // Attach vertex shader
            gl.attachShader(this.handle, this.vertexShader.handle);

            // Attach vertex shader
            gl.attachShader(this.handle, this.fragmentShader.handle);

            // Link shader program
            gl.linkProgram(this.handle);
            if (!gl.getProgramParameter(this.handle, GL.LINK_STATUS)) {
                alert("Could not initialise shaders : linking problem");
            }

            /*
            Actually uniform locations will be assigned during shader linking time. 
            And they will never change for life time of program object. 
            If you want improvement try not to always update uniforms. 
            In your rendering loop check If uniform variable value changes then only updates its value. 
            Kind of dirty flag. This will definitely improve performance. 
            If you want more optimization look into usage of uniform blocks or uniform buffer objects.
            */

            // linking of uniforms and attributes
            this.link();

            // program is ready to render!
            this.isCompiled = true;

            // release lock for further recompile (if any!!)
            this.isInitiated = false;

            onCompiled();
        }
    }


    
	


    /** Dispose program-related disposable 
     * @param {WebGL2RenderingContext} gl
    */
    dispose(gl) {
        this.fragmentShader.dispose(gl);
        this.vertexShader.dispose(gl);

        // finally delete program
        gl.glDeleteProgram(this.handle);
    }
    /* </dispose-section> */



    /* dispose program-related disposable */
    S8_dispose() {
       /* nothing to do */
    }

}
