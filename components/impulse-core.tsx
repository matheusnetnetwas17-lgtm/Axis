'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

type Quality = 'desktop' | 'tablet'

const QUALITY = {
  desktop: { dpr: [1, 1.5] as [number, number], distort: 0.3, scale: 0.72 },
  tablet: { dpr: [1, 1.25] as [number, number], distort: 0.24, scale: 0.62 },
}

function ImpulseMesh({
  distort,
  scale,
  animate,
}: {
  distort: number
  scale: number
  animate: boolean
}) {
  const mesh = useRef<Mesh>(null)

  // Increment by delta (never bound to elapsedTime) so remounting the scene
  // never causes a rotation jump.
  useFrame((_, delta) => {
    if (!animate || !mesh.current) return
    mesh.current.rotation.x += delta * 0.035
    mesh.current.rotation.y += delta * 0.055
  })

  return (
    <mesh ref={mesh} scale={scale}>
      {/* Smooth icosahedron reads as a technological "impulse core". */}
      <icosahedronGeometry args={[1.35, 12]} />
      <MeshDistortMaterial
        color="#0a2a66"
        emissive="#03122e"
        emissiveIntensity={0.35}
        distort={distort}
        speed={animate ? 0.7 : 0}
        roughness={0.28}
        metalness={0.55}
        transparent
        opacity={0.82}
      />
    </mesh>
  )
}

export default function ImpulseCore({
  quality = 'desktop',
  animate = true,
}: {
  quality?: Quality
  animate?: boolean
}) {
  const q = QUALITY[quality]

  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 42 }}
      dpr={q.dpr}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      // Release the WebGL context deterministically when the intro unmounts.
      onCreated={({ gl }) => {
        const canvas = gl.domElement
        canvas.addEventListener(
          'webglcontextlost',
          (e) => e.preventDefault(),
          false,
        )
      }}
    >
      <ambientLight intensity={0.28} />
      <directionalLight position={[3, 2, 4]} intensity={0.7} color="#1685ff" />
      {/* Cyan reflections along one edge. */}
      <pointLight position={[-3, -1, 2]} intensity={0.9} color="#00e5ff" />
      {/* Soft rim light from behind for a cut-out glow. */}
      <pointLight position={[0, 0, -4]} intensity={1.1} color="#0066ff" />
      <ImpulseMesh distort={q.distort} scale={q.scale} animate={animate} />
    </Canvas>
  )
}
