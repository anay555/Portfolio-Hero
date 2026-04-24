import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, position, rotation, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const targetScaleVec = useRef(new THREE.Vector3(1, 1, 1));
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float is handled by parent Float component, but we add scale on hover
      const targetScale = hovered ? 1.1 : 1;
      targetScaleVec.current.set(targetScale, targetScale, targetScale);
      meshRef.current.scale.lerp(targetScaleVec.current, 0.1);
    }
  });

  // Mini Visualizations
  const renderViz = () => {
    if (project.type === 'bar') {
      return (
        <group position={[0, 0, 0.1]}>
          {[-1, -0.5, 0, 0.5, 1].map((x, i) => (
            <mesh key={i} position={[x * 0.8, -0.5 + (Math.sin(i * 10) + 1) * 0.25, 0]}>
              <boxGeometry args={[0.3, 1 + Math.sin(i * 20) * 0.8, 0.1]} />
              <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>
      );
    }
    if (project.type === 'cloud') {
       return (
        <points position={[0, 0, 0.1]}>
            <sphereGeometry args={[1, 16, 16]} />
            <pointsMaterial size={0.05} color={COLORS.accent} />
        </points>
       )
    }
    if (project.type === 'heatmap') {
        return (
            <group position={[0,0,0.1]}>
                 {Array.from({ length: 9 }).map((_, i) => {
                     const x = (i % 3) - 1;
                     const y = Math.floor(i / 3) - 1;
                     return (
                         <mesh key={i} position={[x * 0.7, y * 0.7, 0]}>
                             <boxGeometry args={[0.6, 0.6, 0.05]} />
                             <meshStandardMaterial
                                color={Math.random() > 0.5 ? COLORS.primary : COLORS.accent}
                                transparent opacity={0.6}
                             />
                         </mesh>
                     )
                 })}
            </group>
        )
    }
    return null;
  };

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(project)}
      >
        {/* Card Glass Background */}
        <mesh>
          <boxGeometry args={[3, 4, 0.2]} />
          <meshPhysicalMaterial
            color="#111827"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Border Glow */}
        <mesh position={[0, 0, -0.05]}>
           <boxGeometry args={[3.05, 4.05, 0.15]} />
           <meshBasicMaterial color={hovered ? COLORS.accent : COLORS.primary} transparent opacity={0.3} />
        </mesh>

        {/* Content */}
        <group position={[0, 0.5, 0.15]}>
            {renderViz()}
        </group>

        {/* Text Overlay (World Space) */}
        <Text
            position={[0, -1.2, 0.12]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
            {project.title}
        </Text>
        <Text
            position={[0, -1.5, 0.12]}
            fontSize={0.12}
            color={COLORS.primary}
            anchorX="center"
            anchorY="middle"
        >
            {project.category.toUpperCase()}
        </Text>

      </group>
    </Float>
  );
};

export default ProjectCard;
