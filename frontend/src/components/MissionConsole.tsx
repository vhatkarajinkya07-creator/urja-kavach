import React, { useState } from 'react';
import { Terminal, Send } from 'lucide-react';

export const MissionConsole: React.FC = () => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; citations?: string[] }>>([
    {
      sender: 'ai',
      text: "URJA MISSION CONSOLE ONLINE. I am India's Energy Security AI Assistant. You can ask strategic questions, run scenario queries, or request procurement and policy recommendations in natural language.",
      citations: ['Vector Corpus INT-2026', 'ISPRL Telemetry']
    }
  ]);

  const quickPrompts = [
    "What if the Strait of Hormuz closes for 14 days?",
    "Which crude supplier offers the lowest landed cost for Jamnagar?",
    "Generate emergency SOP for Mangalore Strategic Reserve release.",
    "Show diesel supply deficit for Northern Industrial Grid."
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || queryInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setQueryInput('');

    setTimeout(() => {
      let aiText = "";
      let citations = ["Reuters INT-2026-0892", "ISPRL Database"];

      if (q.toLowerCase().includes("hormuz")) {
        aiText = "CRISIS QUERY EVALUATION: If Strait of Hormuz closes for 14 days, West Coast India faces a gross shortfall of ~24.5 Million Barrels. Recommended action: Draw 1.5M bbl from Mangalore SPR and execute spot cargo swaps with ADNOC (UAE) and NNPC (Nigeria) via Cape of Good Hope.";
      } else if (q.toLowerCase().includes("supplier") || q.toLowerCase().includes("cost")) {
        aiText = "PROCUREMENT EVALUATION: Top ranked crude supplier for Jamnagar Refinery is ADNOC (UAE) at $85.10/bbl base price + $3.20 freight with 3.8 days transit time. Total landed cost: $88.30/bbl (CEPA trade agreement eligible).";
      } else if (q.toLowerCase().includes("sop") || q.toLowerCase().includes("reserve")) {
        aiText = "POLICY DIRECTIVE GENERATED: Clause 4B Emergency Reserve Protocol authorized. 1.5M bbl stock release from Mangalore Cavern into ISPRL trunk pipeline grid. Excise duty buffer pegged at ₹2.50/L.";
      } else {
        aiText = `INTELLIGENCE QUERY EXECUTED: Searched 14 vector chunks matching "${q}". Composite energy security score remains stable at 78/100 with zero state-wise retail fuel shortage expected.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText, citations }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#1C2A39]" />
            <h2 className="text-lg font-black text-[#1C2A39] uppercase tracking-wider">
              NATURAL LANGUAGE MISSION CONSOLE (RAG AI ASSISTANT)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] uppercase">
              GROUNDED LLM
            </span>
          </div>
          <p className="text-xs text-[#566A7A] mt-1 font-medium">
            Ask complex geopolitical questions, request scenario forecasts, or issue policy commands in natural English.
          </p>
        </div>
      </div>

      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-4 min-h-[500px] flex flex-col justify-between">
        <div className="flex items-center gap-2 flex-wrap pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-[#8A9DAE]">QUICK COMMANDS:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-xl bg-[#FAF4EA] text-xs font-bold text-[#1C2A39] border border-[#F0E4D2] hover:bg-white transition-all text-left shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs font-medium ${
                msg.sender === 'user'
                  ? 'bg-[#1C2A39] text-[#E6AA53] border-[#1C2A39] ml-12'
                  : 'bg-[#FAF4EA] border-[#F0E4D2] text-[#1C2A39] mr-12'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold mb-1 opacity-80">
                <span>{msg.sender === 'user' ? 'COMMAND OPERATOR' : 'URJA ORCHESTRATOR AI'}</span>
                <span>T+00:01</span>
              </div>
              <p className="leading-relaxed text-xs">{msg.text}</p>
              {msg.citations && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/40 text-[10px] flex items-center gap-2 font-bold">
                  <span>GROUNDED SOURCES:</span>
                  {msg.citations.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white text-[#1C2A39] border border-slate-200">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3 pt-3 border-t border-slate-100">
          <input
            type="text"
            placeholder="Type strategic question or policy command..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="flex-1 bg-[#EEF2F5] border border-transparent focus:bg-white focus:border-[#E6AA53] rounded-2xl px-4 py-3 text-xs text-[#1C2A39] placeholder-[#8A9DAE] focus:outline-none font-bold"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-[#1C2A39] text-[#E6AA53] font-black text-xs hover:bg-[#2B4459] transition-all flex items-center gap-2 shadow-sm"
          >
            <span>SUBMIT</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
