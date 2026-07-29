import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic, MicOff, Paperclip, Sparkles, RefreshCw, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

const suggestedPrompts = [
  "Explain my blood report ApoB marker",
  "Suggest healthy food plan for hypertension",
  "What is the dosage for Rosuvastatin?",
  "What questions should I ask my cardiologist?"
];

export default function AIAssistantView() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoice, setIsVoice] = useState(false);
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your NeuraGrid AI Healthcare Assistant. I can help explain lab reports, suggest dietary plans, look up medication info, or help you prepare questions for your doctor. How can I assist you today?"
    }
  ]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      const lower = query.toLowerCase();

      if (lower.includes('apob') || lower.includes('report') || lower.includes('blood')) {
        aiText = "ApoB (Apolipoprotein B) measures the exact count of potentially damaging LDL and VLDL particles circulating in your bloodstream. Your latest value is 62 mg/dL (Normal Range: < 80 mg/dL), indicating low atherogenic plaque risk.";
      } else if (lower.includes('food') || lower.includes('diet') || lower.includes('nutrition') || lower.includes('hypertension')) {
        aiText = "For cardiovascular health and optimal blood pressure regulation, focus on: 1) Leafy greens rich in dietary nitrates, 2) Wild salmon for high-DHA Omega-3s, 3) Extra virgin olive oil, and 4) Potassium-rich foods like avocados and sweet potatoes while keeping sodium under 2000mg/day.";
      } else if (lower.includes('rosuvastatin') || lower.includes('medicine') || lower.includes('dosage')) {
        aiText = "Rosuvastatin is a HMG-CoA reductase inhibitor (statin) used to lower ApoB and LDL cholesterol. Your active prescription is 5mg microdose daily in the morning. Take consistently with or without food.";
      } else if (lower.includes('doctor') || lower.includes('question') || lower.includes('cardiologist')) {
        aiText = "Key questions to ask your cardiologist during your upcoming appointment: 1) 'What is my target ApoB and hs-CRP inflammatory baseline?', 2) 'Are there any lifestyle adjustments recommended before considering dose changes?', 3) 'Should we schedule an annual NMR lipoprofile?'";
      } else {
        aiText = `Analyzing "${query}" against verified clinical medical databases. Your parameters show normal vital baselines. Consult with your attending physician for specific medical changes.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-2">
          <Bot className="w-3.5 h-3.5" />
          <span>Clinical Conversational Intelligence</span>
        </div>
        <h1 className="font-['Inter'] font-bold text-3xl text-slate-900">AI Healthcare Assistant</h1>
        <p className="text-slate-500 text-sm mt-1">
          Ask questions about lab reports, prescriptions, nutrition, or prepare for upcoming doctor visits.
        </p>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 transition-all text-left flex items-center gap-2 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>"{p}"</span>
          </button>
        ))}
      </div>

      {/* Chat Window Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-2xs space-y-6">
        
        {/* Messages Stream */}
        <div className="space-y-6 max-h-[460px] overflow-y-auto pr-2">
          {messages.map((m, idx) => (
            <div key={idx}>
              {m.sender === 'user' ? (
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-xs max-w-lg text-xs leading-relaxed shadow-xs">
                    {m.text}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl rounded-tl-xs max-w-xl text-xs text-slate-800 leading-relaxed shadow-2xs">
                    {m.text}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs text-slate-500 font-medium">
                AI Assistant is processing clinical context...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Controls */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-2 flex items-center gap-2"
        >
          <button
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
            title="Attach Medical PDF/Image"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type your healthcare question or request..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full text-xs text-slate-900 bg-transparent outline-none font-medium px-2"
          />

          <button
            type="button"
            onClick={() => setIsVoice(!isVoice)}
            className={`p-2 rounded-xl transition-colors ${
              isVoice ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 hover:bg-white'
            }`}
            title="Voice input"
          >
            {isVoice ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-bold transition-colors shadow-2xs shrink-0"
          >
            Send
          </button>
        </form>

      </div>

    </div>
  );
}
