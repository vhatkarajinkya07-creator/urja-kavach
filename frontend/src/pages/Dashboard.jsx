import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Activity, Bell, Map as MapIcon, Database } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';

export default function Dashboard() {
  const { 
    overallRisk, setOverallRisk,
    corridors, setCorridors,
    signals, setSignals,
    incidents, setIncidents
  } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [corrRes, sigRes, incRes] = await Promise.all([
          fetch('http://localhost:3001/api/corridors'),
          fetch('http://localhost:3001/api/signals'),
          fetch('http://localhost:3001/api/incidents')
        ]);
        setCorridors(await corrRes.json());
        setSignals(await sigRes.json());
        setIncidents(await incRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prepare chart data for Reserve Cover
  const reserveChartData = {
    labels: ['Used', 'Remaining'],
    datasets: [{
      data: [3.5, 9.5],
      backgroundColor: ['#1F2937', '#3FC1C9'],
      borderWidth: 0,
    }]
  };
  const reserveChartOptions = {
    cutout: '70%',
    plugins: { legend: { display: false } }
  };

  const riskTemplate = (rowData) => (
    <div className="flex items-center space-x-2">
      <span className={`font-mono ${rowData.currentRiskScore > 75 ? 'text-accent' : 'text-live'}`}>
        {rowData.currentRiskScore}
      </span>
      {rowData.currentRiskScore > 75 ? <TrendingUp className="w-4 h-4 text-accent" /> : <Activity className="w-4 h-4 text-live" />}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase tracking-widest font-bold">Command Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Overall Risk Gauge */}
        <div className="bg-panel border border-gray-800 p-6 flex flex-col justify-between">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4">Global Disruption Risk</div>
          <div className="flex items-end space-x-4">
            <span className="text-6xl font-condensed font-bold text-accent">{overallRisk}</span>
            <span className="text-xl text-gray-500 mb-2">/100</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <TrendingUp className="w-4 h-4 mr-1 text-accent" /> +4 points vs 24h
          </div>
        </div>

        {/* Reserve Cover Widget */}
        <div className="bg-panel border border-gray-800 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">SPR Cover</div>
          <div className="w-32 h-32 absolute -right-6 -bottom-6">
             <Chart type="doughnut" data={reserveChartData} options={reserveChartOptions} className="w-full h-full" />
          </div>
          <div className="flex flex-col mt-4 z-10">
            <span className="text-4xl font-condensed font-bold text-live">9.5 <span className="text-lg text-gray-500">days</span></span>
            <span className="text-sm text-gray-400 mt-1">Safe threshold: 12.0 days</span>
          </div>
          <Link to="/reserves" className="text-xs text-live mt-4 flex items-center uppercase tracking-wider hover:underline z-10">
            Optimize Drawdown <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        {/* Top Recommended Action */}
        <div className="bg-panel border border-gray-800 p-6 flex flex-col justify-between md:col-span-2 xl:col-span-2 bg-gradient-to-r from-panel to-[#1a140d] border-l-4 border-l-accent">
          <div className="text-sm uppercase tracking-wider text-accent flex items-center mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" /> Top Recommended Action
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Reroute via Cape of Good Hope (Saudi Aramco)</h3>
            <p className="text-sm text-gray-400">Hormuz partial closure anticipated. Alternative route secures 1.2M BPD with +$2.30 premium. 92% confidence.</p>
          </div>
          <Link to="/procurement" className="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-bold uppercase tracking-wider transition-colors self-start">
            Execute in Orchestrator <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Corridor Risk Table */}
        <div className="bg-panel border border-gray-800 xl:col-span-2 flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
             <div className="text-sm uppercase tracking-wider text-gray-400">Corridor Risk Matrix</div>
             <Link to="/risk-intelligence" className="text-xs text-live uppercase tracking-wider hover:underline">View Intelligence</Link>
          </div>
          <div className="p-0 flex-1">
             <DataTable value={corridors} loading={loading} stripedRows className="text-sm" emptyMessage="No corridors found.">
                <Column field="name" header="Corridor" className="font-bold py-3 px-4"></Column>
                <Column field="currentRiskScore" header="Risk Score" body={riskTemplate} className="py-3 px-4"></Column>
                <Column field="activeSignals.length" header="Active Signals" className="py-3 px-4 font-mono text-gray-400"></Column>
             </DataTable>
          </div>
        </div>

        {/* Active Alerts Feed */}
        <div className="bg-panel border border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
             <div className="text-sm uppercase tracking-wider text-gray-400">Active Signals</div>
             <Bell className="w-4 h-4 text-gray-400" />
          </div>
          <div className="p-4 flex-1 overflow-auto max-h-[300px] space-y-4">
            {signals.map((sig, idx) => (
              <div key={idx} className="flex space-x-3 border-l-2 border-accent pl-3">
                 <div>
                   <div className="text-xs text-gray-500 font-mono mb-1">{new Date(sig.timestamp).toLocaleTimeString()}</div>
                   <div className="text-sm">{sig.summary}</div>
                 </div>
              </div>
            ))}
            {signals.length === 0 && !loading && <div className="text-gray-500 text-sm">No active signals.</div>}
          </div>
        </div>
      </div>

      {/* Mini digital-twin map preview */}
      <div className="bg-panel border border-gray-800 h-48 relative overflow-hidden flex items-center justify-center group cursor-pointer">
         {/* A simple placeholder that links to the map. The full page will use leaflet. */}
         <div className="absolute inset-0 bg-gray-900 opacity-50 z-0"></div>
         {/* We can use a CSS grid pattern to simulate a map background */}
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0 pointer-events-none opacity-20"></div>
         <div className="z-10 text-center transition-transform group-hover:scale-105">
           <MapIcon className="w-8 h-8 text-live mx-auto mb-2" />
           <div className="uppercase tracking-widest font-bold">Open Digital Twin</div>
           <div className="text-xs text-gray-500 mt-1">Live AIS tracking & route visualization</div>
         </div>
         <Link to="/digital-twin" className="absolute inset-0 z-20"></Link>
      </div>
    </div>
  );
}
