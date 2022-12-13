#version 300 es

// shader start here
precision highp float;

uniform samplerCube radiance;
uniform samplerCube irradiance;

uniform sampler2D matDiffuseColors;
uniform sampler2D matSpecularColors;
uniform sampler2D matProperties;



in vec3 fNormal;
in vec3 fEyeVector;

/* flat interoplation for tex coords since only stencil on lib textures (flat keyword required on both .vsh and .fsh) */
flat in vec2 fTexCoords;
  
out vec4 fragColor;
        
void main(void) {


	vec4 matProperties = texture(matProperties, fTexCoords);
	float matGlossiness = matProperties.x;
	float matRoughness = matProperties.y;

	vec4 matDiffuseColor = texture(matDiffuseColors, fTexCoords);
	vec4 matSpecularColor = texture(matSpecularColors, fTexCoords);
	
	vec3 nfNormal = normalize(fNormal);
	vec3 nfEyeVector = normalize(fEyeVector);
	vec3 sphereTexCoords = reflect(nfEyeVector, nfNormal).yzx;
	//vec3 rotatedTextureCoord = vec3(texCoord.y, texCoord.z, texCoord.x);
	
	vec4 envSpecularColor = textureLod(radiance, sphereTexCoords, matRoughness);
	vec4 envDiffuseColor = texture(irradiance, rotatedTextureCoord);

	fragColor = matGlossiness * matSpecularColor * envSpecularColor
		+ (1.0 - matGlossiness) * matDiffuseColor * envDiffuseColor;
	
}