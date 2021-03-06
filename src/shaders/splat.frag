precision highp float;
precision mediump sampler2D;

varying vec2 coords;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;

void main() {
    vec2 p = coords - point.xy;
    p.x *= aspectRatio;
    float strength = exp(-dot(p, p) / radius);
    vec3 base = texture2D(uTarget, coords).xyz;
    gl_FragColor = vec4(base * (1.0 - strength) + strength * color, 1.0);
}
