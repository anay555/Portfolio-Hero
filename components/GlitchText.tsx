import React, { useState, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', highlightColor }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2; // Glitch speed
    }, 30);
  };

  return (
    <span 
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={startGlitch}
      onTouchStart={startGlitch}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;