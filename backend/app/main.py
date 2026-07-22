from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, Optional

from app.services.telemetry import get_telemetry_summary, INTELLIGENCE_FEED, AIS_VESSELS, INDIAN_PORTS, INDIAN_REFINERIES
from app.services.multi_agent import AGENTS, generate_agent_debate
from app.services.digital_twin import DIGITAL_TWIN_NODES, simulate_disruption
from app.services.scenario_engine import PRESET_SCENARIOS, run_monte_carlo_simulation
from app.services.knowledge_graph import get_knowledge_graph_data
from app.services.procurement import SUPPLIERS, simulate_supplier_negotiation
from app.services.rag_search import search_intelligence_rag

app = FastAPI(
    title="URJA KAVACH AI Backend API",
    description="India's AI-Powered Energy Supply Chain Resilience Command Center Intelligence Engine",
    version="1.0.0"
)

# Enable CORS for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "system": "URJA KAVACH AI Command Center Backend",
        "location": "New Delhi / Strategic Control Hub",
        "version": "1.0.0"
    }

@app.get("/api/telemetry")
def get_telemetry():
    return get_telemetry_summary()

@app.get("/api/intelligence")
def get_intelligence():
    return {"articles": INTELLIGENCE_FEED}

@app.get("/api/agents/debate")
def get_agent_debate(crisis: str = "Hormuz_Standoff"):
    return {
        "agents": AGENTS,
        "debate_timeline": generate_agent_debate(crisis)
    }

@app.get("/api/digital-twin")
def get_digital_twin(disrupt_node: Optional[str] = None, severity: float = 75.0):
    if disrupt_node:
        return simulate_disruption(disrupt_node, severity)
    return simulate_disruption("node-sea-hor", 75.0)

@app.get("/api/scenario/monte-carlo")
def get_monte_carlo(scenario: str = "hormuz_blockade", severity: int = 80, duration: int = 14):
    return run_monte_carlo_simulation(scenario, severity, duration)

@app.get("/api/knowledge-graph")
def get_graph():
    return get_knowledge_graph_data()

@app.get("/api/procurement/suppliers")
def get_suppliers():
    return {"suppliers": SUPPLIERS}

@app.get("/api/procurement/negotiate")
def negotiate_supplier(supplier_id: str = "sup-uae", quantity: float = 2.0, contract_type: str = "Spot"):
    return simulate_supplier_negotiation(supplier_id, quantity, contract_type)

@app.get("/api/rag/search")
def search_rag(q: str = Query(..., min_length=1)):
    return search_intelligence_rag(q)

@app.get("/api/vessels")
def get_vessels():
    return {"vessels": AIS_VESSELS}

@app.get("/api/ports")
def get_ports():
    return {"ports": INDIAN_PORTS}

@app.get("/api/refineries")
def get_refineries():
    return {"refineries": INDIAN_REFINERIES}
