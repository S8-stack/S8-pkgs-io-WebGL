

precision highp float;

varying vec3 vTextureCoord;
        
uniform samplerCube texture;
        
void main(void) {
	gl_FragColor = textureCube(texture, vTextureCoord);

}