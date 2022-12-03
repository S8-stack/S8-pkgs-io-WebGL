
uniform mat4 ModelViewProjection_Matrix;

attribute vec3 vertex;
attribute vec2 texCoord;

varying vec2 texC;


void main() {
	
	texC = texCoord;
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}
