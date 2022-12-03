
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 ModelView_Matrix;
uniform mat3 Normal_Matrix;

attribute vec3 vertex, normal;
attribute vec2 texCoord;

varying vec3 interpolatedNormal, eyeVec;
varying vec2 texC;


void main() {

	interpolatedNormal = Normal_Matrix * normal;
	
	eyeVec = -vec3(ModelView_Matrix * vec4(vertex, 1.0));
	texC = texCoord;
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}
