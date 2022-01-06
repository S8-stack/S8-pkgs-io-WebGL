attribute vec3 vertex;

uniform mat4 ModelViewProjection_Matrix;

void main(void) {
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}