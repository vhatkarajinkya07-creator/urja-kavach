import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Layers, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Chart } from 'primereact/chart';

export default function Reserves() {
  const [reserveData, setReserveData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/reserves')
      .then(res => res.json())
      .then(data => setReserveData(data))
      .catch(err => console.error(err));
  }, []);

  if (!reserveData) return null;

  const chartData = reserveData.drawdownSchedule.map((val, i) => ({
    day: `Day ${i*10}`,
    cover: val
  }));

  const gaugeData = {
    labels: ['Available', 'Used'],
    datasets: [{
      data: [reserveData.currentCoverDays, 15 - reserveData.currentCoverDays], // assuming 15 is max capacity
      backgroundColor: ['#3FC1C9', '#1F2937'],
      borderWidth: 0,
    }]
  };
  const gaugeOptions = {
    cutout: '80%',
    plugins: { legend: { display: false } },
    rotation: -90,
    circumference: 180,
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-widest font-bold">Strategic Reserve Optimisation</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gauge */}
        <div className="bg-panel border border-gray-800 p-6 flex flex-col items-center justify-center relative">
          <div className="text-sm uppercase tracking-wider text-gray-400 absolute top-4 left-4">Current SPR Cover</div>
          <div className="w-64 h-64 mt-8 relative">
            <Chart type="doughnut" data={gaugeData} options={gaugeOptions} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-12">
              <span className="text-6xl font-condensed font-bold text-live">{reserveData.currentCoverDays}</span>
              <span className="text-sm text-gray-500 mt-1 uppercase tracking-widest">Days</span>
            </div>
          </div>
        </div>

        {/* Policy Recommendation */}
        <div className="bg-panel border border-gray-800 p-6 md:col-span-2 flex flex-col">
          <div className="text-sm uppercase tracking-wider text-accent flex items-center mb-4">
            <ShieldCheck className="w-4 h-4 mr-2" /> Policy Guidance
          </div>
          <div className="flex-1 text-lg leading-relaxed mb-6">
            Draw down reserves at a controlled rate of <strong className="text-white">0.5M BPD for the next 15 days</strong> to bridge the supply gap caused by Hormuz disruption. 
            Initiate replenishment phase starting <strong className="text-white">{reserveData.replenishmentWindow}</strong> once corridor risk falls below 65/100.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 border border-gray-800">
               <div className="text-xs uppercase text-gray-500 mb-1">AI Confidence</div>
               <div className="text-xl font-bold text-live">94%</div>
            </div>
            <div className="bg-gray-900 p-4 border border-gray-800">
               <div className="text-xs uppercase text-gray-500 mb-1">Key Risk</div>
               <div className="text-sm font-bold text-accent flex items-center">
                 <AlertTriangle className="w-3 h-3 mr-1" /> Extended Disruption
               </div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px]">
        
        {/* Drawdown Chart */}
        <div className="bg-panel border border-gray-800 lg:col-span-2 flex flex-col p-4">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <Layers className="w-4 h-4 mr-2" /> Drawdown Trajectory Projection
          </div>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorCover" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3FC1C9" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3FC1C9" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis dataKey="day" stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                 <YAxis stroke="#666" domain={[0, 15]} tick={{fill: '#666', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#141A21', borderColor: '#333', color: '#fff' }}
                   itemStyle={{ color: '#3FC1C9' }}
                 />
                 <ReferenceLine y={5} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Critical Threshold (5 Days)', fill: '#EF4444', fontSize: 12 }} />
                 <Area type="monotone" dataKey="cover" stroke="#3FC1C9" strokeWidth={2} fillOpacity={1} fill="url(#colorCover)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Sensitivity Table */}
        <div className="bg-panel border border-gray-800 p-4">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4">Scenario Sensitivity</div>
          <div className="space-y-4">
            
            <div className="border border-gray-800 p-4 bg-background">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Mild Scenario (20% Loss)</div>
              <div className="flex justify-between items-end">
                <span className="text-sm">Days to Critical:</span>
                <span className="font-mono text-live font-bold">45 Days</span>
              </div>
            </div>

            <div className="border border-gray-800 p-4 bg-background border-l-2 border-l-live">
              <div className="text-xs font-bold text-live uppercase mb-2">Base Scenario (40% Loss)</div>
              <div className="flex justify-between items-end">
                <span className="text-sm">Days to Critical:</span>
                <span className="font-mono text-live font-bold">28 Days</span>
              </div>
            </div>

            <div className="border border-gray-800 p-4 bg-background border-l-2 border-l-accent">
              <div className="text-xs font-bold text-accent uppercase mb-2">Severe Scenario (80% Loss)</div>
              <div className="flex justify-between items-end">
                <span className="text-sm">Days to Critical:</span>
                <span className="font-mono text-accent font-bold">12 Days</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
