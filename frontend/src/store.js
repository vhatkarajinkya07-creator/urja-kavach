import { create } from 'zustand';

export const useStore = create((set) => ({
  overallRisk: 82,
  corridors: [],
  signals: [],
  scenarios: [],
  activeScenario: null,
  incidents: [],
  
  setOverallRisk: (val) => set({ overallRisk: val }),
  setCorridors: (data) => set({ corridors: data }),
  setSignals: (data) => set({ signals: data }),
  setScenarios: (data) => set({ scenarios: data }),
  setActiveScenario: (scenario) => set({ activeScenario: scenario }),
  setIncidents: (data) => set({ incidents: data }),
}));
