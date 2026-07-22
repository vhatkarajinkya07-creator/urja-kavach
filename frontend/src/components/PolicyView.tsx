import React from 'react';
import { Landmark, ShieldAlert, FileText } from 'lucide-react';

export const PolicyView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              POLICY ADVISOR & STRATEGIC PETROLEUM RESERVE (SPR) DIRECTIVES
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              MINISTRY SOP GENERATOR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated generation of Cabinet Notes, Strategic Petroleum Reserve drawdown orders, and fuel subsidy hedging strategies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>SPR DRAWDOWN AUTHORIZATION NOTE</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">READY FOR SIGNATURE</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">SUBJECT: EMERGENCY RELEASE OF CRUDE STOCK FROM ISPRL MANGALORE CAVERN</div>
            <p className="text-slate-300 font-sans leading-relaxed">
              In view of ongoing security disruptions at the Strait of Hormuz chokepoint and Category 4 Cyclone Vayu-II at Sikka SPM, the Ministry hereby authorizes the release of 1.5 Million Barrels of crude from Mangalore Strategic Underground Rock Caverns directly to MRPL & IOCL refining complexes.
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-slate-400 text-[11px]">
              <span>EFFECTIVE DATE: IMMEDIATE</span>
              <span className="text-cyan-400">ISPRL CLAUSE 4B</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>RECOMMENDED GOVERNMENT INTERVENTIONS</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">1. EXCISE DUTY BUFFER PEGGING</div>
              <p className="text-slate-300 font-sans">Temporarily adjust central excise duty on retail diesel by ₹2.50/L to prevent transport sector inflation pass-through.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="text-cyan-300 font-bold">2. NAVAL ESCORT MANDATE (OP SANKALP)</div>
              <p className="text-slate-300 font-sans">Dispatch Indian Navy stealth frigates to escort SCI flagged Suezmax tankers through Arabian Sea security zones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
