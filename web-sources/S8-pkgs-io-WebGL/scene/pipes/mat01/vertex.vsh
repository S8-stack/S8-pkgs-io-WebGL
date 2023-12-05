#version 300 es

uniform mat4 ModelViewProjection_Matrix;
uniform mat4 ModelView_Matrix;
uniform mat4 Normal_Matrix;

layout (location = 0) in vec3 position; // The position variable has attribute position 0
layout (location = 1) in vec3 normal; // The position variable has attribute position 1


out vec3 interpolatedNormal, eyeVec;

void main() {
	
	interpolatedNormal = vec3(Normal_Matrix * vec4(normal, 0.0));
	/*interpolatedNormal = normal;*/
	
	
	eyeVec = -vec3(ModelView_Matrix * vec4(position, 1.0));
	gl_Position = ModelViewProjection_Matrix * vec4(position, 1.0);
}
