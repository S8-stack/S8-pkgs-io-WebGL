#version 300 es

layout(location = 0) in vec3 position;

uniform mat4 ModelViewProjection_Matrix;

void main(void) {
	gl_Position = ModelViewProjection_Matrix * vec4(position, 1.0);
}