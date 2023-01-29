import { DepthTexture, DepthFormat, UnsignedShortType } from 'three'
import * as React from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useFBO } from "@react-three/drei";

function hideMeshes(scene) {
  scene.traverse(function(element) {
      if (element.userData.depthWrite === false) {
          element.visible = false;
      }
  })
}

function showMeshes(scene) {
  scene.traverse(function(element) {
      if (element.userData.depthWrite === false) {
          element.visible = true;
      }
  })
}

function useDepthBufferCustom({ size = null, frames = Infinity }: { size?: number; frames?: number } = {}) {
  const dpr = useThree((state) => state.viewport.dpr)
  const { width, height } = useThree((state) => state.size)
  const w = width * dpr
  const h = height * dpr

  const depthConfig = React.useMemo(() => {
    const depthTexture = new DepthTexture(w, h)
    depthTexture.format = DepthFormat
    depthTexture.type = UnsignedShortType
    return { depthTexture }
  }, [w, h])

  let count = 0
  const depthFBO = useFBO(w, h, depthConfig)
  useFrame((state) => {
    if (frames === Infinity || count < frames) {
      //console.log(state.camera)
      hideMeshes(state.scene);
      state.gl.setRenderTarget(depthFBO)
      state.gl.render(state.scene, state.camera)
      state.gl.setRenderTarget(null)
      showMeshes(state.scene)
      count++
    }
  })
  return depthFBO.depthTexture
}

export { useDepthBufferCustom }