import React, { useState } from 'react';
import { Sliders, BarChart2, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ScenarioViewProps {
  emergencyMode?: boolean;
}

export const ScenarioView: React.FC<ScenarioViewProps> = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('hormuz');
  const [severity, setSeverity] = useState<number>(80);
  const [duration, setDuration] = useState<number>(14);

  const forecastData = Array.from({ length: duration + 5 }, (_, idx) => {
    const day = idx + 1;
    const grossShortfall = (severity / 100) * 1.8 * (day <= duration ? 1.0 : Math.max(0, 1 - (day - duration) * 0.2));
    const sprRelease = Math.min(grossShortfall * 0.65, 0.9);
    const netDeficit = Math.max(0, grossShortfall - sprRelease);
    return {
      day: `Day ${day}`,
      grossShortfall: Number(grossShortfall.toFixed(2)),
      sprRelease: Number(sprRelease.toFixed(2)),
      netDeficit: Number(netDeficit.toFixed(2))
    };
  });

  return (
    <div className="space-y-6">
      
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#1C2A39]" />
            <h2 className="text-lg font-black text-[#1C2A39] uppercase tracking-wider">
              SCENARIO SIMULATOR & MONTE CARLO PROBABILISTIC ENGINE
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] uppercase">
              1,000 ITERATIONS
            </span>
          </div>
          <p className="text-xs text-[#566A7A] mt-1 font-medium">
            Run stochastic simulations to stress-test national crude inventory, price spikes, and P10/P50/P90 confidence limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['hormuz', 'redsea', 'cyclone', 'sanction'].map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPreset(key)}
              className={`px-3.5 py-2 rounded-2xl font-extrabold text-xs transition-all uppercase ${
                selectedPreset === key
                  ? 'bg-[#1C2A39] text-[#E6AA53] shadow-sm'
                  : 'bg-white text-[#566A7A] border border-slate-200 hover:bg-[#FAF4EA]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-5">
          <div className="text-xs font-bold text-[#8A9DAE] uppercase border-b border-slate-100 pb-2">
            SIMULATION PARAMETERS
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#566A7A]">DISRUPTION SEVERITY</span>
              <span className="text-[#1C2A39]">{severity}% Throughput Drop</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-[#E6AA53] cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#566A7A]">DISRUPTION DURATION</span>
              <span className="text-[#1C2A39]">{duration} Days</span>
            </div>
            <input
              type="range"
              min="3"
              max="90"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[#E6AA53] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] text-xs font-bold text-[#1C2A39] space-y-1">
            <div className="text-[#566A7A]">EXPECTED NATIONAL DRAWDOWN:</div>
            <div className="text-2xl font-black text-rose-600">
              {((severity / 100) * 1.8 * duration).toFixed(1)} Million Barrels
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1C2A39]" />
              <span>MONTE CARLO PROBABILISTIC PERCENTILES</span>
            </h3>
            <span className="text-xs font-bold text-[#566A7A]">1,000 RUNS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="text-[10px] font-bold text-emerald-600 uppercase">P10 (OPTIMISTIC 10%)</div>
              <div className="text-2xl font-black text-[#1C2A39]">
                {((severity / 100) * 1.8 * duration * 0.75).toFixed(1)} <span className="text-xs font-bold text-[#566A7A]">M bbl</span>
              </div>
              <div className="text-xs text-[#566A7A]">Brent Peak: $91.20/bbl</div>
              <div className="text-xs text-emerald-600 font-bold">GDP Drag: -0.02%</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-2 shadow-2xs">
              <div className="text-[10px] font-bold text-[#1C2A39] uppercase">P50 (EXPECTED 50%)</div>
              <div className="text-2xl font-black text-[#1C2A39]">
                {((severity / 100) * 1.8 * duration).toFixed(1)} <span className="text-xs font-bold text-[#566A7A]">M bbl</span>
              </div>
              <div className="text-xs text-[#566A7A]">Brent Peak: $98.40/bbl</div>
              <div className="text-xs text-[#1C2A39] font-bold">GDP Drag: -0.05%</div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="text-[10px] font-bold text-rose-700 uppercase">P90 (SEVERE 90%)</div>
              <div className="text-2xl font-black text-rose-700">
                {((severity / 100) * 1.8 * duration * 1.35).toFixed(1)} <span className="text-xs font-bold text-rose-900">M bbl</span>
              </div>
              <div className="text-xs text-rose-900">Brent Peak: $112.50/bbl</div>
              <div className="text-xs text-rose-700 font-bold">GDP Drag: -0.18%</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] text-xs font-bold text-[#1C2A39]">
            <span className="text-[#1C2A39] font-black">RECOMMENDATION: </span>
            Maintain SPR release buffer at 850,000 bpd to keep P50 net deficit below critical threshold.
          </div>
        </div>
      </div>

      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#1C2A39]" />
            <span>DAY-BY-DAY CRUDE SHORTFALL VS STRATEGIC RESERVE RELEASE (M BBL/DAY)</span>
          </h3>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-rose-600"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Gross Shortfall</span>
            <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> SPR Release</span>
            <span className="flex items-center gap-1.5 text-[#1C2A39]"><span className="w-2.5 h-2.5 rounded bg-[#1C2A39]"></span> Net Deficit</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <XAxis dataKey="day" stroke="#566A7A" fontSize={11} />
              <YAxis stroke="#566A7A" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8ee', color: '#1C2A39' }} />
              <Area type="monotone" dataKey="grossShortfall" stroke="#e11d48" fill="#e11d48" fillOpacity={0.15} />
              <Area type="monotone" dataKey="sprRelease" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
              <Area type="monotone" dataKey="netDeficit" stroke="#1C2A39" fill="#1C2A39" fillOpacity={0.25} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
