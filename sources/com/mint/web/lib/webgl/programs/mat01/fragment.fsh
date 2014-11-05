

precision mediump float;

struct Light {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	vec3 direction;
};

uniform Light lights[2];


struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float shininess;
};

uniform Material material;


varying vec3 interpolatedNormal, eyeVec;

void main() {

	float diffuse, specular;
	vec3 N,E,R;
	vec4 final_color = vec4(0.0, 0.0, 0.0, 1.0);

	for(int i=0; i<2; i++){

		final_color += lights[i].ambient * material.ambient;
		
		
		N = normalize(interpolatedNormal);
		/*
		 * diffuse = dot(N, lights[i].direction);
		 */
		diffuse = dot(N, lights[i].direction);
		
		if(diffuse > 0.0){
			final_color += lights[i].diffuse * material.diffuse * diffuse;
			
			E = normalize(eyeVec);
			R = reflect(-lights[i].direction, N);
			specular = pow(max(dot(R, E), 0.0), material.shininess);
			final_color += lights[i].specular * material.specular * specular;
		}
	}

	gl_FragColor = final_color;
}