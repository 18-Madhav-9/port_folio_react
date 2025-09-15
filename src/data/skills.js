// --- SKILLS GALAXY DATA ---
const DOMAINS = [
  { id: 'mern', name: 'MERN Full Stack', color: '#10b981', desc: 'End-to-end web applications using MongoDB, Express, React, and Node.js.' },
  { id: 'frontend', name: 'Frontend Dev', color: '#3b82f6', desc: 'Crafting responsive, accessible, and interactive user interfaces.' },
  { id: 'backend', name: 'Backend Dev', color: '#f59e0b', desc: 'Building robust APIs, databases, and server-side logic.' },
  { id: 'database', name: 'Database', color: '#6366f1', desc: 'Designing, managing, and optimizing relational and NoSQL databases.' },
  { id: 'desktop', name: 'Desktop Dev', color: '#8b5cf6', desc: 'Creating native and cross-platform desktop applications.' },
  { id: 'system', name: 'Low-Level', color: '#ef4444', desc: 'High-performance computing and system-level programming.' },
  { id: 'mobile', name: 'Mobile Dev', color: '#ec4899', desc: 'Building seamless applications for iOS and Android devices.' },
  { id: 'devops', name: 'DevOps / Cloud', color: '#06b6d4', desc: 'Infrastructure, deployment, containerization, and scaling.' },
  { id: 'data', name: 'Data / AI', color: '#14b8a6', desc: 'Data analysis, machine learning models, and AI integrations.' },
  { id: 'game', name: 'Game Dev', color: '#f97316', desc: 'Designing interactive 2D and 3D game experiences.' },
];

const SKILLS_DATA = [
  { id: 'react', name: 'React', prof: 0, domains: ['mern', 'frontend'] },
  { id: 'node', name: 'Node.js', prof: 0, domains: ['mern', 'backend'] },
  { id: 'express', name: 'Express', prof: 0, domains: ['mern', 'backend'] },
  { id: 'mongo', name: 'MongoDB', prof: 0, domains: ['mern', 'backend', 'database'] },

  { id: 'html', name: 'HTML/CSS', prof: 0, domains: ['frontend'] },
  { id: 'js', name: 'JavaScript', prof: 0, domains: ['frontend', 'backend'] },
  { id: 'ts', name: 'TypeScript', prof: 0, domains: ['frontend', 'backend'] },
  { id: 'next', name: 'Next.js', prof: 0, domains: ['frontend'] },
  { id: 'tailwind', name: 'Tailwind CSS', prof: 0, domains: ['frontend'] },

  { id: 'django', name: 'Django', prof: 0, domains: ['backend'] },
  { id: 'spring', name: 'Spring Boot', prof: 0, domains: ['backend'] },
  { id: 'rest', name: 'REST APIs', prof: 0, domains: ['backend'] },
  { id: 'graphql', name: 'GraphQL', prof: 0, domains: ['backend'] },

  { id: 'mysql', name: 'MySQL', prof: 0, domains: ['database'] },
  { id: 'postgres', name: 'PostgreSQL', prof: 0, domains: ['database'] },
  { id: 'sqlite', name: 'SQLite', prof: 0, domains: ['database'] },
  { id: 'redis', name: 'Redis', prof: 0, domains: ['database', 'backend'] },
  { id: 'firebase', name: 'Firebase', prof: 0, domains: ['database', 'backend'] },
  { id: 'supabase', name: 'Supabase', prof: 0, domains: ['database', 'backend'] },

  { id: 'java', name: 'Java', prof: 0, domains: ['desktop', 'backend'] },
  { id: 'csharp', name: 'C#', prof: 0, domains: ['desktop', 'game'] },
  { id: 'electron', name: 'Electron', prof: 0, domains: ['desktop'] },

  { id: 'c', name: 'C', prof: 0, domains: ['system'] },
  { id: 'cpp', name: 'C++', prof: 0, domains: ['system', 'game'] },
  { id: 'opengl', name: 'OpenGL', prof: 0, domains: ['system', 'game'] },
  { id: 'cuda', name: 'CUDA', prof: 0, domains: ['system'] },

  { id: 'unity', name: 'Unity', prof: 0, domains: ['game'] },
  { id: 'unreal', name: 'Unreal Engine', prof: 0, domains: ['game'] },

  { id: 'flutter', name: 'Flutter', prof: 0, domains: ['mobile'] },
  { id: 'reactnative', name: 'React Native', prof: 0, domains: ['mobile'] },
  { id: 'swift', name: 'Swift', prof: 0, domains: ['mobile'] },

  { id: 'docker', name: 'Docker', prof: 0, domains: ['devops'] },
  { id: 'kube', name: 'Kubernetes', prof: 0, domains: ['devops'] },
  { id: 'aws', name: 'AWS', prof: 0, domains: ['devops'] },
  { id: 'linux', name: 'Linux', prof: 0, domains: ['devops', 'system'] },

  { id: 'python', name: 'Python', prof: 0, domains: ['data', 'backend'] },
  { id: 'tf', name: 'TensorFlow', prof: 0, domains: ['data'] },
  { id: 'pytorch', name: 'PyTorch', prof: 0, domains: ['data'] },
  { id: 'pandas', name: 'Pandas', prof: 0, domains: ['data'] },
];

export { SKILLS_DATA, DOMAINS };