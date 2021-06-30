precision mediump float;
precision mediump sampler2D;

varying vec2 coords;
uniform vec2 ratio;
uniform sampler2D density;
uniform sampler2D image;

void main(void) {
  vec2 pos = vec2(coords.x - 0.5, 0.5 - coords.y) * ratio * 2.0 + vec2(0.5, 0.5);
  vec4 base2 = texture2D(image, pos);
  gl_FragColor = vec4(texture2D(density, coords).rgb*(1.0-base2.a) + base2.rgb * base2.a,1.0);
}
