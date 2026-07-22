import React, { useState } from 'react';
import { 
  GitFork, 
  ShieldCheck, 
  Clock, 
  Play
} from 'lucide-react';
import type { DigitalTwinNode } from '../types';

interface DigitalTwinViewProps {
  emergencyMode?: boolean;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = () => {
  const [selectedDisruption, setSelectedDisruption] = useState<string>('node-sea-hor');
  const [severityPct, setSeverityPct] = useState<number>(75);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(5);

  const nodes: DigitalTwinNode[] = [
    { id: 'node-sup-me', name: 'Middle East (Saudi/Iraq/UAE)', type: 'SUPPLIER', capacity: '2.8M bpd', status: 'WARN', lat: 25.0, lon: 50.0 },
    { id: 'node-sea-hor', name: 'Strait of Hormuz Chokepoint', type: 'TRANSIT_LANE', capacity: '2.2M bpd', status: 'CRITICAL', lat: 26.5, lon: 56.2 },
    { id: 'node-port-sik', name: 'Sikka & Mundra SPM Terminals', type: 'PORT', capacity: '2.2M bpd', status: 'WARN', lat: 22.4, lon: 69.8 },
    { id: 'node-spr-mng', name: 'Mangalore Strategic Reserve (SPR)', type: 'STORAGE', capacity: '1.33M MT', status: 'READY', lat: 12.9, lon: 74.9 },
    { id: 'node-pipe-kmpl', name: 'Kandla-Bhatinda Pipeline Grid', type: 'PIPELINE', capacity: '340K bpd', status: 'NORMAL', lat: 26.0, lon: 72.0 },
    { id: 'node-ref-jam', name: 'Jamnagar Mega Refinery Complex', type: 'REFINERY', capacity: '1.24M bpd', status: 'WARN', lat: 22.4, lon: 69.9 },
    { id: 'node-cons-north', name: 'Northern Industrial & Agriculture Grid', type: 'CONSUMER', demand: '1.1M bpd', status: 'NORMAL', lat: 28.6, lon: 77.2 }
  ];

  const cascadeTimeline = [
    {
      stage: 1,
      title: 'T+0 Hours: Primary Disruption at Hormuz',
      severity: `${severityPct}% Transit Interruption`,
      description: 'Naval standoff / security threat registered. 14 Eastbound VLCC tankers carrying crude to Saurashtra ports hold position.'
    },
    {
      stage: 2,
      title: 'T+24 Hours: Saurashtra SPM Port Discharge Drop',
      severity: 'Delay of +3.8 Days',
      description: 'Single Point Mooring (SPM) offloading at Sikka & Mundra terminals drops by 54%. Crude arrival backlog builds.'
    },
    {
      stage: 3,
      title: 'T+72 Hours: Refinery Buffer Depletion',
      severity: 'Crude Stock drops 14.2 -> 6.5 Days',
      description: 'Reliance Jamnagar & Nayara Vadinar refineries switch to tankage reserves. Daily processing run-rate curtailed by 18%.'
    },
    {
      stage: 4,
      title: 'T+120 Hours: Trunk Pipeline Flow Reduction',
      severity: '-145,000 bpd Product Pressure Drop',
      description: 'Kandla-Bhatinda and Mundra-Delhi pipelines cut throughput. Northern depot inventories drawn down by 15%.'
    },
    {
      stage: 5,
      title: 'T+7 Days: Northern Consumer & Economic Cascade',
      severity: 'Transport Inflation +1.2% | Spot Rationing Risk',
      description: 'Northern agriculture and freight transport sector face retail fuel price escalation unless SPR reserves are mobilized immediately.'
    }
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    let current = 1;
    const interval = setInterval(() => {
      current++;
      setActiveStep(current);
      if (current >= 5) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 900);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-6 h-6 text-[#1C2A39]" />
            <h2 className="text-lg font-black text-[#1C2A39] uppercase tracking-wider">
              NATIONAL ENERGY SUPPLY CHAIN DIGITAL TWIN
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] uppercase">
              FLAGSHIP USP
            </span>
          </div>
          <p className="text-xs text-[#566A7A] mt-1 font-medium">
            Simulate real-time cascading failure propagation across India's complete crude supply chain node graph.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#FAF4EA] px-3.5 py-2 rounded-2xl border border-[#F0E4D2] text-xs font-bold text-[#1C2A39]">
            <span className="text-[#566A7A]">Severity:</span>
            <input
              type="range"
              min="20"
              max="100"
              value={severityPct}
              onChange={(e) => setSeverityPct(Number(e.target.value))}
              className="w-24 accent-[#E6AA53] cursor-pointer"
            />
            <span className="text-[#1C2A39] font-black w-10">{severityPct}%</span>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-2xl bg-[#1C2A39] text-[#E6AA53] font-black text-xs hover:bg-[#2B4459] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'PROPAGATING...' : 'TRIGGER DISRUPTION'}</span>
          </button>
        </div>
      </div>

      {/* Dependency Node Graph Chain */}
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#566A7A] border-b border-slate-100 pb-3">
          <span>INDIA ENERGY DEPENDENCY GRAPH (CASCADING LINKAGE)</span>
          <span className="text-[#1C2A39]">7 CONNECTED SYSTEM NODES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 py-2">
          {nodes.map((node, index) => {
            const isDisruptedNode = node.id === selectedDisruption;
            const isAffectedByCascade = index <= activeStep;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedDisruption(node.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                  isDisruptedNode
                    ? 'bg-rose-900 border-rose-700 text-white shadow-md'
                    : isAffectedByCascade
                    ? 'bg-[#FAF4EA] border-[#E6AA53] text-[#1C2A39] shadow-2xs'
                    : 'bg-white border-slate-200 text-[#1C2A39] hover:border-[#E6AA53]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                    <span className={isDisruptedNode ? 'text-rose-200' : 'text-[#8A9DAE]'}>STAGE 0{index + 1}</span>
                    <span className={`px-1.5 py-0.2 rounded font-extrabold ${isDisruptedNode ? 'text-white' : 'text-[#1C2A39]'}`}>
                      {node.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs leading-snug">{node.name}</h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold flex items-center justify-between">
                  <span className={isDisruptedNode ? 'text-rose-200' : 'text-[#566A7A]'}>{node.capacity || node.demand}</span>
                  <span className={isDisruptedNode ? 'text-white animate-pulse' : 'text-[#E6AA53]'}>
                    {isDisruptedNode ? 'BROKEN' : 'ACTIVE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cascade Timeline & AI Mitigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel-light p-6 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1C2A39]" />
            <span>CASCADING FAILURE PROPAGATION TIMELINE</span>
          </h3>

          <div className="space-y-3">
            {cascadeTimeline.map((step) => {
              const isActive = step.stage <= activeStep;
              return (
                <div
                  key={step.stage}
                  className={`p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-[#FAF4EA] border-[#F0E4D2] text-[#1C2A39] shadow-2xs'
                      : 'bg-white/60 border-slate-100 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-[#1C2A39]">{step.title}</span>
                    <span className="text-rose-600">{step.severity}</span>
                  </div>
                  <p className="text-xs text-[#566A7A] leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-black text-sm text-[#1C2A39] uppercase tracking-wider">
                AI MITIGATION PROTOCOL
              </h3>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[#1C2A39]">1. MOBILIZE MANGALORE SPR</div>
                <p className="text-[#566A7A] font-medium text-xs">Inject 850,000 bpd into ISPRL trunk pipeline grid immediately.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[#1C2A39]">2. EXECUTE RE-ROUTE VIA CAPE</div>
                <p className="text-[#566A7A] font-medium text-xs">Divert 3 scheduled Indian Oil VLCC tankers from Fujairah via Cape of Good Hope.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[#1C2A39]">3. SPOT SWAP WEST AFRICA</div>
                <p className="text-[#566A7A] font-medium text-xs">Procure 2.5M bbl Bonny Light crude from Nigeria NNPC with express 9-day sailing delivery.</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs font-bold flex items-center justify-between text-[#1C2A39]">
            <span>SYSTEM RECOVERY:</span>
            <span className="text-emerald-600 font-black">10.2 DAYS</span>
          </div>
        </div>
      </div>

    </div>
  );
};
