import React, { useEffect, useState } from 'react';

const TERMINAL_LINES = [
  "INITIALIZING CORE SYSTEMS...",
  "LOADING NEURAL TEXTURES...",
  "CONNECTING TO API GATEWAY...",
  "CALIBRATING 3D VIEWPORT...",
  "ACCESS GRANTED."
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    // Lines animation
    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < TERMINAL_LINES.length) {
        setLines(prev => [...prev, TERMINAL_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(lineInterval);
      }
    }, 350);

    // Completion delay
    const timeout = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center font-mono text-[#00f3ff] p-8">
       <div className="w-full max-w-md space-y-6">
          <div className="h-48 border border-[#00f3ff]/20 bg-[#00f3ff]/5 p-6 rounded text-xs md:text-sm overflow-hidden flex flex-col justify-end shadow-[0_0_30px_rgba(0,243,255,0.05)] relative">
             {/* Scanline effect */}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent h-4 w-full animate-[scan_2s_linear_infinite]" style={{ backgroundSize: '100% 4px' }}></div>
             
             {lines.map((line, i) => (
               <div key={i} className="mb-2 tracking-widest">
                 <span className="text-gray-600 mr-2">{`>`}</span>
                 <span className={i === lines.length - 1 ? 'animate-pulse text-[#00f3ff]' : 'opacity-60 text-[#00f3ff]'}>{line}</span>
               </div>
             ))}
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
               <span>System Loading</span>
               <span>{progress}%</span>
             </div>
             <div className="h-1 w-full bg-[#00f3ff]/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00f3ff] shadow-[0_0_15px_#00f3ff]" 
                  style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                />
             </div>
          </div>
       </div>
    </div>
  );
};

export default Preloader;