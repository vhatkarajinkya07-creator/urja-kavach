import React from 'react';
import { BarChart3 } from 'lucide-react';

export const EconomicImpactView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              MACROECONOMIC IMPACT ENGINE & STATE-WISE DEFICIT FORECAST
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              GDP & INFLATION MODEL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantify macroeconomic impact across GDP growth drag, freight inflation, power sector deficit, and agricultural fuel allocation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400">PROJECTED GDP DRAG (QUARTERLY)</div>
          <div className="text-3xl font-black text-rose-400">-0.05%</div>
          <p className="text-xs text-slate-400 font-mono">Mitigated from -0.28% via SPR activation</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400">TRANSPORT INFLATION PRESSURE</div>
          <div className="text-3xl font-black text-amber-400">+1.2%</div>
          <p className="text-xs text-slate-400 font-mono">Diesel retail price pegged at ₹89.62/L</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400">STATE DEFICIT RISK (30 DAYS)</div>
          <div className="text-3xl font-black text-cyan-300">LOW (2.1%)</div>
          <p className="text-xs text-slate-400 font-mono">Northern Grid depot buffer at 14.8 days</p>
        </div>
      </div>
    </div>
  );
};
