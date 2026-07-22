import { useStore } from '../store';
import { Clock, ShieldAlert, Activity, CheckCircle, ChevronRight } from 'lucide-react';

export default function ResponseLog() {
  const incidents = useStore(state => state.incidents);

  const calculateElapsed = (start, end) => {
    if (!start || !end) return 'Pending';
    const diff = new Date(end) - new Date(start);
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    if (hours > 0) return `${hours}h ${mins % 60}m`;
    return `${mins}m`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl uppercase tracking-widest font-bold">Alerts & Response Log</h2>
          <div className="text-sm text-gray-400 mt-1">End-to-End System Response Tracking</div>
        </div>
        
        <div className="flex bg-panel border border-gray-800 p-4 space-x-8">
          <div>
             <div className="text-xs uppercase text-gray-500 mb-1">Avg Signal &rarr; Recommendation</div>
             <div className="text-2xl font-bold font-condensed text-live">14m 20s</div>
          </div>
          <div>
             <div className="text-xs uppercase text-gray-500 mb-1">Incidents (30d)</div>
             <div className="text-2xl font-bold font-condensed">12</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-auto">
        {incidents.map(inc => (
          <div key={inc._id} className="bg-panel border border-gray-800 p-6 flex flex-col hover:border-gray-600 transition-colors cursor-pointer group">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold uppercase tracking-wider">{inc.title}</h3>
              <span className={`px-3 py-1 text-xs uppercase font-bold rounded ${
                inc.status === 'Active' ? 'bg-accent/20 text-accent border border-accent/50' : 'bg-gray-800 text-gray-400'
              }`}>
                {inc.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between relative">
              <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-800 -z-10 -translate-y-1/2"></div>
              
              {/* Step 1: Signal */}
              <div className="flex flex-col items-center bg-panel px-4 z-10">
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-accent flex items-center justify-center text-accent mb-2 shadow-[0_0_15px_rgba(232,163,61,0.2)]">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-bold text-gray-300">Signal Detected</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{new Date(inc.firstSignalAt).toLocaleTimeString()}</div>
              </div>

              {/* Elapsed Badge */}
              <div className="px-2 py-1 bg-gray-800 text-xs font-mono rounded-full text-gray-400 z-10">
                {calculateElapsed(inc.firstSignalAt, inc.scenarioRunAt)}
              </div>

              {/* Step 2: Scenario */}
              <div className="flex flex-col items-center bg-panel px-4 z-10">
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-live flex items-center justify-center text-live mb-2 shadow-[0_0_15px_rgba(63,193,201,0.2)]">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-bold text-gray-300">Modelled</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{new Date(inc.scenarioRunAt).toLocaleTimeString()}</div>
              </div>

              {/* Elapsed Badge */}
              <div className="px-2 py-1 bg-gray-800 text-xs font-mono rounded-full text-gray-400 z-10">
                {calculateElapsed(inc.scenarioRunAt, inc.recommendationAt)}
              </div>

              {/* Step 3: Recommendation */}
              <div className="flex flex-col items-center bg-panel px-4 z-10">
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-live flex items-center justify-center text-live mb-2 shadow-[0_0_15px_rgba(63,193,201,0.2)]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-bold text-gray-300">Recommended</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{new Date(inc.recommendationAt).toLocaleTimeString()}</div>
              </div>

              {/* Elapsed Badge */}
              <div className="px-2 py-1 bg-gray-800 text-xs font-mono rounded-full text-gray-400 z-10">
                {calculateElapsed(inc.recommendationAt, inc.actionedAt)}
              </div>

              {/* Step 4: Action */}
              <div className="flex flex-col items-center bg-panel px-4 z-10 opacity-50">
                <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-600 flex items-center justify-center text-gray-400 mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-bold text-gray-400">Actioned</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{inc.actionedAt ? new Date(inc.actionedAt).toLocaleTimeString() : 'Pending'}</div>
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <button className="text-xs uppercase tracking-widest text-live flex items-center group-hover:underline">
                View Audit Trail <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
