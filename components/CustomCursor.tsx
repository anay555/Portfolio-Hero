import React, { useEffect, useState, useRef } from 'react';
import { playHoverSound, playClickSound } from '../utils/audio';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch capability
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    const onMouseDown = () => {
        if (!isTouch) playClickSound();
    };

    // Track hoverable elements and trigger sound
    const handleMouseOver = (e: MouseEvent) => {
      if (isTouch) return;
      
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName === 'INPUT';

      if (isInteractive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isTouch) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseout', onMouseLeave);
        window.addEventListener('mouseover', onMouseEnter);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', onMouseDown);
    }

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [isTouch]);

  // Effect to play sound when hover state changes to true
  useEffect(() => {
      if (isHovering && !isTouch) {
          playHoverSound();
      }
  }, [isHovering, isTouch]);

  // If touch device or cursor not visible/initialized, don't render
  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      >
        <div className={`w-2 h-2 bg-[#00f3ff] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`} />
      </div>

      {/* Trailing Ring / Crosshair */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference transition-transform duration-100 ease-out"
      >
         <div 
           className={`border border-[#00f3ff] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${
             isHovering 
               ? 'w-12 h-12 bg-[#00f3ff]/20 border-[#00f3ff] scale-100' 
               : 'w-8 h-8 opacity-50 scale-75'
           }`}
         >
            {/* Crosshair accents only visible on hover */}
            {isHovering && (
                <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-[#00f3ff]"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-2 bg-[#00f3ff]"></div>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-0.5 bg-[#00f3ff]"></div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-0.5 bg-[#00f3ff]"></div>
                </>
            )}
         </div>
      </div>
    </>
  );
};

export default CustomCursor;