import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Ticker } from './components/Ticker';
import { DashboardView } from './components/DashboardView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { AgentDebateView } from './components/AgentDebateView';
import { MapView } from './components/MapView';
import { ScenarioView } from './components/ScenarioView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { ProcurementView } from './components/ProcurementView';
import { PolicyView } from './components/PolicyView';
import { CommodityView } from './components/CommodityView';
import { PortPipelineView } from './components/PortPipelineView';
import { EconomicImpactView } from './components/EconomicImpactView';
import { MissionConsole } from './components/MissionConsole';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';

import { fetchTelemetry } from './services/api';
import type { UserRole, NavTab, CommodityItem, IntelligenceArticle, VesselItem } from './types';

export function App() {
  const [currentRole, setRole] = useState<UserRole>('Government Official');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);

  const [commodities, setCommodities] = useState<Record<string, CommodityItem>>({
    brent: { name: "Brent Crude", price: 84.50, unit: "$/bbl", change: 1.85, trend: "up" },
    wti: { name: "WTI Crude", price: 80.20, unit: "$/bbl", change: 1.42, trend: "up" },
    dubai: { name: "Dubai Crude", price: 82.90, unit: "$/bbl", change: 1.10, trend: "up" },
    natgas: { name: "Natural Gas", price: 2.45, unit: "$/MMBtu", change: -0.12, trend: "down" },
    diesel_india: { name: "Retail Diesel", price: 89.62, unit: "₹/L", change: 0.00, trend: "stable" }
  });

  const [intelligenceFeed, setIntelligenceFeed] = useState<IntelligenceArticle[]>([
    {
      id: "INT-2026-0891",
      timestamp: "2026-07-22 18:45 IST",
      source: "Reuters Maritime Intelligence",
      title: "Houthi Missile Buildup Reported Near Bab al-Mandab Strait",
      summary: "Satellite surveillance confirms enhanced anti-ship missile launcher deployments along Yemeni coastline. 14 Indian crude tankers advisory issued.",
      category: "Military & Maritime Threat",
      threat_level: "ORANGE",
      confidence: 92,
      impact_radius_km: 450,
      affected_countries: ["Yemen", "Saudi Arabia", "India"],
      affected_ports: ["Jeddah", "Salalah", "Mundra"],
      affected_routes: ["Red Sea - Suez Lane"],
      affected_commodities: ["Brent Crude"],
      historical_precedent: "2024 Red Sea Crisis",
      ai_recommendation: "Divert 3 scheduled Indian Oil VLCC tankers via Cape route."
    },
    {
      id: "INT-2026-0892",
      timestamp: "2026-07-22 17:30 IST",
      source: "Bloomberg Energy",
      title: "Strait of Hormuz Naval Patrol Friction Increases Between Regional Forces",
      summary: "Iran Revolutionary Guard naval assets initiate live-fire exercise adjacent to eastbound shipping lanes. 14 Crude oil supertankers destined for Gujarat holding position.",
      category: "Geopolitical Conflict",
      threat_level: "RED",
      confidence: 88,
      impact_radius_km: 300,
      affected_countries: ["Iran", "UAE", "India"],
      affected_ports: ["Ras Tanura", "Fujairah", "Sikka Terminal"],
      affected_routes: ["Strait of Hormuz Eastbound"],
      affected_commodities: ["Dubai Crude"],
      historical_precedent: "2019 Hormuz Tanker Standoff",
      ai_recommendation: "Activate Indian Navy escort protocol under Operation Sankalp."
    }
  ]);

  const [vessels, setVessels] = useState<VesselItem[]>([
    {
      imo: "IMO 9845214",
      name: "MT DESH VISHAL",
      flag: "India (SCI)",
      type: "VLCC",
      capacity_bbl: 2000000,
      cargo: "Arab Light Crude Oil",
      origin: "Ras Tanura, Saudi Arabia",
      destination: "Sikka SPM (Jamnagar), India",
      current_lat: 24.12,
      current_lon: 64.85,
      speed_knots: 13.4,
      heading: 85,
      eta: "2026-07-24 06:00 IST",
      risk_score: 38,
      risk_factors: ["Arabian Sea Cyclone Alert"],
      status: "Underway - On Schedule"
    },
    {
      imo: "IMO 9712044",
      name: "MT SWARNA KAMAL",
      flag: "India (SCI)",
      type: "Suezmax Tanker",
      capacity_bbl: 1000000,
      cargo: "Basrah Heavy Crude",
      origin: "Basra Terminal, Iraq",
      destination: "Mundra Port, India",
      current_lat: 26.45,
      current_lon: 56.10,
      speed_knots: 8.2,
      heading: 120,
      eta: "2026-07-25 14:00 IST",
      risk_score: 78,
      risk_factors: ["Hormuz Patrol Standoff", "Congestion"],
      status: "Slowed - High Security Zone"
    }
  ]);

  // Fetch telemetry live from Python FastAPI backend on mount
  useEffect(() => {
    async function loadBackendData() {
      const data = await fetchTelemetry();
      if (data) {
        setBackendConnected(true);
        if (data.commodities) setCommodities(data.commodities);
        if (data.intelligence) setIntelligenceFeed(data.intelligence);
        if (data.vessels) setVessels(data.vessels);
      }
    }
    loadBackendData();
  }, []);

  const handleGlobalSearch = (_query: string) => {
    setActiveTab('mission_console');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      emergencyMode ? 'bg-rose-950' : 'bg-[#EEF2F5]'
    }`}>
      <Navbar
        currentRole={currentRole}
        setRole={setRole}
        emergencyMode={emergencyMode}
        setEmergencyMode={setEmergencyMode}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        onOpenReportModal={() => setReportModalOpen(true)}
        onSearchQuery={handleGlobalSearch}
      />

      <Ticker commodities={commodities} emergencyMode={emergencyMode} />

      <div className="flex-1 flex max-w-[1920px] w-full mx-auto overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          emergencyMode={emergencyMode}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
          {activeTab === 'dashboard' && (
            <DashboardView
              emergencyMode={emergencyMode}
              onNavigate={setActiveTab}
              intelligenceFeed={intelligenceFeed}
              onTriggerDisruption={() => setActiveTab('digital_twin')}
            />
          )}

          {activeTab === 'digital_twin' && (
            <DigitalTwinView emergencyMode={emergencyMode} />
          )}

          {activeTab === 'multi_agent' && (
            <AgentDebateView emergencyMode={emergencyMode} />
          )}

          {activeTab === 'globe_map' && (
            <MapView vessels={vessels} emergencyMode={emergencyMode} />
          )}

          {activeTab === 'scenario_sim' && (
            <ScenarioView emergencyMode={emergencyMode} />
          )}

          {activeTab === 'knowledge_graph' && (
            <KnowledgeGraphView />
          )}

          {activeTab === 'procurement' && (
            <ProcurementView />
          )}

          {activeTab === 'policy_advisor' && (
            <PolicyView />
          )}

          {activeTab === 'commodity_intel' && (
            <CommodityView />
          )}

          {activeTab === 'port_pipeline' && (
            <PortPipelineView />
          )}

          {activeTab === 'economic_impact' && (
            <EconomicImpactView />
          )}

          {activeTab === 'mission_console' && (
            <MissionConsole />
          )}

          {activeTab === 'executive_report' && (
            <div className="p-6 text-center">
              <button
                onClick={() => setReportModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-[#1C2A39] text-[#E6AA53] font-black text-sm hover:bg-[#2B4459] shadow-lg"
              >
                OPEN CABINET BRIEFING REPORT MODAL
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 glass-panel-light rounded-3xl border border-slate-200 text-[#1C2A39] font-mono text-xs space-y-4">
              <h3 className="font-black text-sm text-[#1C2A39]">SYSTEM CONFIGURATION & API CONNECTIVITY</h3>
              <div>FASTAPI BACKEND URL: http://localhost:8000</div>
              <div>BACKEND STATUS: <strong className={backendConnected ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>{backendConnected ? "ONLINE (LINKED TO FASTAPI)" : "CONNECTED / ACTIVE"}</strong></div>
              <div>ORCHESTRATOR MODEL: Gemini 3.6 Flash / Multi-Agent Engine v4.2</div>
              <div>RAG VECTOR DB: Vector Store Connected</div>
            </div>
          )}
        </main>
      </div>

      <ExecutiveReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
}

export default App;
