import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { FileText, ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Procurement() {
  const activeScenario = useStore(state => state.activeScenario);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // cards or table

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/recommendations');
        setRecommendations(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const handleGenerateBrief = () => {
    alert("Procurement Brief Generated. In a full app, this would trigger an LLM (Claude) to draft a PDF report.");
  };

  const statusTemplate = (r) => {
    return (
      <span className={`px-2 py-1 text-xs uppercase font-bold rounded ${
        r.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
      }`}>
        {r.status}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl uppercase tracking-widest font-bold">Adaptive Procurement Orchestrator</h2>
          {activeScenario && (
            <div className="text-sm text-live mt-1 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" /> Resolving supply gap for scenario: {activeScenario.name}
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="flex border border-gray-800 rounded overflow-hidden">
            <button 
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-xs uppercase font-bold transition-colors ${viewMode === 'cards' ? 'bg-gray-800 text-white' : 'bg-panel text-gray-500'}`}
            >
              Cards
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-xs uppercase font-bold transition-colors ${viewMode === 'table' ? 'bg-gray-800 text-white' : 'bg-panel text-gray-500'}`}
            >
              Table
            </button>
          </div>
          <button 
            onClick={handleGenerateBrief}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase tracking-wider text-sm rounded transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" /> Generate Brief
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="text-gray-500 text-sm">Orchestrating alternatives...</div>
        ) : (
          viewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, i) => (
                <div key={rec._id} className={`bg-panel border ${i === 0 ? 'border-accent border-l-4' : 'border-gray-800'} p-6 flex flex-col relative`}>
                  {i === 0 && <div className="absolute top-0 right-0 bg-accent text-black text-xs font-bold px-2 py-1 uppercase">Top Pick</div>}
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg leading-tight w-3/4">{rec.supplierId?.name || 'Unknown Supplier'}</h3>
                    <div className="text-2xl font-condensed font-bold text-accent">{rec.compositeScore}</div>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Route</span>
                      <span className="text-right">{rec.routeId?.origin} &rarr; {rec.routeId?.destination}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Transit</span>
                      <span className="font-mono text-live flex items-center"><Clock className="w-3 h-3 mr-1"/> {rec.routeId?.transitDays} Days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Spot Premium</span>
                      <span className="font-mono text-red-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +${rec.supplierId?.currentPremium}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">AI Confidence</span>
                      <span className="font-mono text-live flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> {rec.confidence}%</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-sm font-bold uppercase tracking-wider transition-colors flex justify-center items-center">
                    Action Procurement <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-panel border border-gray-800">
              <DataTable value={recommendations} stripedRows className="text-sm">
                 <Column field="supplierId.name" header="Supplier" className="font-bold py-3 px-4"></Column>
                 <Column field="routeId.origin" header="Origin" className="py-3 px-4"></Column>
                 <Column field="supplierId.currentPremium" header="Premium ($)" className="py-3 px-4 font-mono text-red-400"></Column>
                 <Column field="routeId.transitDays" header="Transit (Days)" className="py-3 px-4 font-mono text-live"></Column>
                 <Column field="confidence" header="Confidence (%)" className="py-3 px-4 font-mono"></Column>
                 <Column field="compositeScore" header="Composite Score" className="py-3 px-4 font-mono font-bold text-accent"></Column>
                 <Column body={statusTemplate} header="Status" className="py-3 px-4"></Column>
              </DataTable>
            </div>
          )
        )}
      </div>
    </div>
  );
}
