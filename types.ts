export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: { label: string; value: string }[];
  type: 'bar' | 'cloud' | 'heatmap';
  link?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

// Global declaration for React Three Fiber elements to resolve TypeScript errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      icosahedronGeometry: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      points: any;
      pointsMaterial: any;
      boxGeometry: any;
      planeGeometry: any;
      fog: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}