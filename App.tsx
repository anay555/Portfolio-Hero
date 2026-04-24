import React, { useState } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import AIChat from './components/AIChat';
import Navbar from './components/Navbar';
import ScrollReveal from './components/ScrollReveal';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import { Project } from './types';
import { EXPERIENCE, EDUCATION, SKILLS, PROJECTS, RESUME_URL } from './constants';
import { Github, Linkedin, Mail, ExternalLink, Download, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeResumeUrl, setActiveResumeUrl] = useState(RESUME_URL);
  
  // Lifted Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTriggerMessage, setChatTriggerMessage] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => {
        if (data && data.resumeUrl) {
          setActiveResumeUrl(data.resumeUrl);
        }
      })
      .catch(err => console.error("Could not fetch active resume:", err));
  }, []);

  const handleAskAI = (message: string) => {
      setChatTriggerMessage(message);
      setIsChatOpen(true);
  };

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div className={`relative w-full bg-[#050a14] text-gray-200 transition-opacity duration-1000 flex flex-col min-h-screen ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />

        {/* Global Background Grid - Fixed position behind everything */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-30"></div>

        {/* --- HERO SECTION --- */}
        <section id="home" className="relative h-screen w-full overflow-hidden z-10 shrink-0">
          {/* 3D Scene Layer */}
          <div className="absolute inset-0 z-0">
            <Scene onProjectSelect={setSelectedProject} />
          </div>
          {/* Hero Content Overlay */}
          <Overlay 
            selectedProject={selectedProject} 
            onCloseProject={() => setSelectedProject(null)}
            onAskAI={handleAskAI}
          />
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="flex-1">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12 bg-[#00f3ff]"></div>
                    <span className="text-[#00f3ff] tracking-widest uppercase text-sm font-bold">About Me</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                   Aspiring <span className="text-[#00f3ff]">AI/ML</span> and Systems Engineer.
                 </h2>
                 <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                   I am pursuing a B.Tech in Electronics and Communication (AI & Cybernetics) at VIT Bhopal. 
                   My passion lies in building generative AI pipelines, automation agents, embedded systems, and IoT-cloud integrations.
                 </p>
                 <p className="text-gray-400 leading-relaxed mb-8">
                   With hands-on experience in GenAI hackathons and end-to-end solution building using LangChain and Vertex AI,
                   I strive to solve real-world problems through scalable engineering and rapid prototyping.
                 </p>
                 
                 {/* Education Card */}
                 <div className="space-y-4">
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-4">Education</h3>
                    {EDUCATION.map((edu, idx) => (
                      <div key={idx} className="bg-white/5 p-6 border-l-2 border-[#ff7e67] rounded-r-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                        <p className="text-gray-400">{edu.degree}</p>
                        <div className="flex justify-between mt-2 text-sm text-gray-500 font-mono">
                          <span>{edu.period}</span>
                          <span className="text-[#ff7e67]">{edu.grade}</span>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              {/* Achievements/Highlights Side */}
              <div className="w-full md:w-1/3 space-y-8">
                <h3 className="text-white font-bold tracking-wider uppercase text-sm">Achievements</h3>
                <div className="space-y-4">
                   {[
                     "Google GenAI Exchange Hackathon – Prototype Phase (2024–25)",
                     "OpenAI x NxtWave Buildathon – State Level Participant",
                     "Yophoria Innovation Challenge 2025 – Finalist",
                     "Automation Using Agentic AI (Inya.ai) – Finalist",
                     "NASSCOM Hackathon – Round 1 Cleared",
                     "Participated in 10+ National Hackathons",
                     "Lead – College Disciplinary Committee"
                   ].map((achievement, i) => (
                     <div key={i} className="flex gap-3 items-start p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00f3ff] flex-shrink-0" />
                        <p className="text-sm text-gray-300">{achievement}</p>
                     </div>
                   ))}
                </div>
                
                <a 
                  href={activeResumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/50 rounded hover:bg-[#00f3ff] hover:text-black transition-all w-full justify-center font-bold uppercase text-sm tracking-widest"
                >
                   <Download className="w-4 h-4" /> Download Resume
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* --- EXPERIENCE SECTION --- */}
        <section id="experience" className="py-24 px-6 md:px-12 relative overflow-hidden z-10 w-full">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f3ff]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
             <ScrollReveal>
               <div className="flex items-center gap-4 mb-12">
                    <div className="h-px w-12 bg-[#ff7e67]"></div>
                    <span className="text-[#ff7e67] tracking-widest uppercase text-sm font-bold">Experience</span>
               </div>
             </ScrollReveal>

             <div className="space-y-12">
               {EXPERIENCE.map((exp, index) => (
                 <ScrollReveal key={exp.id} delay={index * 100}>
                   <div className="group relative pl-8 md:pl-0">
                      {/* Timeline Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-ml-px"></div>
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#ff7e67] md:left-1/2 md:-ml-1 shadow-[0_0_10px_#ff7e67]"></div>

                      <div className={`md:flex items-start justify-between ${index % 2 === 0 ? 'flex-row-reverse' : ''} gap-12`}>
                         <div className="hidden md:block w-1/2" /> 
                         
                         <div className="md:w-1/2 bg-[#050a14]/80 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-xl hover:border-[#ff7e67]/50 transition-colors shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                              <h3 className="text-2xl font-bold text-white group-hover:text-[#ff7e67] transition-colors">{exp.role}</h3>
                              <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">{exp.period}</span>
                            </div>
                            <h4 className="text-lg text-[#00f3ff] mb-4">{exp.company}</h4>
                            <ul className="space-y-2 mb-4">
                               {exp.description.map((item, i) => (
                                 <li key={i} className="text-gray-400 text-sm leading-relaxed flex gap-2">
                                   <span className="text-[#ff7e67] mt-1.5">•</span>
                                   {item}
                                 </li>
                               ))}
                            </ul>
                            {exp.tech && (
                              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                                 {exp.tech.split(', ').map(t => (
                                   <span key={t} className="text-[10px] uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded">
                                     {t}
                                   </span>
                                 ))}
                              </div>
                            )}
                         </div>
                      </div>
                   </div>
                 </ScrollReveal>
               ))}
             </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative w-full">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-[#00f3ff]"></div>
                <span className="text-[#00f3ff] tracking-widest uppercase text-sm font-bold">Technical Arsenal</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {SKILLS.map((category, index) => (
               <ScrollReveal key={category.category} delay={index * 100}>
                 <div className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all group h-full backdrop-blur-sm border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#00f3ff] transition-colors">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-[#050a14] border border-white/10 rounded-lg text-sm text-gray-300 shadow-sm hover:border-[#00f3ff]/50 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </section>

        {/* --- PROJECTS GRID (Additional to 3D) --- */}
        <section id="projects" className="py-24 px-6 md:px-12 z-10 relative w-full">
           <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-[#ff7e67]"></div>
                      <span className="text-[#ff7e67] tracking-widest uppercase text-sm font-bold">Selected Works</span>
                   </div>
                   <div className="text-gray-500 text-sm">Interactive 3D Preview Available in Hero</div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 150}>
                    <div className="bg-[#050a14]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 group shadow-lg hover:shadow-[#00f3ff]/20 flex flex-col h-full">
                       <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden flex items-center justify-center shrink-0">
                          <div className="absolute inset-0 bg-[#00f3ff]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <Activity className="text-white/20 w-16 h-16 group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="text-[#00f3ff] text-xs font-bold uppercase tracking-wider">{project.category}</span>
                              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#00f3ff] transition-colors">{project.title}</h3>
                            </div>
                            <a 
                              href={project.link || '#'} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 bg-white/5 rounded-full hover:bg-[#00f3ff] hover:text-black transition-colors"
                            >
                               <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                            {project.description}
                          </p>
                          <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
                            {project.stats.map((stat, i) => (
                               <div key={i}>
                                  <div className="text-[10px] text-gray-500 uppercase">{stat.label}</div>
                                  <div className="text-sm font-mono text-white">{stat.value}</div>
                               </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
           </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center z-10 relative w-full">
           <ScrollReveal>
             <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                READY TO <span className="text-[#00f3ff]">COLLABORATE?</span>
             </h2>
             <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                I am currently open to internship opportunities and freelance projects. 
                Let's build the future of intelligent systems together.
             </p>
             
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:ananysharmaofficial5@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-[#00f3ff] text-black font-bold uppercase tracking-widest rounded hover:bg-[#00c2cc] transition-colors w-full md:w-auto justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]">
                   <Mail className="w-5 h-5" /> Send Email
                </a>
                <div className="flex gap-4">
                   <a href="https://github.com/anay555" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded hover:border-[#00f3ff] hover:text-[#00f3ff] transition-all">
                      <Github className="w-6 h-6" />
                   </a>
                   <a href="https://linkedin.com/in/anany-sharma-955603144" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded hover:border-[#00f3ff] hover:text-[#00f3ff] transition-all">
                      <Linkedin className="w-6 h-6" />
                   </a>
                </div>
             </div>
           </ScrollReveal>
        </section>

        <Footer />

        {/* Floating AI Chat Widget */}
        <AIChat 
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
            triggerMessage={chatTriggerMessage}
            onTriggerHandled={() => setChatTriggerMessage(null)}
        />
      </div>
    </>
  );
};

export default App;