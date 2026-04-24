import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Cpu, Sparkles, Briefcase, Mic, MicOff } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { COLORS } from '../constants';
import { playSuccessSound, playErrorSound } from '../utils/audio';

const SUGGESTIONS = [
  "What are your top skills?",
  "Tell me about the Smart Debt Agent.",
  "How can I hire you?",
  "Summarize your experience."
];

interface AIChatProps {
    isOpen: boolean;
    onToggle: () => void;
    triggerMessage: string | null;
    onTriggerHandled: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onToggle, triggerMessage, onTriggerHandled }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: "Greetings. I am AURA, the holographic assistant for this portfolio. How may I assist you today?",
      timestamp: Date.now(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle external triggers
  useEffect(() => {
      if (triggerMessage) {
          handleSend(triggerMessage);
          onTriggerHandled();
      }
  }, [triggerMessage]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
            playSuccessSound();
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            playErrorSound();
        };
        
        recognitionRef.current.onend = () => {
            setIsListening(false);
        };
    }
  }, []);

  const toggleListening = () => {
      if (!recognitionRef.current) {
          alert("Voice input is not supported in this browser.");
          return;
      }

      if (isListening) {
          recognitionRef.current.stop();
      } else {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (e) {
              console.error(e);
          }
      }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(history, userMsg.text);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, modelMsg]);
      playSuccessSound();
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I am temporarily offline due to a network anomaly. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      playErrorSound();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecruiterPitch = () => {
      handleSend("I am a recruiter. Give me a 3-sentence executive summary pitch on why I should hire Anany.");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md border border-[${COLORS.primary}] shadow-[0_0_15px_${COLORS.primary}] transition-all duration-300 hover:scale-110`}
        style={{
            backgroundColor: 'rgba(5, 10, 20, 0.7)',
            borderColor: COLORS.primary
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#00f3ff]" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300"
            style={{ 
                height: '500px', 
                maxHeight: '70vh',
                backgroundColor: 'rgba(5, 10, 20, 0.90)',
                boxShadow: `0 0 30px -5px ${COLORS.darkGlass}`
            }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00f3ff]" />
              <span className="font-bold tracking-wider text-sm text-white">AURA v2.5</span>
            </div>
            
            {/* Recruiter Quick Action */}
            <button 
                onClick={handleRecruiterPitch}
                className="flex items-center gap-1 px-2 py-1 bg-[#00f3ff]/10 hover:bg-[#00f3ff]/20 border border-[#00f3ff]/30 rounded text-[10px] text-[#00f3ff] transition-colors"
                title="Generate Recruiter Summary"
            >
                <Briefcase className="w-3 h-3" />
                <span>RECRUITER MODE</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#00f3ff]/20 text-white rounded-tr-sm border border-[#00f3ff]/30'
                      : 'bg-white/10 text-gray-200 rounded-tl-sm border border-white/5'
                  }`}
                >
                   {/* Basic formatting for bullet points from Gemini */}
                  {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                          {line}
                          {i !== msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                   <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                       <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                       <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                       <div className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            {/* Quick Suggestions - Only show if minimal history */}
            {messages.length < 3 && !isLoading && (
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-[#00f3ff]/20 hover:border-[#00f3ff] hover:text-white transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#00f3ff]" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening..." : "Ask AURA..."}
                className={`w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-4 pr-2 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors placeholder:text-white/20 ${isListening ? 'border-[#00f3ff] shadow-[0_0_10px_#00f3ff_inset]' : ''}`}
              />
              
              {/* Mic Button */}
              <button 
                onClick={toggleListening}
                className={`p-2 rounded-lg transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/50' : 'hover:bg-white/10 text-gray-400'}`}
                title="Voice Input"
              >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#00f3ff]" />
              </button>
            </div>
            <div className="text-[10px] text-center mt-2 text-white/20">
                Powered by Google Gemini 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;