  uniform float time;
  uniform vec3 color;
  uniform sampler2D texture1;


  varying vec2 vUv;

  #pragma glslify: random = require(glsl-random)

  void main() {
    //gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    // gl_FragColor.rgba = vec4(vec3(0.), 1.);
    gl_FragColor = vec4(vec3(0.0, 1.0, 1.0), 0.55);
  }
