'use client'

import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Perf } from 'r3f-perf'

export function Experience() {
    const cube = useRef<Mesh>(null)

    const hamburger = useGLTF('/hamburger.glb')

    useFrame((state, delta) => {
        if (cube.current)
            cube.current.rotation.y += delta * 0.2
    })

    const handleCubePointEnter = (event: ThreeEvent<PointerEvent>) => {
        document.body.style.cursor = 'pointer'
    }

    const handleCubeClick = (event: ThreeEvent<MouseEvent>) => {
        event.object?.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    const handleCubePointOver = (event: ThreeEvent<PointerEvent>) => {
        event.object?.scale.set(2, 2, 2)
    }

    const handleCubePointLeave = (event: ThreeEvent<PointerEvent>) => {
        event.object?.scale.set(1.5, 1.5, 1.5)
        document.body.style.cursor = 'auto'
    }

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh scale={0.35} position-x={- 2} onClick={e => { e.stopPropagation() }} onPointerOver={e => { e.stopPropagation() }} onPointerLeave={e => { e.stopPropagation() }}>
            <primitive object={hamburger.scene} />
        </mesh>

        <mesh
            ref={cube}
            raycast={meshBounds}
            position-x={2}
            scale={1.5}
            onClick={handleCubeClick}
            onPointerEnter={handleCubePointEnter}
            onPointerOver={handleCubePointOver}
            onPointerLeave={handleCubePointLeave}
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}

export default function App() {
    return (
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 4, 3, 6]
            }}
        >
            <Experience />
        </Canvas>
    )
}