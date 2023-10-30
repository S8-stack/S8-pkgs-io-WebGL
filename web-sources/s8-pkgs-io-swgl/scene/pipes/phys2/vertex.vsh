#version 300 es

// shader start here
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 Model_Matrix;

uniform vec3 eyePosition;

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;
layout(location = 4) in vec2 texCoords;

out vec3 fNormal;
out vec3 fEyeVector;


/* flat interpolation for tex coords since only stencil on lib textures (flat keyword required on both .vsh and .fsh) */
out vec2 fTexCoords;


void main() {
	
	fEyeVector = vec3(Model_Matrix*vec4(vertex, 1.0))-eyePosition;
		
	fNormal = normal;

	/* pass tex coords */
	fTexCoords = texCoords;

	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}	
	            
