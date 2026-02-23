import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

// ── Preload local assets ─────────────────────────────────────────────────────
useGLTF.preload('/tag.glb')
useTexture.preload('/tcs-rope.png')
useTexture.preload('/my-card.png')

// ── Band ─────────────────────────────────────────────────────────────────────
function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band  = useRef()
  const fixed = useRef()
  const j1    = useRef()
  const j2    = useRef()
  const j3    = useRef()
  const card  = useRef()

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()

  // ── Exactly the original Vercel segmentProps (canSleep: true) ──────────────
  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  }

  // ── Local GLB + your textures ─────────────────────────────────────────────
  const { nodes, materials } = useGLTF('/tag.glb')
  const ropeTexture = useTexture('/tcs-rope.png')
  const cardTexture = useTexture('/my-card.png')

  const { width, height } = useThree((state) => state.size)

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )
  const [dragged, drag]   = useState(false)
  const [hovered, hover]  = useState(false)

  // ── Joints — identical to original ───────────────────────────────────────
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1,   j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2,   j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3,  card, [[0, 0, 0], [0, 1.45, 0]])

  // ── Cursor ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged])

  // ── Rope texture ─────────────────────────────────────────────────────────
  // wrapS RepeatWrapping so the TATA logo tiles along the band length
  useEffect(() => {
    ropeTexture.wrapS = THREE.RepeatWrapping
    ropeTexture.wrapT = THREE.ClampToEdgeWrapping
    ropeTexture.colorSpace = THREE.SRGBColorSpace
    ropeTexture.anisotropy = 8  // lighter GPU, same visible quality
    ropeTexture.needsUpdate = true
  }, [ropeTexture])

  // ── Card texture ─────────────────────────────────────────────────────────
  useEffect(() => {
    cardTexture.flipY = false
    cardTexture.colorSpace = THREE.SRGBColorSpace
    cardTexture.wrapS = THREE.ClampToEdgeWrapping
    cardTexture.wrapT = THREE.ClampToEdgeWrapping
    cardTexture.anisotropy = 8  // lighter GPU, same visible quality
    cardTexture.needsUpdate = true
  }, [cardTexture])

  // ── Frame loop — identical to original ───────────────────────────────────
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        )
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        )
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
    // ✅ frameloop="demand": request next frame only while physics is active.
    // Once card settles, rendering stops — zero idle GPU cost.
    state.invalidate()
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[2.5, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              )
            }}
          >
            {/* ── CARD: your cardTexture, original PBR settings ── */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>

            {/* ── CLIP + CLAMP: original metal material ── */}
            <mesh geometry={nodes.clip.geometry}  material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* ── ROPE: your ropeTexture ── */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={ropeTexture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

// ── Badge (Canvas) ────────────────────────────────────────────────────────────
export default function Badge() {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      gl={{ alpha: true, antialias: true }}
      frameloop="demand"
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={Math.PI} />

      {/*
        Physics is OUTSIDE Suspense — Rapier WASM compiles immediately
        when the Canvas mounts, in parallel with asset loading.
        Band (GLB + textures) suspends inside and mounts into the
        already-running world the moment assets resolve.
      */}
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Suspense fallback={null}>
          <Band />
        </Suspense>
      </Physics>

      {/*
        Original Vercel Lightformers — zero network cost, instant.
        background prop removed so canvas stays transparent.
      */}
      <Environment blur={0.75}>
        <Lightformer intensity={2}  color="white" position={[0, -1, 5]}    rotation={[0, 0, Math.PI / 3]}         scale={[100, 0.1, 1]} />
        <Lightformer intensity={3}  color="white" position={[-1, -1, 1]}   rotation={[0, 0, Math.PI / 3]}         scale={[100, 0.1, 1]} />
        <Lightformer intensity={3}  color="white" position={[1, 1, 1]}     rotation={[0, 0, Math.PI / 3]}         scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]}  rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  )
}