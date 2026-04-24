import React from 'react';
import { Project } from '../types';
import { ChevronRight, ExternalLink, Activity, Sparkles } from 'lucide-react';
import { COLORS } from '../constants';
import GlitchText from './GlitchText';

interface OverlayProps {
  selectedProject: Project | null;
  onCloseProject: () => void;
  onAskAI: (question: string) => void;
}

const Overlay: React.FC<OverlayProps> = ({ selectedProject, onCloseProject, onAskAI }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center p-6 md:p-12 h-full">
      
      {/* Hero Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        {!selectedProject ? (
          <div className="max-w-3xl pt-20 md:pt-20">
             <div className="h-1 w-16 md:w-20 bg-[#00f3ff] mb-6 md:mb-8 shadow-[0_0_10px_#00f3ff] mx-auto md:mx-0" />
             
             <div className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white select-none mb-4 pointer-events-auto leading-none">
               <div className="md:inline-block"><GlitchText text="ANANY" /></div> <span style={{ color: COLORS.primary }} className="md:inline-block"><GlitchText text="SHARMA" /></span>
             </div>
             
             <p className="text-xs sm:text-sm md:text-base text-gray-400 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
                AI/ML & Systems Engineer
             </p>

             <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 leading-tight mb-8">
               ENGINEERING <br className="hidden md:block" /> INTELLIGENCE.
             </h2>
             
             <div className="pointer-events-auto flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#about" className="px-6 py-3 border border-[#00f3ff] text-[#00f3ff] text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[#00f3ff] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                  About Me
                </a>
                <a href="#projects" className="px-6 py-3 bg-white/10 text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-md">
                  View Projects
                </a>
             </div>
          </div>
        ) : (
           <div className="pointer-events-auto backdrop-blur-xl bg-black/80 md:bg-black/60 border border-white/10 p-6 md:p-12 rounded-2xl w-full max-w-2xl animate-in slide-in-from-right-10 fade-in duration-500 shadow-2xl mt-16 md:mt-20 ring-1 ring-white/10 text-left">
              <button 
                onClick={onCloseProject}
                className="mb-6 text-xs text-gray-400 hover:text-white flex items-center gap-1 uppercase tracking-widest transition-colors"
              >
                 <ChevronRight className="w-4 h-4 rotate-180" /> Back to Hero
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                 <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/20">
                   {selectedProject.category.toUpperCase()}
                 </span>
                 <span className="h-px flex-1 bg-white/10"></span>
                 <Activity className="w-5 h-5 text-[#ff7e67]" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {selectedProject.title}
              </h2>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 border-l-2 border-[#ff7e67] pl-4">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                {selectedProject.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-xl md:text-2xl font-mono text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedProject.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#00f3ff] transition-colors rounded-sm"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => onAskAI(`Analyze the ${selectedProject.title} project. Detail the technical stack and how AI was integrated.`)}
                    className="group flex-1 py-4 bg-[#00f3ff]/10 border border-[#00f3ff]/50 text-[#00f3ff] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#00f3ff] hover:text-black transition-all rounded-sm"
                  >
                    <Sparkles className="w-4 h-4" /> Analyze with AI
                  </button>
              </div>
           </div>
        )}
      </main>

      {/* Hero Footer */}
      <footer className="flex justify-center md:justify-between items-end pointer-events-none pb-4 md:pb-8">
        <div className="text-[10px] text-gray-600 font-mono text-center md:text-left">
          <p>LOC: BHOPAL, MP</p>
          <p>23.2599° N, 77.4126° E</p>
        </div>
      </footer>
    </div>
  );
};

export default Overlay;