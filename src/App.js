import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useResource, useThree } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'

import WasdControls from './WasdControls'
export default function App() {
  const orbitControls = useResource()
  return (
    <Canvas>
      <color attach="background" args={['white']} />
      <CameraRig position={[0, 1.6, 5]} fov={70} />
      <gridHelper />
      <OrbitControls ref={orbitControls} />
      <WasdControls orbitControls={orbitControls} />
      <Thing position-y={1} />
    </Canvas>
  )
}

function CameraRig(props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(ref.current), [])
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
}

function Thing(props) {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}
