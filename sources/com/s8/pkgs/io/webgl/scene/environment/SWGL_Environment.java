package com.s8.pkgs.io.webgl.scene.environment;

import java.util.ArrayList;
import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.io.webgl.WebSources;
import com.s8.pkgs.io.webgl.maths.WebGL_VectorUtilities;
import com.s8.pkgs.io.webgl.scene.environment.lights.SWGL_DirectionalLight;


public class SWGL_Environment extends S8WebObject {


	/**
	 * 
	 * @param branch
	 */
	public SWGL_Environment(S8WebFront branch) {
		super(branch, WebSources.ROOT + "scene/environment/SWGL_Environment");
	}



	/**
	 * 
	 * @param lights
	 */
	public void setDirectionalLights(List<SWGL_DirectionalLight> lights) {
		vertex.outbound().setObjectListField("directionalLights", lights);
	}


	public void initialize_PRESET0() {

		List<SWGL_DirectionalLight> lights = new ArrayList<>();

		double dPhi = Math.PI*1.8/5;

		for(int i=0; i<5; i++){
			SWGL_DirectionalLight light = new SWGL_DirectionalLight(vertex.getSession());
			light.setAmbientColor(0.2, 0.2, 0.2, 0.0);
			light.setDiffuseColor(0.3, 0.3, 0.3, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(WebGL_VectorUtilities.sphericalRadial3d(1.0, i*dPhi, Math.PI*0.25));

			lights.add(light);
		}

		dPhi = Math.PI*1.8/3; 
		for(int i=0; i<3; i++){

			SWGL_DirectionalLight light = new SWGL_DirectionalLight(vertex.getSession());
			light.setAmbientColor(0.0, 0.0, 0.0, 0.0);
			light.setDiffuseColor(0.4, 0.4, 0.4, 0.0);
			light.setSpecularColor(1.0, 1.0, 1.0, 0.0);
			light.setDirectionVector(WebGL_VectorUtilities.sphericalRadial3d(1.0, Math.PI*0.45+i*dPhi, Math.PI*0.65));

			lights.add(light);
		}

		// set lights
		setDirectionalLights(lights);
		
		// environment

		/*
	        let rootPathname = "/nebulae/assets/skycube";
	        environment.radiance = NbTextureCubeMap.create(rootPathname+"/std2/radiance/face", ".png", 6);
	        environment.irradiance = NbTextureCubeMap.create(rootPathname+"/std2/irradiance/face", ".png", 1);
		 */
	}



	public void setRadiance(SWGL_TextureCubeMap cubeMap) {
		vertex.outbound().setObjectField("radiance", cubeMap);
	}
	
	public void setIrradiance(SWGL_TextureCubeMap cubeMap) {
		vertex.outbound().setObjectField("irradiance", cubeMap);
	}
}
