// Simple synthesizer for sci-fi UI sounds using Web Audio API
// No external assets required.

let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const createOscillator = (
  ctx: AudioContext, 
  type: OscillatorType, 
  freq: number, 
  duration: number, 
  vol: number = 0.1
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playHoverSound = () => {
  const ctx = initAudio();
  // High pitched short chirp
  createOscillator(ctx, 'sine', 800, 0.05, 0.05);
  createOscillator(ctx, 'triangle', 1200, 0.02, 0.02);
};

export const playClickSound = () => {
  const ctx = initAudio();
  // Lower pitched actuation sound
  createOscillator(ctx, 'square', 200, 0.1, 0.05);
  createOscillator(ctx, 'sine', 100, 0.15, 0.1);
};

export const playSuccessSound = () => {
  const ctx = initAudio();
  // Rising trill
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.linearRampToValueAtTime(880, now + 0.2);
  
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.3);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(now + 0.3);
};

export const playErrorSound = () => {
  const ctx = initAudio();
  createOscillator(ctx, 'sawtooth', 150, 0.3, 0.1);
};
