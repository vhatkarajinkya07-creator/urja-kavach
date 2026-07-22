import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const CommodityView: React.FC = () => {
  const priceHistory = [
    { time: '09:00', brent: 82.5, wti: 78.8, natgas: 2.35 },
    { time: '11:00', brent: 83.2, wti: 79.4, natgas: 2.38 },
    { time: '13:00', brent: 84.1, wti: 80.1, natgas: 2.42 },
    { time: '15:00', brent: 84.5, wti: 80.2, natgas: 2.45 },
    { time: '17:00', brent: 85.2, wti: 81.0, natgas: 2.48 }
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              COMMODITY & FREIGHT RATE INTELLIGENCE
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              LIVE COMMODITY TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time crude prices, VLCC freight rates, LNG spot markers, and FX currency volatility tracking.
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>INTRADAY BRENT & WTI CRUDE PRICE TREND ($/BBL)</span>
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip contentStyle={{ backgroundColor: '#090d1f', borderColor: '#1e293b', color: '#fff' }} />
              <Line type="monotone" dataKey="brent" stroke="#00f0ff" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="wti" stroke="#0066ff" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
