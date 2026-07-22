import React from 'react';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import type { AgentStep } from '../types';

interface AgentDebateViewProps {
  emergencyMode?: boolean;
}

export const AgentDebateView: React.FC<AgentDebateViewProps> = () => {
  const activeStepIndex = 10;

  const agentsList = [
    { name: 'News Intelligence Agent', avatar: '📰', role: 'RAG & Article Parsing' },
    { name: 'Shipping Intelligence Agent', avatar: '🚢', role: 'AIS Telemetry & Tankers' },
    { name: 'Commodity Intelligence Agent', avatar: '📈', role: 'Crude & Freight Volatility' },
    { name: 'Weather Intelligence Agent', avatar: '🌀', role: 'Met-Ocean & Cyclone Tracking' },
    { name: 'Geopolitical Conflict Agent', avatar: '🌐', role: 'Naval Warfare & Sanctions' },
    { name: 'Composite Risk Assessment Agent', avatar: '🛡️', role: 'National Security Index' },
    { name: 'Scenario Simulation Agent', avatar: '🎰', role: 'Monte Carlo Disruption Engine' },
    { name: 'Procurement Copilot Agent', avatar: '💼', role: 'Supplier & Cargo Optimizer' },
    { name: 'Policy & SPR Advisor Agent', avatar: '🏛️', role: 'Strategic Petroleum Reserve' },
    { name: 'Economic Impact Agent', avatar: '📊', role: 'GDP & Inflation Forecast' },
    { name: 'URJA Orchestrator AI', avatar: '🧠', role: 'Consensus Synthesis Leader' }
  ];

  const debateTimeline: AgentStep[] = [
    {
      step: 1,
      agent: 'News Intelligence Agent',
      agent_id: 'agent-news',
      thought: 'Ingested 14 satellite advisories and radio traffic from Arabian Gulf. Confirmed live-fire exercises adjacent to Eastbound Hormuz lanes.',
      evidence: 'Reuters Advisory INT-2026-0892 | 88% confidence score.',
      assessment: 'High probability of transit slowdowns for Middle Eastern crude vessels.'
    },
    {
      step: 2,
      agent: 'Shipping Intelligence Agent',
      agent_id: 'agent-shipping',
      thought: 'Cross-referenced live AIS data. 14 crude tankers carrying 24.5 Million barrels destined for Sikka (Jamnagar) are holding position near Fujairah anchorage.',
      evidence: 'AIS MT SWARNA KAMAL (IMO 9712044) & 13 vessels at 0-2 knots.',
      assessment: 'Expected delivery delay to West Coast India: +48 to +96 hours.'
    },
    {
      step: 3,
      agent: 'Commodity Intelligence Agent',
      agent_id: 'agent-commodity',
      thought: 'Brent Crude surged +$2.85/bbl in European trading. Persian Gulf VLCC freight rates jumped 18% to $54,500/day. War-risk premiums escalated.',
      evidence: 'ICE Futures & Lloyds Marine Underwriters Feed.',
      assessment: 'Landed cost per barrel at Jamnagar projected to rise by +6.2%.'
    },
    {
      step: 4,
      agent: 'Weather Intelligence Agent',
      agent_id: 'agent-weather',
      thought: 'Evaluating Arabian Sea sea-state. Category 4 Cyclone Vayu-II is causing wave swells of 5.8m at Mundra SPM, preventing offshore discharge.',
      evidence: 'IMD Severe Met-Ocean Bulletin.',
      assessment: 'Compound bottleneck: Diverted vessels cannot offload at Gujarat SPMs until July 25.'
    },
    {
      step: 5,
      agent: 'Geopolitical Conflict Agent',
      agent_id: 'agent-geopolitics',
      thought: 'Analyzing military posture. US 5th Fleet and Indian Navy (Op Sankalp) initiated destroyer escorts. Standoff expected to stabilize within 7-10 days.',
      evidence: '2019 Hormuz Tanker Standoff Pattern Matching.',
      assessment: 'Probability of complete long-term closure: 15%. Temporary disruption: 82%.'
    },
    {
      step: 6,
      agent: 'Composite Risk Assessment Agent',
      agent_id: 'agent-risk',
      thought: 'Recalculating India Composite Energy Risk Index using weighted multi-factor matrix: Geopolitical (35%), Maritime (25%), Commodity (20%).',
      evidence: 'Composite Risk Algorithm v4.2.',
      assessment: 'National Risk Score escalates from 48.2 (Yellow) to 64.2 (Orange).'
    },
    {
      step: 7,
      agent: 'Scenario Simulation Agent',
      agent_id: 'agent-scenario',
      thought: 'Ran 1,000 Monte Carlo iterations of 7-day Hormuz slowdown + SPM Weather lock. P50 national crude stock draw: 1.85M bbl/day.',
      evidence: 'Monte Carlo Engine Simulation Run #8902.',
      assessment: 'P90 worst-case shortfall: 12.4 Million barrels over 14 days.'
    },
    {
      step: 8,
      agent: 'Procurement Copilot Agent',
      agent_id: 'agent-procurement',
      thought: 'Evaluated spot crude availability from non-Hormuz origins. Recommend immediate spot procurement of West African Bonny Light & Russian Urals via Cape.',
      evidence: 'Global Crude Spot Availability Matrix.',
      assessment: 'Supplier ranking: 1. Nigeria NNPC (Score 92), 2. Rosneft (86), 3. Petrobras (84).'
    },
    {
      step: 9,
      agent: 'Policy & SPR Advisor Agent',
      agent_id: 'agent-policy',
      thought: 'Recommend Cabinet Directive for Strategic Petroleum Reserve release: Authorized drawdown of 1.5M barrels from Mangalore underground rock caverns.',
      evidence: 'Ministry of Petroleum Crisis SOP - Clause 4B.',
      assessment: 'Prevents refinery starvation without expanding spot market panic purchases.'
    },
    {
      step: 10,
      agent: 'Economic Impact Agent',
      agent_id: 'agent-econ',
      thought: 'Simulated macroeconomic cascade. With SPR buffer activated, domestic retail petrol/diesel prices remain pegged. Quarterly GDP impact contained to -0.04%.',
      evidence: 'Macro Energy-Economy Dynamic Model.',
      assessment: 'Zero state-wise retail fuel shortage if SPR release begins within 36 hours.'
    },
    {
      step: 11,
      agent: 'URJA Orchestrator AI',
      agent_id: 'agent-orchestrator',
      thought: 'SYNTHESIS COMPLETE: Consensus reached among 10 Agents with 94.2% agreement index.',
      evidence: 'Grounded AI Evidence Chain #AC-9901.',
      assessment: 'FINAL DIRECTIVE: 1) Execute Indian Navy Op Sankalp Escort. 2) Release 1.5M bbl from Mangalore SPR. 3) Divert 2 VLCCs to Cochin SPM.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#1C2A39]" />
            <h2 className="text-lg font-black text-[#1C2A39] uppercase tracking-wider">
              MULTI-AGENT AI COLLABORATIVE DEBATE ENGINE
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] uppercase">
              10 AGENTS ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#566A7A] mt-1 font-medium">
            Watch 10 specialized domain AI agents debate evidence, resolve conflicts, and synthesize strategic directives in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#1C2A39] bg-[#FAF4EA] px-3.5 py-2 rounded-2xl border border-[#F0E4D2]">
          <Sparkles className="w-4 h-4 text-[#E6AA53]" />
          <span>CONSENSUS AGREEMENT: <strong className="text-[#1C2A39]">94.2%</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel-light p-5 rounded-3xl border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-[#8A9DAE] uppercase border-b border-slate-100 pb-2">
            SPECIALIZED AI AGENTS ROSTER
          </div>

          <div className="space-y-2">
            {agentsList.map((agent) => (
              <div
                key={agent.name}
                className="p-3 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] hover:border-[#E6AA53] transition-all flex items-center gap-3"
              >
                <span className="text-xl">{agent.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-xs text-[#1C2A39] truncate">{agent.name}</div>
                  <div className="text-[10px] text-[#566A7A] font-medium truncate">{agent.role}</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#1C2A39]" />
              <span>LIVE AGENT-TO-AGENT REASONING STREAM</span>
            </h3>
            <span className="text-xs font-bold text-[#566A7A]">11 DEBATE TURNS</span>
          </div>

          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2">
            {debateTimeline.slice(0, activeStepIndex + 1).map((turn) => {
              const isOrchestrator = turn.agent_id === 'agent-orchestrator';
              return (
                <div
                  key={turn.step}
                  className={`p-4 rounded-2xl border transition-all ${
                    isOrchestrator
                      ? 'bg-[#1C2A39] text-white border-[#1C2A39] shadow-md'
                      : 'bg-[#FAF4EA] border-[#F0E4D2] text-[#1C2A39]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className={isOrchestrator ? 'text-[#E6AA53]' : 'text-[#1C2A39]'}>
                      TURN #{turn.step}: {turn.agent}
                    </span>
                    <span className={isOrchestrator ? 'text-slate-300 text-[10px]' : 'text-[#8A9DAE] text-[10px]'}>EVIDENCE GROUNDED</span>
                  </div>

                  <p className={`text-xs leading-relaxed font-medium mb-2.5 ${isOrchestrator ? 'text-slate-100' : 'text-[#566A7A]'}`}>
                    "{turn.thought}"
                  </p>

                  <div className={`p-3 rounded-xl text-[11px] font-bold border space-y-1 ${
                    isOrchestrator ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-[#1C2A39]'
                  }`}>
                    <div>SUPPORTING EVIDENCE: <span>{turn.evidence}</span></div>
                    <div className={isOrchestrator ? 'text-[#E6AA53]' : 'text-amber-700'}>
                      ASSESSMENT: {turn.assessment}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
