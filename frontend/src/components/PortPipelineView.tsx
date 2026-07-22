import React from 'react';
import { Anchor } from 'lucide-react';

export const PortPipelineView: React.FC = () => {
  const ports = [
    { name: 'Mundra Port', congestion: 74, ships: 8, status: 'CONGESTED', spm: 'Halted (Cyclone)' },
    { name: 'Sikka SPM (Jamnagar)', congestion: 45, ships: 4, status: 'OPERATIONAL', spm: 'Active' },
    { name: 'Vadinar Offshore Terminal', congestion: 52, ships: 3, status: 'OPERATIONAL', spm: 'Active' },
    { name: 'JNPT Mumbai', congestion: 68, ships: 6, status: 'MODERATE', spm: 'Active' },
    { name: 'Paradip Port (Odisha)', congestion: 38, ships: 2, status: 'OPTIMAL', spm: 'Active' },
    { name: 'Mangalore Port', congestion: 25, ships: 1, status: 'OPTIMAL', spm: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Anchor className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              PORT CONGESTION & TRUNK PIPELINE TELEMETRY
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              6 MAJOR PORTS & 4 PIPELINES
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor offshore Single Point Mooring (SPM) berths, vessel waiting times, and pipeline hydraulic load pressure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ports.map((port) => (
          <div key={port.name} className="p-4 rounded-xl glass-panel border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <h4 className="font-extrabold text-sm text-white">{port.name}</h4>
              <span className={`px-2 py-0.5 rounded font-bold ${
                port.status === 'CONGESTED' ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
              }`}>
                {port.status}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">CONGESTION INDEX:</span>
                <span className="font-bold text-cyan-300">{port.congestion} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SHIPS ANCHORED:</span>
                <span className="font-semibold text-white">{port.ships} Vessels</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SPM STATUS:</span>
                <span className={`font-bold ${port.spm.includes('Halted') ? 'text-rose-400' : 'text-emerald-400'}`}>{port.spm}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
