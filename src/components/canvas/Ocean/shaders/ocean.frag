//   #include <packing>

//   uniform float time;
//   uniform vec3 color;
//   uniform sampler2D depthBuffer;
//   uniform float cameraNear;
//   uniform float cameraFar;
//   uniform vec2 screenSize;


//   varying vec2 vUv;
//   varying vec4 WorldPosition;

//   #pragma glslify: random = require(glsl-random)

//   float linearizeDepth(float z) {
//     return perspectiveDepthToViewZ( z, cameraNear, cameraFar );
//   }

//   float getScreenDepth(vec2 uv) {
//     float depth = unpackRGBAToDepth(texture2D(depthBuffer, uv));
//     return linearizeDepth(depth);
//   }

//   float getLinearDepth(vec3 pos) {
//     float viewZ = (viewMatrix * vec4(pos, 1.0)).z;
//     return viewZ;
// }


//   void main() {
//     //gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
//     // gl_FragColor.rgba = vec4(vec3(0.), 1.);
//     vec2 uv = gl_FragCoord.xy;
//     vec4  tex =  texture2D(depthBuffer, gl_FragCoord.xy/ screenSize);
//     //float depth = unpackRGBAToDepth(tex);
//     //depth = linearizeDepth(depth);

//     float worldDepth = (viewMatrix * vec4(WorldPosition.xyz, 1.0)).z;
//     float screenDepth = getScreenDepth(gl_FragCoord.xy/ screenSize);
//     float offsetScreenDepth = getScreenDepth(vUv / screenSize);


//     float originalDiff = (worldDepth - screenDepth);
//     float diff = (worldDepth - offsetScreenDepth);

//     //temp
//     float depth = unpackRGBAToDepth(texture2D(depthBuffer, gl_FragCoord.xy / screenSize));
//     depth = linearizeDepth(depth);

//     float worldDepthTemp = (viewMatrix * vec4(WorldPosition.xyz, 1.0)).z;

//     float depthDiff = worldDepthTemp - depth;

//     //end temp




//     float alpha = 1.0-vUv.x;
//     vec4 color = vec4(vec3(0.5059, 0.8353, 0.9725), alpha);
//     color = vec4(depth, depth, depth, 1.0);


//     color = vec4(vec3(depthDiff), 1.0);

//     // if (originalDiff < 0.6) {
//     //   color = vec4(1);
//     // } else if (originalDiff < 1.0) {
//     //   color = vec4(0.7, 0.95, 1.0, 0.75);
//     // }

//     // if(worldDepth > screenDepth){
//     //    color = vec4(1);
//     // }else{
//     //   color = vec4(vec3(0.0), 1.0);
//     // }


//     gl_FragColor = color;
//   }




#include <packing>

varying vec4 WorldPosition;
varying vec2 vUv;

uniform vec2 screenSize;
uniform sampler2D depthBuffer;
uniform float time;
uniform float cameraNear;
uniform float cameraFar;


float linearizeDepth(float z) {
  float viewZ = perspectiveDepthToViewZ( z, cameraNear, cameraFar );
  return viewZ;
}


float getScreenDepth(vec2 uv) {
  // float depth = unpackRGBAToDepth(texture2D(depthBuffer, uv));
  float depth = texture2D(depthBuffer, uv).x;
  return linearizeDepth(depth);
}
 
float getLinearDepth(vec3 pos) {
    float viewZ = (viewMatrix * vec4(pos, 1.0)).z;
    return viewZ;
}

void main() {
  vec2 uv = gl_FragCoord.xy;

  float wave = sin(vUv.x * 50. + time * 2.) / 2. + 0.3;
  uv -= (viewMatrix * vec4(0.0, 0.0, wave  * 10., 0.0)).xy;

  vec4 color = vec4(0.6078, 0.8, 0.8824, 0.867);
  
  float worldDepth = getLinearDepth(WorldPosition.xyz);
  float screenDepth = getScreenDepth(gl_FragCoord.xy / screenSize);
  float offsetScreenDepth = getScreenDepth(uv / screenSize);

  float originalDiff = (worldDepth - screenDepth);
  float diff = (worldDepth - offsetScreenDepth);

  vec4 waterColor = color;
  //color = mix(color, waterColor, vec4(0.5 + diff / 2.));

  if (originalDiff < 0.0005) {
    color = vec4(vec3(0.0), 1.0);
  }
  else if (originalDiff < 0.005) {
    color = vec4(1);
  } else if (originalDiff < 0.02) {
     color = vec4(color.xyz, 0.5);
  } else if (originalDiff < 0.5){
     color = vec4(color.xyz, 0.8);
  }else{
    color = vec4(color.xyz, 1.0);
  }

  gl_FragColor = color;
}