
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 ModelView_Matrix;
uniform mat3 Normal_Matrix;

attribute vec3 vertex, normal;

varying vec3 interpolatedNormal, eyeVec;

void main() {
	
	interpolatedNormal = Normal_Matrix * normal;
	/*interpolatedNormal = normal;*/
	
	
	eyeVec = -vec3(ModelView_Matrix * vec4(vertex, 1.0));
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}
