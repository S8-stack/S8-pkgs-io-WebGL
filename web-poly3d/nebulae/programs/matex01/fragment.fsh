

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

varying vec2 texC;

uniform sampler2D texture;

varying vec3 interpolatedNormal, eyeVec;

void main() {

	float diffuse, specular;
	vec3 N,E,R;
	
	/* diffuse + ambient */
	vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0);
	
	/* specular */
	vec4 color2 = vec4(0.0, 0.0, 0.0, 1.0);
	
	/* texture */
	vec4 tx_color = texture2D(texture, texC);

	for(int i=0; i<2; i++){

		color1 += lights[i].ambient * material.ambient;
		
		N = normalize(interpolatedNormal);
		diffuse = dot(N, lights[i].direction);
		
		if(diffuse > 0.0){
			color1 += lights[i].diffuse * material.diffuse * diffuse;
			
			E = normalize(eyeVec);
			R = reflect(-lights[i].direction, N);
			specular = pow(max(dot(R, E), 0.0), material.shininess);
			color2 += lights[i].specular * material.specular * specular;
		}
	}

	gl_FragColor = color1 * tx_color + color2;
}