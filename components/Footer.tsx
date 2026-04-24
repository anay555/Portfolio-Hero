import React, { useState, useEffect } from 'react';
import { Wifi, ShieldCheck, Activity, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const [latency, setLatency] = useState(24);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Simulate network fluctuations
    const latencyInterval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(60, prev + (Math.random() - 0.5) * 10)));
    }, 2000);

    // Clock
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#020408] z-10 relative mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
           
           {/* Left: Copyright & Stack */}
           <div className="text-center md:text-left space-y-2">
             <p className="text-gray-400">© 2025 Anany Sharma. All Systems Nominal.</p>
             <p>Built with React • Three.js • Gemini AI • Tailwind</p>
           </div>

           {/* Center: System Diagnostics */}
           <div className="flex gap-6 p-3 bg-white/5 rounded border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                 <Wifi className="w-3 h-3 text-[#00f3ff]" />
                 <span>Latency: {Math.round(latency)}ms</span>
              </div>
              <div className="flex items-center gap-2">
                 <Activity className="w-3 h-3 text-green-400" />
                 <span>Core: Online</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                 <ShieldCheck className="w-3 h-3 text-[#00f3ff]" />
                 <span>Secure: TLS 1.3</span>
              </div>
           </div>

           {/* Right: Location & Time */}
           <div className="text-center md:text-right space-y-2">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Globe className="w-3 h-3" />
                <span>Bhopal, IN [23.25°N, 77.41°E]</span>
              </div>
              <div>
                 {time.toLocaleTimeString('en-US', { hour12: false })} UTC+5:30
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;