"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

// Vertex Shader: Standard position with UVs
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader: Walnut procedural approximation + Glow Zone logic
const fragmentShader = `
uniform float uTime;
uniform float uScrollY;
uniform vec3 uColor1; // Walnut Dark
uniform vec3 uColor2; // Walnut Light
uniform vec3 uGlowColor; // 3000K Light

varying vec2 vUv;
varying vec3 vPosition;

// Simple noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  // 1. Procedural Wood Grain (Simple)
  float n = noise(vUv * vec2(10.0, 100.0) + vec2(0.0, n));
  // Add some vertical streakiness
  float grain = noise(vec2(vUv.x * 20.0, vUv.y * 2.0));
  
  vec3 woodColor = mix(uColor1, uColor2, grain * 0.5 + 0.2);
  
  // 2. Light Bar (Glow Zone) Logic
  // Map normalized scroll Y to UV space (approximate)
  float lightPos = 1.0 - uScrollY; 
  float dist = distance(vUv.y, lightPos);
  
  // Gaussian glow
  float glow = exp(-pow(dist * 4.0, 2.0));
  
  // Combine
  vec3 finalColor = mix(woodColor, uGlowColor, glow * 0.4);
  
  // Vignette for depth
  float vignette = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
  finalColor *= vignette;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function Slats() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const count = 20; // Number of slats

    // Material Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScrollY: { value: 0 },
            uColor1: { value: new THREE.Color("#2a1a10") }, // Dark Walnut
            uColor2: { value: new THREE.Color("#5c3a2a") }, // Lighter Walnut
            uGlowColor: { value: new THREE.Color("#FFD27D") }, // 3000K Glow
        }),
        []
    );

    const dummy = new THREE.Object3D();

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.getElapsedTime();
            // Normalize scroll based on doc height (Simplified for now)
            // Ideally we should sync this with Lenis scroll
            const scrollNorm = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            uniforms.uScrollY.value = THREE.MathUtils.lerp(uniforms.uScrollY.value, scrollNorm, 0.1);
        }
    });

    // Setup instances
    useMemo(() => {
        if (!meshRef.current) return;
        const width = viewport.width / count;

        for (let i = 0; i < count; i++) {
            dummy.position.set(
                (i - count / 2) * (width * 1.5), // Spread them out
                0,
                0
            );
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [viewport, count, dummy]); // Added dummy to dependencies

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <planeGeometry args={[viewport.width / count, viewport.height * 1.5]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </instancedMesh>
    );
}

export default function SlatBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Slats />
                <Environment preset="studio" />
            </Canvas>
        </div>
    );
}
