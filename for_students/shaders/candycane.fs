uniform vec2 resolution;
uniform float stripe_width; // Width of each stripe
uniform vec3 stripe_color1; // Color of the first stripe (red)
uniform vec3 stripe_color2; // Color of the second stripe (white)
uniform bool use_yc; // Color of the second stripe (white)

const float stripes = 4.0;
const vec3 lightDir = vec3(1,1,1);
varying vec2 v_uv;
varying vec3 v_normal;
uniform float time;

void main() {
    float x = v_uv.x * stripes;
    float y = v_uv.y * stripes;

    float xc = floor(x);
    float yc = floor(y);

    float toUse = (use_yc) ? yc : xc;

    vec3 color = mix(stripe_color1, stripe_color2, mod(toUse + time, 1.5));
    vec3 color2 = mix(stripe_color2, stripe_color1, mod(toUse + time, 1.5));

    float dx = abs(0.5-fract(x));
    float dy = abs(0.5-fract(y));

    float d = max(dx, dy);

    float factor = smoothstep(0.5 - fwidth(d), 0.5, d ) / 2.5;

    vec3 nhat = normalize(v_normal);
    float light = max(dot(nhat, lightDir), 0.3);

    gl_FragColor = vec4(light * mix(color, color2, factor), 1);
}