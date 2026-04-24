import { Project, ExperienceItem, EducationItem, SkillCategory } from './types';

export const COLORS = {
  background: '#050a14',
  primary: '#00f3ff', // Electric Cyan
  accent: '#ff7e67',  // Coral
  glass: '#ffffff',
  text: '#e0e6ed',
  darkGlass: 'rgba(10, 15, 30, 0.6)',
};

export const RESUME_URL = "https://linkedin.com/in/anany-sharma-955603144";

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SMART DEBT AGENT',
    category: 'Agentic AI',
    description: 'Agentic assistant with RAG memory, dynamic status buckets, and Google Sheets logging.',
    stats: [{ label: 'Stack', value: 'LangChain' }, { label: 'Status', value: 'Finalist' }],
    type: 'bar',
    link: 'https://github.com/anay555'
  },
  {
    id: '2',
    title: 'SMART RFP SYSTEM',
    category: 'Automation',
    description: 'RAG-based RFP analyzer and auto-response generator using semantic search pipelines.',
    stats: [{ label: 'Backend', value: 'FastAPI' }, { label: 'Search', value: 'Vector DB' }],
    type: 'bar',
    link: 'https://github.com/anay555'
  },
  {
    id: '3',
    title: 'CYBER REASONING',
    category: 'Security',
    description: 'Structured LLM reasoning chains for cybersecurity threat classification and response.',
    stats: [{ label: 'Lang', value: 'Python' }, { label: 'Logic', value: 'CoT' }],
    type: 'heatmap',
    link: 'https://github.com/anay555'
  },
  {
    id: '4',
    title: 'FIELD REPORTER',
    category: 'Civic Tech',
    description: 'Rural issue reporting automation with LLM-based categorization using Gemini.',
    stats: [{ label: 'Frontend', value: 'Next.js' }, { label: 'Auto', value: 'Make.com' }],
    type: 'heatmap',
    link: 'https://github.com/anay555'
  },
  {
    id: '5',
    title: 'AI CAREER GPS',
    category: 'EdTech',
    description: 'Guidance system using surveys + RAG to recommend learning roadmaps via a multi-tab dashboard.',
    stats: [{ label: 'Data', value: 'RAG' }, { label: 'DB', value: 'Firebase' }],
    type: 'cloud',
    link: 'https://github.com/anay555'
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: '1',
    role: 'Data Science with GenAI Intern',
    company: 'Innomatics Research Labs',
    period: 'Nov 2025 - Present',
    description: [
      'Building GenAI-powered pipelines using LLM APIs and vector databases.',
      'Implementing RAG-based assistants and deploying FastAPI-based AI services.',
      'Working on data preprocessing, feature engineering, and ML model development.'
    ],
    tech: 'Python, LangChain, FastAPI'
  },
  {
    id: '2',
    role: 'Google Cloud GenAI Internship',
    company: 'Nasscom & Smartbridge',
    period: 'Jul 2025 - Sep 2025',
    description: [
      'Built GenAI workflows using Vertex AI (text + embeddings) with prompt-engineered chains.',
      'Prototyped RAG systems using vector search for knowledge-grounded assistants.',
      'Containerized experiments and deployed pipelines on GCP.'
    ],
    tech: 'Vertex AI, PaLM APIs'
  },
  {
    id: '3',
    role: 'AI Mastery Workshop',
    company: 'NxtWave',
    period: '2025',
    description: [
      'Completed hands-on labs on LLM APIs and multi-step chaining.',
      'Advanced prompt design for real-world use cases.'
    ],
    tech: 'LLM Integration'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'VIT Bhopal University',
    degree: 'B.Tech in Electronics & Communication (AI & Cybernetics)',
    period: '2022 - 2026',
    grade: 'CGPA: 8.0'
  },
  {
    institution: 'St. Joseph Co-Ed School, Bhopal',
    degree: 'Class 12 (CBSE)',
    period: 'Graduated',
    grade: '74%'
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'AI / ML',
    skills: ['LangChain', 'RAG', 'Transformers', 'GANs', 'GenAI Pipelines', 'Vertex AI']
  },
  {
    category: 'Programming',
    skills: ['Python', 'FastAPI', 'SQL', 'JavaScript', 'Git', 'C++']
  },
  {
    category: 'Deployment & Tools',
    skills: ['Docker', 'AWS', 'GCP', 'n8n', 'Zapier', 'Pabbly']
  },
  {
    category: 'Databases',
    skills: ['Pinecone', 'Qdrant', 'Firebase', 'MongoDB', 'MySQL']
  }
];

export const SCENE_CONFIG = {
  fogColor: '#050a14',
  fogNear: 10,
  fogFar: 40,
};