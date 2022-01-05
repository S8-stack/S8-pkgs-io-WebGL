

precision mediump float;

uniform vec4 outlineColor;
uniform vec4 glowColor;

varying vec3 interpolatedNormal, eyeVec;

void main() {

	float intensity = dot(normalize(interpolatedNormal), normalize(eyeVec));
		
	vec4 final_color = vec4(
			intensity*glowColor[0]+(1.0-intensity)*outlineColor[0],
			intensity*glowColor[1]+(1.0-intensity)*outlineColor[1],
			intensity*glowColor[2]+(1.0-intensity)*outlineColor[2], 1.0);
		
	gl_FragColor = final_color;
}