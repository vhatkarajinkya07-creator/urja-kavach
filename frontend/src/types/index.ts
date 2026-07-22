export type UserRole = 
  | 'Energy Analyst'
  | 'Government Official'
  | 'Policy Maker'
  | 'Refinery Manager'
  | 'Logistics Manager'
  | 'Administrator';

export type NavTab = 
  | 'dashboard'
  | 'globe_map'
  | 'digital_twin'
  | 'multi_agent'
  | 'scenario_sim'
  | 'knowledge_graph'
  | 'procurement'
  | 'policy_advisor'
  | 'commodity_intel'
  | 'port_pipeline'
  | 'economic_impact'
  | 'mission_console'
  | 'executive_report'
  | 'settings';

export interface CommodityItem {
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface IntelligenceArticle {
  id: string;
  timestamp: string;
  source: string;
  title: string;
  summary: string;
  category: string;
  threat_level: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' | 'EMERGENCY';
  confidence: number;
  impact_radius_km: number;
  affected_countries: string[];
  affected_ports: string[];
  affected_routes: string[];
  affected_commodities: string[];
  historical_precedent: string;
  ai_recommendation: string;
}

export interface VesselItem {
  imo: string;
  name: string;
  flag: string;
  type: string;
  capacity_bbl: number;
  cargo: string;
  origin: string;
  destination: string;
  current_lat: number;
  current_lon: number;
  speed_knots: number;
  heading: number;
  eta: string;
  risk_score: number;
  risk_factors: string[];
  status: string;
}

export interface AgentStep {
  step: number;
  agent: string;
  agent_id: string;
  thought: string;
  evidence: string;
  assessment: string;
}

export interface DigitalTwinNode {
  id: string;
  name: string;
  type: 'SUPPLIER' | 'TRANSIT_LANE' | 'PORT' | 'STORAGE' | 'PIPELINE' | 'REFINERY' | 'CONSUMER';
  capacity?: string;
  demand?: string;
  status: 'NORMAL' | 'READY' | 'WARN' | 'CRITICAL';
  lat: number;
  lon: number;
}

export interface SupplierItem {
  id: string;
  country: string;
  company: string;
  crude_grade: string;
  price_per_bbl: number;
  freight_cost: number;
  transit_days: number;
  geopolitical_risk: string;
  political_alignment: string;
  carbon_intensity_kg: number;
  ai_score: number;
  recommendation: string;
}
