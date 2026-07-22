import { useState } from 'react';
import { useStore } from '../store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Radio, Newspaper, Anchor, DollarSign } from 'lucide-react';

export default function RiskIntelligence() {
  const corridors = useStore(state => state.corridors);
  const signals = useStore(state => state.signals);
  const [selectedCorridor, setSelectedCorridor] = useState(corridors[0]?.name || 'Strait of Hormuz');

  // Format chart data
  const curr = corridors.find(c => c.name === selectedCorridor);
  const chartData = curr ? curr.history30d.map((val, i) => ({
    day: `T-${30 - i*3}`,
    risk: val
  })) : [];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl uppercase tracking-widest font-bold">Geopolitical Risk Intelligence</h2>
        <div className="flex space-x-2">
          {corridors.map(c => (
            <button 
              key={c._id}
              onClick={() => setSelectedCorridor(c.name)}
              className={`px-4 py-2 text-sm uppercase tracking-wider font-bold transition-colors ${
                selectedCorridor === c.name ? 'bg-accent text-black' : 'bg-panel border border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Source Panel (Left) */}
        <div className="bg-panel border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm uppercase tracking-wider text-gray-400">Ingestion Sources</div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            
            <div className="border border-gray-800 p-3 bg-background">
              <div className="flex items-center text-live text-xs uppercase mb-2"><Newspaper className="w-3 h-3 mr-2" /> Global News</div>
              <div className="text-sm">Reuters: US announces new sanctions on shipping...</div>
              <div className="text-xs text-gray-500 font-mono mt-2">10 mins ago</div>
            </div>

            <div className="border border-gray-800 p-3 bg-background">
              <div className="flex items-center text-live text-xs uppercase mb-2"><Anchor className="w-3 h-3 mr-2" /> AIS/Shipping</div>
              <div className="text-sm">Vessel bunching detected near Fujairah anchorage.</div>
              <div className="text-xs text-gray-500 font-mono mt-2">45 mins ago</div>
            </div>

            <div className="border border-gray-800 p-3 bg-background border-l-2 border-l-accent">
              <div className="flex items-center text-accent text-xs uppercase mb-2"><Radio className="w-3 h-3 mr-2" /> Sanctions Registry</div>
              <div className="text-sm">OFAC SDN update: 3 entities added in Middle East.</div>
              <div className="text-xs text-gray-500 font-mono mt-2">2 hours ago</div>
            </div>

            <div className="border border-gray-800 p-3 bg-background">
              <div className="flex items-center text-live text-xs uppercase mb-2"><DollarSign className="w-3 h-3 mr-2" /> Commodity Prices</div>
              <div className="text-sm">Brent crude futures +2.3% on geopolitical fears.</div>
              <div className="text-xs text-gray-500 font-mono mt-2">3 hours ago</div>
            </div>

          </div>
        </div>

        {/* Chart Panel (Center) */}
        <div className="bg-panel border border-gray-800 lg:col-span-2 flex flex-col p-4">
           <div className="text-sm uppercase tracking-wider text-gray-400 mb-4">{selectedCorridor} - 30 Day Risk Trajectory</div>
           <div className="flex-1 min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#E8A33D" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#E8A33D" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis dataKey="day" stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                 <YAxis stroke="#666" domain={[0, 100]} tick={{fill: '#666', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#141A21', borderColor: '#333', color: '#fff' }}
                   itemStyle={{ color: '#E8A33D' }}
                 />
                 <ReferenceLine y={75} stroke="#E8A33D" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'High Risk Threshold', fill: '#E8A33D', fontSize: 12 }} />
                 <Area type="monotone" dataKey="risk" stroke="#E8A33D" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Explainability Panel (Right) */}
        <div className="bg-panel border border-gray-800 flex flex-col">
           <div className="p-4 border-b border-gray-800 text-sm uppercase tracking-wider text-gray-400">Signal Contribution</div>
           <div className="p-4 flex-1 overflow-auto">
             <div className="text-3xl font-condensed font-bold text-accent mb-6">{curr?.currentRiskScore || 0}/100</div>
             
             <div className="space-y-4">
               {curr?.activeSignals.map((sig, idx) => (
                 <div key={idx} className="border-b border-gray-800 pb-3">
                   <div className="flex justify-between items-start mb-1">
                     <div className="text-sm">{sig}</div>
                     <div className="text-accent font-bold text-sm">+{Math.floor(Math.random() * 5) + 5}%</div>
                   </div>
                   <div className="text-xs text-gray-500">AI Confidence: High</div>
                 </div>
               ))}
               {!curr?.activeSignals.length && <div className="text-sm text-gray-500">No active signals contributing to score.</div>}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
