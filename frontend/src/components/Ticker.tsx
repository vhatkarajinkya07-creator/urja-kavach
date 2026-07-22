import React from 'react';
import { Flame, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { CommodityItem } from '../types';

interface TickerProps {
  commodities: Record<string, CommodityItem>;
  emergencyMode: boolean;
}

export const Ticker: React.FC<TickerProps> = ({ commodities, emergencyMode }) => {
  return (
    <div className={`w-full py-2 px-5 overflow-hidden flex items-center border-b text-xs ${
      emergencyMode
        ? 'bg-rose-900 border-rose-800 text-white font-medium'
        : 'bg-[#FAF4EA] border-[#F0E4D2] text-[#1C2A39]'
    }`}>
      <div className="flex items-center gap-1.5 pr-4 border-r border-[#E2E8EE] font-black whitespace-nowrap">
        <Flame className="w-4 h-4 text-[#E6AA53]" />
        <span className="uppercase tracking-wider text-[11px] text-[#1C2A39]">LIVE COMMODITY TICKER</span>
      </div>

      <div className="flex-1 overflow-hidden relative ml-4">
        <div className="flex items-center gap-6 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
          {Object.entries(commodities).map(([key, item]) => (
            <div key={key} className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-[#E2E8EE] shadow-2xs">
              <span className="text-[#566A7A] font-semibold text-[11px]">{item.name}:</span>
              <span className="font-black text-[#1C2A39]">${item.price} {item.unit}</span>
              <span className={`inline-flex items-center text-[10px] font-bold ${item.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {item.change >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {item.change >= 0 ? `+${item.change}` : item.change}
              </span>
            </div>
          ))}

          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-200 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px]">ALERT: Houthi Ballistic Buildup near Bab al-Mandab — 14 Indian Tankers Re-routing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
