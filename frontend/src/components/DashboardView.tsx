import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Radio, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Ship, 
  ChevronRight
} from 'lucide-react';
import { Globe3D } from './Globe3D';
import type { IntelligenceArticle, NavTab } from '../types';

interface DashboardViewProps {
  emergencyMode: boolean;
  onNavigate: (tab: NavTab) => void;
  intelligenceFeed: IntelligenceArticle[];
  onTriggerDisruption: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  emergencyMode,
  onNavigate,
  intelligenceFeed,
  onTriggerDisruption
}) => {
  return (
    <div className="space-y-6">
      
      {emergencyMode && (
        <div className="p-4 rounded-3xl bg-rose-900 border border-rose-700 text-white shadow-lg flex items-center justify-between flex-wrap gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white text-rose-900 font-bold">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-wide">
                EMERGENCY DEFENSE LEVEL 5 ACTIVATED — SAURASHTRA & HORMUZ CRITICAL
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                Composite National Risk Score reached 64.2. Recommended immediate activation of Mangalore & Padur Strategic Reserves.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('digital_twin')}
            className="px-5 py-2.5 rounded-2xl bg-white text-rose-950 font-black text-xs hover:bg-rose-50 transition-all flex items-center gap-2 shadow-md"
          >
            <span>LAUNCH DIGITAL TWIN IMPACT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid Row 1: Neumorphic Cards inspired by Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Dark Slate Card matching Reference Image with Gold Gauge */}
        <div className="card-dark-slate p-5 rounded-3xl flex flex-col justify-between space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>THREAT INDEX</span>
            <ShieldAlert className="w-4 h-4 text-[#E6AA53]" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-white">ORANGE WATCH</div>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">Code: OR-89 Alert</p>
            </div>

            {/* Circular Gauge matching reference image (80% style ring) */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#E6AA53]"
                  strokeDasharray="75, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-[#E6AA53]">68%</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('scenario_sim')}
            className="w-full py-2 px-3 rounded-xl bg-[#E6AA53] text-[#1C2A39] font-black text-xs hover:bg-[#D99B43] transition-all text-center"
          >
            View Threat Tasks
          </button>
        </div>

        {/* Metric 2: Soft Warm Cream Card */}
        <div className="card-cream-warm p-5 rounded-3xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#566A7A]">
            <span>COMPOSITE RISK SCORE</span>
            <Activity className="w-4 h-4 text-[#1C2A39]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#1C2A39]">64.2 <span className="text-sm font-bold text-[#8A9DAE]">/ 100</span></div>
            <div className="text-xs text-rose-600 font-bold mt-1">+16.0% surge this week</div>
          </div>
          <p className="text-[11px] text-[#566A7A] font-medium">Weighted: Geopolitical (35%), Maritime (25%)</p>
        </div>

        {/* Metric 3: Crisp Pure White Card */}
        <div className="glass-panel-light p-5 rounded-3xl flex flex-col justify-between space-y-3 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-[#566A7A]">
            <span>STRATEGIC RESERVES (SPR)</span>
            <Clock className="w-4 h-4 text-[#E6AA53]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#1C2A39]">38.5 <span className="text-sm font-bold text-[#566A7A]">DAYS</span></div>
            <div className="text-xs text-emerald-600 font-bold mt-1">5.33 Million MT Ready</div>
          </div>
          <p className="text-[11px] text-[#566A7A] font-medium">Mangalore & Visakhapatnam Caverns</p>
        </div>

        {/* Metric 4: Crisp Pure White Card with Red Accent */}
        <div className="glass-panel-light p-5 rounded-3xl flex flex-col justify-between space-y-3 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-[#566A7A]">
            <span>IMPORTS AT RISK</span>
            <Ship className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <div className="text-3xl font-black text-rose-600">18.4%</div>
            <div className="text-xs text-slate-500 font-bold mt-1">24.5M Barrels Idling</div>
          </div>
          <p className="text-[11px] text-[#566A7A] font-medium">14 Tankers near Hormuz & Red Sea</p>
        </div>

      </div>

      {/* Grid Row 2: 3D Globe & Top AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 min-h-[420px] flex flex-col">
          <Globe3D emergencyMode={emergencyMode} />
        </div>

        <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#1C2A39]" />
                <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider">
                  ORCHESTRATOR AI DIRECTIVE
                </h3>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2]">
                94.2% CONFIDENCE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] text-xs text-[#1C2A39] space-y-2">
              <div className="font-black flex items-center gap-1.5 text-[#1C2A39]">
                <CheckCircle2 className="w-4 h-4 text-[#E6AA53]" />
                <span>PRIMARY RECOMMENDATION #AC-9901</span>
              </div>
              <p className="text-[#566A7A] leading-relaxed font-medium text-xs">
                Initiate emergency drawdown of 1.5 Million barrels from Mangalore SPR to supply Jamnagar & Vadinar refineries. Simultaneously order 3 crude VLCC tankers idling near Fujairah to divert via Cape of Good Hope with Indian Navy escort.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-[#8A9DAE] uppercase">SIMULATION SHORTCUTS</div>
            
            <button
              onClick={onTriggerDisruption}
              className="w-full py-3 px-4 rounded-2xl bg-[#1C2A39] text-[#E6AA53] font-black text-xs hover:bg-[#2B4459] transition-all flex items-center justify-between shadow-sm"
            >
              <span>RUN DIGITAL TWIN SIMULATION</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('multi_agent')}
              className="w-full py-3 px-4 rounded-2xl bg-white text-[#1C2A39] border border-slate-200 font-bold text-xs hover:bg-[#EEF2F5] transition-all flex items-center justify-between shadow-2xs"
            >
              <span>LAUNCH 10-AGENT AI DEBATE</span>
              <Bot className="w-4 h-4 text-[#566A7A]" />
            </button>
          </div>
        </div>

      </div>

      {/* Grid Row 3: Real-Time Intelligence Feed */}
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#E6AA53] animate-pulse" />
            <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider">
              REAL-TIME GEOPOLITICAL INTELLIGENCE FEED (AI PARSED)
            </h3>
          </div>
          <button
            onClick={() => onNavigate('multi_agent')}
            className="text-xs font-bold text-[#1C2A39] hover:underline flex items-center gap-1"
          >
            <span>View All RAG Corpus</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {intelligenceFeed.map((article) => (
            <div key={article.id} className="p-4.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] hover:border-[#E6AA53] transition-all space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#1C2A39]">{article.source}</span>
                <span className={`px-2.5 py-0.5 rounded-full ${
                  article.threat_level === 'RED' ? 'bg-rose-100 text-rose-800' :
                  article.threat_level === 'ORANGE' ? 'bg-amber-100 text-amber-900' :
                  'bg-cyan-100 text-cyan-900'
                }`}>
                  THREAT: {article.threat_level} ({article.confidence}% CONF)
                </span>
              </div>

              <h4 className="font-black text-sm text-[#1C2A39] hover:text-[#E6AA53] transition-colors">
                {article.title}
              </h4>

              <p className="text-xs text-[#566A7A] leading-relaxed">
                {article.summary}
              </p>

              <div className="pt-2 flex items-center justify-between text-[10px] font-bold text-[#8A9DAE] border-t border-[#F0E4D2]">
                <div>AFFECTED: {article.affected_ports.join(', ')}</div>
                <div className="text-[#1C2A39]">PRECEDENT: {article.historical_precedent}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
