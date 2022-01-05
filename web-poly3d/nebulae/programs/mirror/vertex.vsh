
uniform mat4 ModelViewProjection_Matrix;
uniform mat4 Model_Matrix;

uniform vec3 eyePosition;

attribute vec3 vertex, normal;

varying vec3 vTextureCoord;

void main() {
	
	vec3 eyeVector = normalize(vec3(Model_Matrix*vec4(vertex, 1.0))-eyePosition);
	

	vTextureCoord = reflect(eyeVector, normal);

	gl_Position = ModelViewProjection_Matrix * vec4(vertex, 1.0);
}	
	            
