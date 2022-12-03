
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 ModelView_Matrix;
uniform mat4 Normal_Matrix;

attribute vec3 vertex, normal;

varying vec3 interpolatedNormal, eyeVec;

void main() {
	
	interpolatedNormal = vec3(Normal_Matrix * vec4(normal, 0.0));
	/*interpolatedNormal = normal;*/
	
	
	eyeVec = -vec3(ModelView_Matrix * vec4(vertex, 1.0));
	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}
