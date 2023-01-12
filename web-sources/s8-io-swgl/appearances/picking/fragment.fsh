#version 300 es

precision mediump float;

flat in vec4 fColor;


out vec4 fragColor;

void main(void) {
	fragColor = fColor;
}
