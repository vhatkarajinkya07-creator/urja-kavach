import type { 
  IntelligenceArticle, 
  AgentStep, 
  SupplierItem 
} from '../types';

const API_BASE = 'http://localhost:8000/api';

export async function fetchTelemetry() {
  try {
    const res = await fetch(`${API_BASE}/telemetry`);
    if (!res.ok) throw new Error('Failed to fetch telemetry');
    return await res.json();
  } catch (err) {
    console.warn('Backend connection fallback to initial data:', err);
    return null;
  }
}

export async function fetchIntelligenceFeed(): Promise<IntelligenceArticle[]> {
  try {
    const res = await fetch(`${API_BASE}/intelligence`);
    if (!res.ok) throw new Error('Failed to fetch intelligence');
    const data = await res.json();
    return data.articles;
  } catch (err) {
    console.warn('Fallback to static intelligence feed:', err);
    return [];
  }
}

export async function fetchAgentDebate(crisis: string = 'Hormuz_Standoff'): Promise<AgentStep[]> {
  try {
    const res = await fetch(`${API_BASE}/agents/debate?crisis=${encodeURIComponent(crisis)}`);
    if (!res.ok) throw new Error('Failed to fetch agent debate');
    const data = await res.json();
    return data.debate_timeline;
  } catch (err) {
    console.warn('Fallback agent debate:', err);
    return [];
  }
}

export async function fetchDigitalTwinSimulation(disruptNode: string, severity: number) {
  try {
    const res = await fetch(`${API_BASE}/digital-twin?disrupt_node=${encodeURIComponent(disruptNode)}&severity=${severity}`);
    if (!res.ok) throw new Error('Failed to run digital twin simulation');
    return await res.json();
  } catch (err) {
    console.warn('Fallback digital twin simulation:', err);
    return null;
  }
}

export async function fetchMonteCarlo(scenario: string, severity: number, duration: number) {
  try {
    const res = await fetch(`${API_BASE}/scenario/monte-carlo?scenario=${encodeURIComponent(scenario)}&severity=${severity}&duration=${duration}`);
    if (!res.ok) throw new Error('Failed to fetch Monte Carlo simulation');
    return await res.json();
  } catch (err) {
    console.warn('Fallback Monte Carlo:', err);
    return null;
  }
}

export async function fetchKnowledgeGraph() {
  try {
    const res = await fetch(`${API_BASE}/knowledge-graph`);
    if (!res.ok) throw new Error('Failed to fetch knowledge graph');
    return await res.json();
  } catch (err) {
    console.warn('Fallback Knowledge Graph:', err);
    return null;
  }
}

export async function fetchSuppliers(): Promise<SupplierItem[]> {
  try {
    const res = await fetch(`${API_BASE}/procurement/suppliers`);
    if (!res.ok) throw new Error('Failed to fetch suppliers');
    const data = await res.json();
    return data.suppliers;
  } catch (err) {
    console.warn('Fallback suppliers:', err);
    return [];
  }
}

export async function searchRagIntelligence(query: string) {
  try {
    const res = await fetch(`${API_BASE}/rag/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to run RAG search');
    return await res.json();
  } catch (err) {
    console.warn('Fallback RAG search:', err);
    return null;
  }
}
