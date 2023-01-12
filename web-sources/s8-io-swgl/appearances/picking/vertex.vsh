#version 300 es

// shader start here
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 Model_Matrix;

uniform vec3 eyePosition;

layout(location = 0) in vec3 vertex;
layout(location = 5) in vec4 color;

flat out vec4 fColor;

void main(void) {
	fColor = color;
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}
