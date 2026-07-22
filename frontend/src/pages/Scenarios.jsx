import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Slider } from 'primereact/slider';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Send, Settings, AlertTriangle, Activity } from 'lucide-react';

export default function Scenarios() {
  const scenarios = useStore(state => state.scenarios);
  const activeScenario = useStore(state => state.activeScenario);
  const setActiveScenario = useStore(state => state.setActiveScenario);
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [severity, setSeverity] = useState(40);
  const [duration, setDuration] = useState(15);
  const [impactData, setImpactData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setScenarios = useStore(state => state.setScenarios);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/scenarios');
        const data = await res.json();
        setScenarios(data);
      } catch (err) {
        console.error("Error fetching scenarios:", err);
      }
    };
    fetchScenarios();
  }, []);

  useEffect(() => {
    if (scenarios.length > 0 && !selectedId) {
      handleSelectScenario(scenarios[0]);
    }
  }, [scenarios, selectedId]);

  const handleSelectScenario = (s) => {
    setSelectedId(s._id);
    setSeverity(s.params.severityPct);
    setDuration(s.params.durationDays);
    formatImpactData(s.computedImpacts);
  };

  const simulateScenario = async (sev, dur) => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/scenarios/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedId,
          params: { severityPct: sev, durationDays: dur }
        })
      });
      const updated = await res.json();
      formatImpactData(updated.computedImpacts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatImpactData = (impacts) => {
    if (!impacts) return;
    const data = [];
    for(let i=0; i<impacts.refineryRunRate.length; i++) {
      data.push({
        month: `M+${i}`,
        refinery: impacts.refineryRunRate[i],
        fuel: impacts.fuelPrice[i],
        power: impacts.powerStress[i]
      });
    }
    setImpactData(data);
  };

  const handleSendToProcurement = () => {
    const s = scenarios.find(x => x._id === selectedId);
    setActiveScenario(s);
    navigate('/procurement');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl uppercase tracking-widest font-bold">Disruption Scenario Modeller</h2>
        <button 
          onClick={handleSendToProcurement}
          className="flex items-center px-4 py-2 bg-accent text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-yellow-600 transition-colors"
        >
          <Send className="w-4 h-4 mr-2" /> Send to Orchestrator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Controls Panel (Left) */}
        <div className="bg-panel border border-gray-800 flex flex-col p-4 lg:col-span-1 overflow-auto">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <Settings className="w-4 h-4 mr-2" /> Parameters
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase text-gray-400 mb-2 block">Scenario Preset</label>
              <div className="space-y-2">
                {scenarios.map(s => (
                  <button 
                    key={s._id}
                    onClick={() => handleSelectScenario(s)}
                    className={`w-full text-left px-3 py-2 text-sm border transition-colors ${
                      selectedId === s._id ? 'border-accent text-accent bg-gray-900' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase text-gray-400">Severity (% Capacity Lost)</label>
                <span className="text-xs font-mono text-live">{severity}%</span>
              </div>
              <Slider 
                value={severity} 
                onChange={(e) => setSeverity(e.value)} 
                onSlideEnd={(e) => simulateScenario(e.value, duration)}
                className="w-full" 
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase text-gray-400">Duration (Days)</label>
                <span className="text-xs font-mono text-live">{duration}</span>
              </div>
              <Slider 
                value={duration} 
                onChange={(e) => setDuration(e.value)} 
                onSlideEnd={(e) => simulateScenario(severity, e.value)}
                min={1} max={180}
                className="w-full" 
              />
            </div>

            <Accordion activeIndex={0} className="mt-4 text-sm">
              <AccordionTab header="Modeling Assumptions" headerClassName="bg-transparent border-gray-800 text-gray-400 text-xs uppercase" contentClassName="bg-transparent border-gray-800 text-gray-500 text-xs">
                <ul className="list-disc pl-4 space-y-2">
                  <li>Assumes 15% of lost volume reroutable via Cape of Good Hope within 10 days.</li>
                  <li>SPR drawdown limited to 2M BPD to maintain strategic buffer.</li>
                  <li>Domestic fuel price caps lifted partially in M+1.</li>
                </ul>
              </AccordionTab>
            </Accordion>
          </div>
        </div>

        {/* Charts Panel (Right) */}
        <div className="bg-panel border border-gray-800 lg:col-span-3 flex flex-col p-4">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2" /> Cascading Impact Analysis
          </div>
          
          <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}>
            
            {/* Refinery Impact */}
            <div className="border border-gray-800 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">Refinery Run Rate (%)</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" tick={{fontSize: 10}} />
                    <YAxis stroke="#666" domain={[0, 100]} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{backgroundColor: '#141A21', borderColor: '#333'}} />
                    <Line type="monotone" dataKey="refinery" stroke="#E8A33D" strokeWidth={2} dot={{r:4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fuel Price Impact */}
            <div className="border border-gray-800 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">Fuel Price Trajectory (Index)</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" tick={{fontSize: 10}} />
                    <YAxis stroke="#666" domain={[80, 150]} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{backgroundColor: '#141A21', borderColor: '#333'}} />
                    <Line type="monotone" dataKey="fuel" stroke="#EF4444" strokeWidth={2} dot={{r:4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

             {/* Power Stress Impact */}
             <div className="border border-gray-800 p-4 md:col-span-2">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">Power Sector Stress Index</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" tick={{fontSize: 10}} />
                    <YAxis stroke="#666" domain={[0, 100]} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{backgroundColor: '#141A21', borderColor: '#333'}} />
                    <Line type="monotone" dataKey="power" stroke="#3FC1C9" strokeWidth={2} fillOpacity={0.2} fill="#3FC1C9" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
