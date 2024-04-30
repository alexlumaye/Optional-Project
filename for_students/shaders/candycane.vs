varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_world_position;

void main() {
    vec4 world_pos = (modelMatrix * vec4(position,1.0));
    v_world_position = world_pos.xyz;

    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    v_normal = (modelMatrix * vec4(normal,0)).xyz;
}

