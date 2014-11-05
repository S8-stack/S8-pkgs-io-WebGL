precision mediump float;

uniform vec3 pickingColor;

void main(void) {
	gl_FragColor = vec4(pickingColor, 1.0);
}
