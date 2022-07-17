#define _PI 3.1415926538

uniform float time;
varying vec2 vUv;

void main() {
  float _Steepness = 0.2;
  float _Amplitude = 0.2;
  float _Wavelength = 3.0;
  float _Speed = 2.0;

  vUv = uv;

  float k = 2.0 * _PI / _Wavelength;
  float f = k * (position.x- _Speed * time);
  float a = _Steepness / k;
  float z = a * sin(f);
  float x = a * cos(f)*2.0;
  //vec3 pos = vec3(position.x, position.y, clamp(z, 0.0, 1.0) );

  vec3 pos = position;
  pos.z = cos(-pos.x * 0.5 + time * 1.2) * (1. - abs(pos.x) / 15.)*0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
