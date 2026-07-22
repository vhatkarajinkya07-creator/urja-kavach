import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: string;
  risk: string;
  size: number;
}

export const KnowledgeGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>({
    id: 't-hormuz',
    label: 'Strait of Hormuz',
    category: 'Chokepoint',
    risk: 'High',
    size: 40
  });

  const nodes: GraphNode[] = [
    { id: 'c-iran', label: 'Iran', category: 'Country', risk: 'High', size: 30 },
    { id: 'c-saudi', label: 'Saudi Arabia', category: 'Country', risk: 'Medium', size: 35 },
    { id: 'c-russia', label: 'Russia', category: 'Country', risk: 'Medium', size: 35 },
    { id: 'c-india', label: 'India', category: 'Country', risk: 'Low', size: 45 },
    { id: 't-hormuz', label: 'Strait of Hormuz', category: 'Chokepoint', risk: 'High', size: 40 },
    { id: 't-bab', label: 'Bab al-Mandab', category: 'Chokepoint', risk: 'High', size: 38 },
    { id: 'p-mundra', label: 'Mundra Port', category: 'Port', risk: 'Medium', size: 30 },
    { id: 'r-jamnagar', label: 'Jamnagar Refinery', category: 'Refinery', risk: 'Medium', size: 42 },
    { id: 'v-swarna', label: 'MT SWARNA KAMAL', category: 'Tanker', risk: 'High', size: 22 },
    { id: 's-usofac', label: 'US OFAC Sanctions', category: 'Sanction', risk: 'High', size: 26 },
    { id: 'w-vayu', label: 'Cyclone Vayu-II', category: 'Weather System', risk: 'High', size: 32 },
    { id: 'sec-trans', label: 'Transport Sector', category: 'Economic Sector', risk: 'High', size: 36 }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-6 h-6 text-[#1C2A39]" />
            <h2 className="text-lg font-black text-[#1C2A39] uppercase tracking-wider">
              INTERACTIVE KNOWLEDGE GRAPH ARCHITECTURE
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] uppercase">
              18 ENTITIES & LINKAGES
            </span>
          </div>
          <p className="text-xs text-[#566A7A] mt-1 font-medium">
            Explore non-linear relationships between geopolitical conflict nodes, crude tankers, port terminals, and macroeconomic impacts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        <div className="lg:col-span-2 rounded-3xl glass-panel-light border border-slate-200 relative overflow-hidden flex items-center justify-center p-6 bg-white">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1C2A39_1px,transparent_1px)] [background-size:32px_32px]"></div>

          <div className="relative w-full h-full min-h-[420px] flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-bold text-[#566A7A] z-10">
              <span>FORCE-DIRECTED NETWORK GRAPH</span>
              <span className="text-[#1C2A39]">STATUS: INTERACTIVE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-auto relative z-10">
              {nodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#1C2A39] text-[#E6AA53] border-[#1C2A39] shadow-md font-bold scale-105'
                        : node.risk === 'High'
                        ? 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100'
                        : 'bg-[#FAF4EA] border-[#F0E4D2] text-[#1C2A39] hover:border-[#E6AA53]'
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase tracking-wider opacity-80">{node.category}</div>
                    <div className="font-black text-xs mt-0.5">{node.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] font-bold text-[#8A9DAE] z-10 text-right">
              CLICK ANY NODE TO TRAVERSE RELATIONSHIP PATHS
            </div>
          </div>
        </div>

        <div className="glass-panel-light p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <div className="text-[10px] font-bold text-[#566A7A] uppercase">{selectedNode.category} ENTITY</div>
                <h3 className="font-black text-base text-[#1C2A39]">{selectedNode.label}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                selectedNode.risk === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                RISK: {selectedNode.risk}
              </span>
            </div>

            <div className="space-y-3 text-xs font-bold text-[#1C2A39]">
              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[10px] text-[#566A7A] uppercase">DIRECT DOWNSTREAM DEPENDENCIES</div>
                <div className="text-[#1C2A39]">Iran ➔ Hormuz ➔ MT SWARNA KAMAL ➔ Sikka Terminal ➔ Jamnagar ➔ Transport Sector</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[10px] text-[#566A7A] uppercase">CASCADE PROPAGATION WEIGHT</div>
                <div className="text-lg font-black text-[#1C2A39]">0.94 / 1.00</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF4EA] border border-[#F0E4D2] space-y-1">
                <div className="text-[10px] text-[#566A7A] uppercase">AI KNOWLEDGE GRAPH VERDICT</div>
                <p className="text-[#566A7A] font-medium text-xs">
                  Critical bottleneck entity. Any disruption to {selectedNode.label} directly impacts 1.24M bpd of refined product output within 72 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#1C2A39]">
            KNOWLEDGE RETRIEVAL CONFIDENCE: 96%
          </div>
        </div>
      </div>
    </div>
  );
};
