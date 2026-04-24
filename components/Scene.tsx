import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, Stars, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import HeroSculpture from './HeroSculpture';
import ProjectCard from './ProjectCard';
import { PROJECTS, SCENE_CONFIG, COLORS } from '../constants';
import { Project } from '../types';

interface SceneProps {
  onProjectSelect: (project: Project) => void;
}

// Camera Rig for Mouse Parallax
const CameraRig = ({ isMobile }: { isMobile: boolean }) => {
  const targetPos = useRef(new THREE.Vector3());
  
  useFrame((state) => {
    // Smoothly lerp camera position based on mouse pointer
    // Reduced movement on mobile to prevent motion sickness/disorientation
    const intensity = isMobile ? 0.5 : 2;
    const baseY = isMobile ? 0 : 2;
    const baseZ = isMobile ? 18 : 12;

    targetPos.current.set(
      state.pointer.x * intensity,   
      baseY + state.pointer.y * (intensity * 0.5), 
      baseZ
    );

    state.camera.position.lerp(targetPos.current, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene: React.FC<SceneProps> = ({ onProjectSelect }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, isMobile ? 0 : 2, isMobile ? 18 : 12], fov: 35 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      className="z-0"
    >
      <fog attach="fog" args={[SCENE_CONFIG.fogColor, SCENE_CONFIG.fogNear, SCENE_CONFIG.fogFar]} />
      
      <Suspense fallback={null}>
        <CameraRig isMobile={isMobile} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lights */}
        <ambientLight intensity={0.2} color={COLORS.background} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1000}
          color={COLORS.primary}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={500} color={COLORS.accent} />

        {/* Hero Object 
            Mobile: Center it [0, 1, 0] and scale down slightly
            Desktop: Offset left [-2, 0.5, 0] to allow text on right
        */}
        <group position={isMobile ? [0, 1, 0] : [-2, 0.5, 0]} scale={isMobile ? 0.7 : 1}>
           <HeroSculpture />
        </group>

        {/* Project Cards - Hide on mobile to reduce clutter and reliance on precise touch in 3D */}
        {!isMobile && (
          <group position={[3, 0, 0]}>
             {PROJECTS.map((project, index) => {
                 // Position calculation for a slight arc
                 const x = index * 2.5; 
                 const z = index * -1;
                 return (
                     <ProjectCard 
                          key={project.id} 
                          project={project} 
                          position={[x, 0, z]} 
                          rotation={[0, -0.3, 0]}
                          onClick={onProjectSelect}
                      />
                 );
             })}
          </group>
        )}

        {/* Reflective Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512} // Reduced resolution for better perf
            mixBlur={1}
            mixStrength={80}
            roughness={0.5}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
            mirror={0}
          />
        </mesh>
        
        <ContactShadows resolution={512} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />
      </Suspense>
    </Canvas>
  );
};

export default Scene;