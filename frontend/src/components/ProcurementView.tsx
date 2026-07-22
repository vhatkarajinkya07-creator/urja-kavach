import React, { useState } from 'react';
import { ShoppingBag, Award, ArrowRight } from 'lucide-react';
import type { SupplierItem } from '../types';

export const ProcurementView: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('sup-uae');
  const [quantityMbbl, setQuantityMbbl] = useState<number>(2.5);

  const suppliers: SupplierItem[] = [
    {
      id: 'sup-uae',
      country: 'UAE',
      company: 'ADNOC',
      crude_grade: 'Murban / Upper Zakum',
      price_per_bbl: 85.10,
      freight_cost: 3.20,
      transit_days: 3.8,
      geopolitical_risk: 'Low-Medium (Fujairah bypass available)',
      political_alignment: 'CEPA Free Trade Agreement',
      carbon_intensity_kg: 16.4,
      ai_score: 94,
      recommendation: 'RECOMMENDED TOP CHOICE for immediate spot swap.'
    },
    {
      id: 'sup-saudi',
      country: 'Saudi Arabia',
      company: 'Saudi Aramco',
      crude_grade: 'Arab Light / Heavy',
      price_per_bbl: 84.50,
      freight_cost: 3.80,
      transit_days: 4.5,
      geopolitical_risk: 'Medium (Hormuz Dependent)',
      political_alignment: 'High (Long-Term Term Contract)',
      carbon_intensity_kg: 18.2,
      ai_score: 89,
      recommendation: 'Maintain baseline term volumes.'
    },
    {
      id: 'sup-nigeria',
      country: 'Nigeria',
      company: 'NNPC',
      crude_grade: 'Bonny Light / Forcados',
      price_per_bbl: 87.20,
      freight_cost: 5.80,
      transit_days: 18.5,
      geopolitical_risk: 'Low (Bypasses Middle East Chokepoints)',
      political_alignment: 'Moderate',
      carbon_intensity_kg: 19.8,
      ai_score: 88,
      recommendation: 'Ideal strategic hedge against Hormuz escalation.'
    },
    {
      id: 'sup-russia',
      country: 'Russia',
      company: 'Rosneft',
      crude_grade: 'Urals Crude',
      price_per_bbl: 71.20,
      freight_cost: 8.50,
      transit_days: 24.0,
      geopolitical_risk: 'High (Sanctions / Dark Fleet)',
      political_alignment: 'Strategic Partnership',
      carbon_intensity_kg: 22.5,
      ai_score: 84,
      recommendation: 'Procure via non-sanctioned SOE vessels only.'
    }
  ];

  const current = suppliers.find(s => s.id === selectedSupplier) || suppliers[0];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-white uppercase tracking-wider">
              AI PROCUREMENT COPILOT & CONTRACT NEGOTIATION ENGINE
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 uppercase">
              MULTI-CRITERIA AI RANKING
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rank international crude oil suppliers based on landed cost per barrel, shipping transit days, geopolitical risk, and refinery metallurgy compatibility.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs font-mono text-slate-400 font-bold uppercase">
            AI SUPPLIER RECOMMENDATION MATRIX
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliers.map((sup) => {
              const isSelected = selectedSupplier === sup.id;
              return (
                <div
                  key={sup.id}
                  onClick={() => setSelectedSupplier(sup.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{sup.country}</span>
                      <h4 className="font-extrabold text-sm text-white">{sup.company}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                      sup.ai_score >= 90 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      SCORE: {sup.ai_score}/100
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">CRUDE GRADE:</span>
                      <span className="font-bold text-white">{sup.crude_grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">BASE PRICE:</span>
                      <span className="font-bold text-cyan-300">${sup.price_per_bbl} / bbl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">TRANSIT TIME:</span>
                      <span className="font-semibold text-slate-200">{sup.transit_days} Days</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-cyan-300 font-sans">
                    {sup.recommendation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">NEGOTIATION SIMULATOR</div>
                <h3 className="font-extrabold text-base text-white">{current.company} ({current.country})</h3>
              </div>
              <Award className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div>
                <label className="text-[10px] text-slate-400">CARGO QUANTITY (MILLION BBL)</label>
                <input
                  type="number"
                  step="0.5"
                  value={quantityMbbl}
                  onChange={(e) => setQuantityMbbl(Number(e.target.value))}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">TOTAL LANDED COST (CARGO)</div>
                <div className="text-2xl font-black text-emerald-400">
                  ${((current.price_per_bbl + current.freight_cost) * quantityMbbl).toFixed(2)} Million
                </div>
                <div className="text-[10px] text-slate-400">Include Freight: ${current.freight_cost}/bbl</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] text-cyan-400 font-bold">AI STRATEGIC VERDICT</div>
                <p className="text-slate-300 font-sans text-xs">
                  Execute contract under Indian Rupee-Dirham bilateral currency settlement mechanism to eliminate foreign exchange volatility risk.
                </p>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg">
            <span>EXECUTE CARGO SPOT ALLOCATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
