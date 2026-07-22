import React from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 text-[#1C2A39] shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#1C2A39] text-[#E6AA53] font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#8A9DAE] uppercase">SECRET / CABINET BRIEFING NOTE</div>
              <h2 className="text-lg font-black text-[#1C2A39]">NATIONAL ENERGY SUPPLY CHAIN RESILIENCE REPORT</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#FAF4EA] hover:bg-[#F0E4D2] text-xs font-bold text-[#1C2A39] flex items-center gap-1.5 border border-[#F0E4D2]"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / PDF</span>
            </button>

            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-[#566A7A] font-medium">
          <div className="p-4.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-2">
            <h3 className="font-black text-sm text-[#1C2A39] uppercase">1. EXECUTIVE SUMMARY</h3>
            <p>
              This briefing note synthesizes real-time intelligence from the 10-Agent AI Operating System regarding ongoing geopolitical friction at the Strait of Hormuz chokepoint and severe Met-Ocean conditions (Cyclone Vayu-II) in the Arabian Sea.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-2">
            <h3 className="font-black text-sm text-[#1C2A39] uppercase">2. NATIONAL RISK & INVENTORY STATUS</h3>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-[#1C2A39] font-bold">
              <li>Composite National Energy Risk Index: <strong className="text-amber-700">64.2 / 100</strong> (Orange Watch)</li>
              <li>Strategic Petroleum Reserve (SPR) Days Remaining: <strong className="text-emerald-700">38.5 Days</strong> (5.33M MT)</li>
              <li>Crude Imports at Immediate Risk: <strong className="text-rose-700">18.4%</strong> (14 Tankers Idling near Hormuz & Red Sea)</li>
            </ul>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-2">
            <h3 className="font-black text-sm text-[#1C2A39] uppercase">3. RECOMMENDED CABINET ACTION PLAN</h3>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#1C2A39] font-bold">
              <li>Authorize drawdown of 1.5 Million barrels from Mangalore SPR to supply Jamnagar & Vadinar refineries.</li>
              <li>Divert 3 scheduled Indian Oil VLCC tankers from Fujairah around Cape of Good Hope with Indian Navy (Op Sankalp) escort.</li>
              <li>Execute spot procurement tender for 2.5M bbl West African crude (Bonny Light) with 9-day sailing delivery.</li>
            </ol>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between text-[10px] text-[#8A9DAE] font-bold">
            <div>DATE: JULY 22, 2026 | NEW DELHI</div>
            <div className="text-[#1C2A39]">APPROVED BY URJA KAVACH ORCHESTRATOR AI</div>
          </div>
        </div>
      </div>
    </div>
  );
};
