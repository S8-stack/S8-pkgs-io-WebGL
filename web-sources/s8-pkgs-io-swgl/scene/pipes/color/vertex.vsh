attribute vec3 vertex;
attribute vec4 color;

uniform mat4 ModelViewProjection_Matrix;

varying vec4 interpolatedColor;

void main(void) {
	interpolatedColor = color;
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}