import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';

const HeroSculpture: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  // Generate stable random particles with spherical distribution
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.2 + Math.random() * 1.5; // Orbit just outside the rings
      
      return {
        pos: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        scale: Math.random() * 0.6 + 0.4,
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Mouse position (-1 to 1)

    // 1. Group Interaction: Tilt towards mouse for parallax effect
    if (groupRef.current) {
      // Smoothly interpolate rotation based on mouse position
      // Mouse X influences Y rotation, Mouse Y influences X rotation
      const targetRotX = pointer.y * 0.15; 
      const targetRotY = t * 0.1 + pointer.x * 0.15; // Constant slow spin + interaction

      // Using MathUtils.lerp for smooth damping
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    }

    // 2. Ring Animations: Gyroscopic motion
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.15;
      ringRef1.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = Math.cos(t * 0.3) * 0.2; 
      ringRef2.current.rotation.z = t * 0.1;
      // Subtle pulse in the glass distortion
      const mat = ringRef2.current.material as any;
      if (mat && mat.distortionScale) {
          mat.distortionScale = 0.5 + Math.sin(t) * 0.2;
      }
    }

    // 3. Core: Breathing and Pulse
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.6;
      coreRef.current.rotation.z = Math.sin(t) * 0.2;
      
      // Scale pulse (Heartbeat)
      const scale = 1.1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);

      // Emissive Intensity Pulse (Glowing)
      const material = coreRef.current.material as THREE.MeshPhysicalMaterial;
      if (material) {
        material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.4;
      }
    }

    // 4. Particles: Independent Orbit
    if (particlesRef.current) {
        particlesRef.current.rotation.y = -t * 0.05; // Counter-rotate slowly
        particlesRef.current.rotation.z = Math.cos(t * 0.1) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={groupRef} position={[-2, 0.5, 0]}>
        {/* Outer Metallic Ring */}
        <mesh ref={ringRef1} castShadow receiveShadow>
          <torusGeometry args={[3.2, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={COLORS.primary}
            emissive={COLORS.primary}
            emissiveIntensity={1}
            toneMapped={false}
            metalness={1}
            roughness={0.2}
          />
        </mesh>

        {/* Inner Glass Ring */}
        <mesh ref={ringRef2} castShadow receiveShadow>
          <torusGeometry args={[2.5, 0.35, 16, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            chromaticAberration={1.5} // High value for rainbow edges
            anisotropy={1}
            distortion={0.6}
            distortionScale={0.5}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            roughness={0.1}
            color={COLORS.glass}
          />
        </mesh>

        {/* Core Crystal */}
        <mesh ref={coreRef} castShadow>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            roughness={0.1}
            metalness={0.1}
            transmission={0.5}
            thickness={2}
            color={COLORS.accent}
            emissive={COLORS.accent}
            emissiveIntensity={0.5}
            clearcoat={1}
          />
        </mesh>

        {/* Orbiting Particle Field */}
        <group ref={particlesRef}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.pos.x, p.pos.y, p.pos.z]}>
                    <sphereGeometry args={[0.03 * p.scale, 8, 8]} />
                    <meshBasicMaterial color={COLORS.primary} transparent opacity={0.4} />
                </mesh>
            ))}
        </group>
      </group>
    </Float>
  );
};

export default HeroSculpture;