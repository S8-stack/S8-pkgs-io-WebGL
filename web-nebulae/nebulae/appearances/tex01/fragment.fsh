

precision mediump float;



varying vec2 texC;

uniform sampler2D texture;

void main() {
	
	/* texture */
	vec4 tx_color = texture2D(texture, texC);
	gl_FragColor = tx_color;
}