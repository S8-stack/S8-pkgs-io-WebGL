#version 300 es

// shader start here
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 Model_Matrix;

uniform vec3 eyePosition;

layout(location = 0) in vec3 vertex;
layout(location = 1) in vec3 normal;

out vec3 fNormal;
out vec3 fEyeVector;


void main() {
	
	fEyeVector = vec3(Model_Matrix*vec4(vertex, 1.0))-eyePosition;
		
	fNormal = normal;


	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}	
	            
