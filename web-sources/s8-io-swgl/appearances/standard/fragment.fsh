#version 300 es

// shader start here
precision highp float;

uniform samplerCube radiance;
uniform samplerCube irradiance;

uniform float matGlossiness;
uniform float matRoughness;
uniform vec4 matSpecularColor;
uniform vec4 matDiffuseColor;

in vec3 fNormal;
in vec3 fEyeVector;
  
out vec4 fragColor;
        
void main(void) {

	vec3 nfNormal = normalize(fNormal);
	vec3 nfEyeVector = normalize(fEyeVector);
	vec3 texCoord = reflect(nfEyeVector, nfNormal);
	vec3 rotatedTextureCoord = vec3(texCoord.y, texCoord.z, texCoord.x);
	
	vec4 envSpecularColor = textureLod(radiance, rotatedTextureCoord, matRoughness);
	vec4 envDiffuseColor = texture(irradiance, rotatedTextureCoord);

	fragColor = matGlossiness*matSpecularColor*envSpecularColor
		+(1.0-matGlossiness)*matDiffuseColor*envDiffuseColor;
	
}