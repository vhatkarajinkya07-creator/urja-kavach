import React, { useState } from 'react';
import { 
  Globe, 
  Ship
} from 'lucide-react';
import type { VesselItem } from '../types';

interface MapViewProps {
  vessels: VesselItem[];
  emergencyMode?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ vessels }) => {
  const [selectedVessel, setSelectedVessel] = useState<VesselItem | null>(vessels[0] || null);
  const [activeLayers, setActiveLayers] = useState({
    shippingLanes: true,
    pipelines: true,
    ports: true,
    vessels: true,
    conflicts: true,
    cyclones: true
  });

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6">
      
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              GEOSPATIAL INTELLIGENCE & LIVE AIS VESSEL TRACKER
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              LIVE AIS FEED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of crude oil supertankers, SPM port terminals, and regional conflict zones.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(activeLayers).map(([key, val]) => (
            <button
              key={key}
              onClick={() => toggleLayer(key as keyof typeof activeLayers)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-all ${
                val
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        <div className="lg:col-span-2 rounded-2xl glass-panel border border-slate-800 relative overflow-hidden flex items-center justify-center p-6 bg-[#030712]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px]"></div>

          <div className="relative w-full h-full min-h-[420px] flex flex-col justify-between p-4">
            <div className="flex items-center justify-between font-mono text-xs text-slate-400 z-10">
              <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>AIS SATELLITE TRANSCEIVER: ONLINE</span>
              </div>
              <div className="text-cyan-400">LAT: 20.0° N | LON: 68.0° E (ARABIAN SEA)</div>
            </div>

            <div className="relative w-full h-64 border border-cyan-500/20 rounded-xl bg-slate-950/60 p-4 overflow-hidden flex items-center justify-center">
              <div className="absolute w-full h-0.5 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-transparent top-1/2 -translate-y-1/2 border-b border-dashed border-cyan-400/50"></div>

              {vessels.map((vessel, idx) => (
                <button
                  key={vessel.imo}
                  onClick={() => setSelectedVessel(vessel)}
                  style={{ left: `${20 + (idx * 16)}%`, top: `${35 + ((idx % 3) * 15)}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all group ${
                    selectedVessel?.imo === vessel.imo
                      ? 'bg-cyan-500 text-black border-white shadow-[0_0_20px_#00f0ff] scale-125 z-20'
                      : vessel.risk_score > 70
                      ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_#ff0055] animate-pulse z-10'
                      : 'bg-slate-900 text-cyan-400 border-cyan-500/40 hover:scale-110'
                  }`}
                >
                  <Ship className="w-4 h-4" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[9px] font-mono whitespace-nowrap bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {vessel.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 z-10 pt-2 border-t border-slate-900">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Normal Tanker</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> High Risk Tanker</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Port SPM</span>
              </div>
              <div>5 CRUDE TANKERS IN VECTOR RANGE</div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          {selectedVessel ? (
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{selectedVessel.imo}</div>
                  <h3 className="font-extrabold text-base text-white">{selectedVessel.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                  selectedVessel.risk_score > 70 ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                }`}>
                  RISK: {selectedVessel.risk_score}/100
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">FLAG STATE</div>
                    <div className="font-bold text-white mt-0.5">{selectedVessel.flag}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">VESSEL CLASS</div>
                    <div className="font-bold text-white mt-0.5">{selectedVessel.type}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">CARGO & CAPACITY</div>
                  <div className="font-bold text-cyan-300">{selectedVessel.cargo}</div>
                  <div className="text-[11px] text-slate-400">{selectedVessel.capacity_bbl.toLocaleString()} Barrels</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">ORIGIN ➔ DESTINATION</div>
                  <div className="font-semibold text-white">{selectedVessel.origin}</div>
                  <div className="text-cyan-400 font-semibold">➔ {selectedVessel.destination}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">RISK FACTORS DETECTED</div>
                  <ul className="list-disc list-inside text-rose-300 font-sans text-xs space-y-0.5">
                    {selectedVessel.risk_factors.map((rf, idx) => (
                      <li key={idx}>{rf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 my-auto font-mono text-xs">
              Select a vessel marker on the map to inspect live AIS telemetry.
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SPEED: {selectedVessel?.speed_knots} KNOTS</span>
            <span className="text-cyan-300">ETA: {selectedVessel?.eta}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
