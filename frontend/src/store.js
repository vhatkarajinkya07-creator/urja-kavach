import { create } from 'zustand';

const initialCorridors = [
  { _id: 'c1', name: 'Strait of Hormuz', currentRiskScore: 82, history30d: [60, 62, 65, 70, 75, 82], activeSignals: ['High tension in Persian Gulf', 'Naval drills'] },
  { _id: 'c2', name: 'Red Sea / Bab-el-Mandeb', currentRiskScore: 65, history30d: [50, 52, 58, 62, 65], activeSignals: ['Houthi activity reported'] },
  { _id: 'c3', name: 'Malacca Strait', currentRiskScore: 42, history30d: [35, 38, 40, 42], activeSignals: ['Congestion warning'] },
  { _id: 'c4', name: 'Suez Canal', currentRiskScore: 55, history30d: [45, 48, 50, 55], activeSignals: ['Dredging backlog'] }
];

const initialSignals = [
  { timestamp: new Date().toISOString(), summary: 'US sanctions announcement on regional shipping entities.' },
  { timestamp: new Date(Date.now() - 3600000).toISOString(), summary: 'Naval escort requested for tanker convoy entering Hormuz.' },
  { timestamp: new Date(Date.now() - 7200000).toISOString(), summary: 'Insurance premiums raised by 15% for Red Sea transit.' }
];

export const useStore = create((set) => ({
  overallRisk: 82,
  corridors: initialCorridors,
  signals: initialSignals,
  scenarios: [],
  activeScenario: null,
  incidents: [],
  
  setOverallRisk: (val) => set({ overallRisk: val }),
  setCorridors: (data) => set({ corridors: Array.isArray(data) && data.length > 0 ? data : initialCorridors }),
  setSignals: (data) => set({ signals: Array.isArray(data) && data.length > 0 ? data : initialSignals }),
  setScenarios: (data) => set({ scenarios: data }),
  setActiveScenario: (scenario) => set({ activeScenario: scenario }),
  setIncidents: (data) => set({ incidents: data }),
}));

