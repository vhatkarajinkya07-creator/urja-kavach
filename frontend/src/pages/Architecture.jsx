import { Database, Server, Monitor, ShieldCheck, Activity, Share2, Layers } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Architecture() {
  const criteriaData = [
    { page: 'Command Center (Dashboard)', criteria: 'Business Impact, UX', description: 'Single pane of glass for decision makers. Aggregates risk and immediately surfaces executable recommendations.' },
    { page: 'Risk Intelligence', criteria: 'Technical Excellence', description: 'Multi-source agent ingestion (News, AIS, Sanctions). Explains signal-to-score weighting for transparency.' },
    { page: 'Scenario Modeller', criteria: 'Innovation, Business Impact', description: 'Interactive "what-if" simulation showing cascading downstream impacts (Refinery, Fuel Price, GDP) with explicit assumptions.' },
    { page: 'Procurement Orchestrator', criteria: 'Technical Excellence, Innovation', description: 'Turns supply gaps into actionable, ranked alternative sources with AI confidence scores.' },
    { page: 'Supply Chain Digital Twin', criteria: 'UX, Innovation', description: 'Geospatial visualization of the entire network with simulated vessel tracking.' },
    { page: 'Response Log', criteria: 'Business Impact', description: 'Directly tracks the end-to-end response time KPI (Signal → Recommendation → Action).' }
  ];

  return (
    <div className="flex flex-col space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-widest font-bold">System Architecture</h2>
        <div className="text-sm text-gray-400">Underlying technical design for Urja Kavach</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Architecture Diagram */}
        <div className="bg-panel border border-gray-800 p-6 flex flex-col">
          <div className="text-sm uppercase tracking-wider text-accent mb-6 flex items-center">
            <Share2 className="w-4 h-4 mr-2" /> Data Flow & Component Architecture
          </div>
          
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 w-full">
              
              {/* Data Sources */}
              <div className="flex flex-col space-y-4">
                <div className="bg-gray-900 border border-gray-700 p-4 rounded text-center w-40">
                  <div className="text-xs text-gray-400 uppercase mb-1">External Data</div>
                  <div className="font-bold text-sm text-live flex items-center justify-center"><Database className="w-4 h-4 mr-1"/> Global News</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 p-4 rounded text-center w-40">
                  <div className="text-xs text-gray-400 uppercase mb-1">External Data</div>
                  <div className="font-bold text-sm text-live flex items-center justify-center"><Database className="w-4 h-4 mr-1"/> AIS Shipping</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="h-0.5 w-16 bg-gray-600"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[8px] border-l-gray-600 border-b-4 border-b-transparent -ml-1 mt-[-4px] translate-x-8"></div>
              </div>

              {/* Agent Layer (Backend) */}
              <div className="bg-[#1A222C] border-2 border-accent p-6 rounded relative min-w-[250px]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-panel px-2 text-xs uppercase text-accent font-bold">Agent Orchestration</div>
                
                <div className="space-y-3 mt-2">
                  <div className="bg-gray-900 border border-gray-700 p-2 text-center text-sm font-bold text-white flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 mr-2 text-live" /> Risk Intel Agent
                  </div>
                  <div className="bg-gray-900 border border-gray-700 p-2 text-center text-sm font-bold text-white flex items-center justify-center">
                    <Activity className="w-4 h-4 mr-2 text-live" /> Scenario Modeller
                  </div>
                  <div className="bg-gray-900 border border-gray-700 p-2 text-center text-sm font-bold text-white flex items-center justify-center">
                    <Layers className="w-4 h-4 mr-2 text-live" /> SPR Optimizer
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col items-center text-center">
                  <Server className="w-6 h-6 text-gray-400 mb-1" />
                  <div className="text-xs uppercase text-gray-400">Node.js + Express + MongoDB</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="h-0.5 w-16 bg-gray-600"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[8px] border-l-gray-600 border-b-4 border-b-transparent -ml-1 mt-[-4px] translate-x-8"></div>
              </div>

              {/* Frontend */}
              <div className="bg-gray-900 border-2 border-live p-6 rounded relative min-w-[200px]">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-panel px-2 text-xs uppercase text-live font-bold">Command Center UI</div>
                 <div className="flex flex-col items-center text-center py-4">
                   <Monitor className="w-12 h-12 text-white mb-2" />
                   <div className="text-sm font-bold mb-1">Vite + React</div>
                   <div className="text-xs text-gray-400 uppercase">Tailwind + Zustand</div>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Judging Criteria Mapping */}
        <div className="bg-panel border border-gray-800 flex flex-col">
          <div className="p-6 border-b border-gray-800 text-sm uppercase tracking-wider text-live flex items-center">
            Judging Criteria Mapping
          </div>
          <div className="p-0 flex-1">
             <DataTable value={criteriaData} stripedRows className="text-sm">
                <Column field="page" header="Product Area" className="font-bold py-4 px-6 min-w-[150px]"></Column>
                <Column field="criteria" header="Target Criteria" className="py-4 px-6 font-mono text-accent whitespace-nowrap"></Column>
                <Column field="description" header="Implementation Details" className="py-4 px-6 text-gray-400"></Column>
             </DataTable>
          </div>
        </div>

      </div>
    </div>
  );
}
