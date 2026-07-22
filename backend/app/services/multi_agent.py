from typing import List, Dict, Any

AGENTS = [
    {"id": "agent-news", "name": "News Intelligence Agent", "avatar": "📰", "role": "Extraction & RAG Parsing", "status": "Active"},
    {"id": "agent-shipping", "name": "Shipping Intelligence Agent", "avatar": "🚢", "role": "AIS Tanker & Port Telemetry", "status": "Active"},
    {"id": "agent-commodity", "name": "Commodity Intelligence Agent", "avatar": "📈", "role": "Crude, Freight & FX Volatility", "status": "Active"},
    {"id": "agent-weather", "name": "Weather Intelligence Agent", "avatar": "🌀", "role": "Met-Ocean & Cyclone Tracking", "status": "Active"},
    {"id": "agent-geopolitics", "name": "Geopolitical Conflict Agent", "avatar": "🌐", "role": "Sanctions & Naval Warfare Monitoring", "status": "Active"},
    {"id": "agent-risk", "name": "Composite Risk Assessment Agent", "avatar": "🛡️", "role": "National Energy Security Index", "status": "Active"},
    {"id": "agent-scenario", "name": "Scenario Simulation Agent", "avatar": "🎰", "role": "Monte Carlo Disruption Modeling", "status": "Active"},
    {"id": "agent-procurement", "name": "Procurement Copilot Agent", "avatar": "💼", "role": "Supplier & Route Optimization", "status": "Active"},
    {"id": "agent-policy", "name": "Policy & SPR Advisor Agent", "avatar": "🏛️", "role": "Strategic Reserve & Government SOPs", "status": "Active"},
    {"id": "agent-econ", "name": "Economic Impact Agent", "avatar": "📊", "role": "GDP, Inflation & Fuel Deficit Forecast", "status": "Active"},
    {"id": "agent-orchestrator", "name": "URJA Orchestrator AI", "avatar": "🧠", "role": "Consensus Synthesis & Strategic Directive", "status": "Leader"}
]

def generate_agent_debate(crisis_type: str = "Hormuz_Standoff") -> List[Dict[str, Any]]:
    """Simulate real-time 10-Agent Collaborative Reasoning & Debate Process"""
    
    debate_timeline = [
        {
            "step": 1,
            "agent": "News Intelligence Agent",
            "agent_id": "agent-news",
            "thought": "Ingested 14 satellite advisories and naval radio traffic from Arabian Gulf. Confirmed live-fire exercises adjacent to Eastbound Hormuz shipping lanes.",
            "evidence": "Reuters Advisory INT-2026-0892 | 88% confidence score.",
            "assessment": "High probability of transit slowdowns for Middle Eastern crude vessels."
        },
        {
            "step": 2,
            "agent": "Shipping Intelligence Agent",
            "agent_id": "agent-shipping",
            "thought": "Cross-referenced live AIS data. 14 crude tankers carrying 24.5 Million barrels of crude destined for Sikka (Jamnagar) and Mundra are currently idling or holding position near Fujairah anchorage.",
            "evidence": "AIS MT SWARNA KAMAL (IMO 9712044) & 13 other vessels at 0-2 knots.",
            "assessment": "Expected delivery delay to West Coast India: +48 to +96 hours."
        },
        {
            "step": 3,
            "agent": "Commodity Intelligence Agent",
            "agent_id": "agent-commodity",
            "thought": "Brent Crude surged +$2.85/bbl in European trading. Persian Gulf VLCC freight rates jumped 18% to $54,500/day. War-risk insurance premiums for Strait of Hormuz transits increased by +350 bps.",
            "evidence": "ICE Futures & Lloyds Marine Underwriters Feed.",
            "assessment": "Landed cost per barrel at Jamnagar projected to rise by +6.2%."
        },
        {
            "step": 4,
            "agent": "Weather Intelligence Agent",
            "agent_id": "agent-weather",
            "thought": "Evaluating Arabian Sea sea-state. Category 4 Cyclone 'Vayu-II' in North Arabian Sea is causing wave swells of 5.8m at Mundra SPM, preventing offshore discharge for the next 72 hours.",
            "evidence": "IMD Severe Met-Ocean Bulletin.",
            "assessment": "Compound bottleneck: Even diverted vessels cannot offload at Gujarat SPMs until July 25."
        },
        {
            "step": 5,
            "agent": "Geopolitical Conflict Agent",
            "agent_id": "agent-geopolitics",
            "thought": "Analyzing diplomatic communications and military posture. US 5th Fleet and Indian Navy (Op Sankalp) have initiated destroyer escorts. Historical precedent indicates standoff resolves or stabilizes within 7-10 days without total closure.",
            "evidence": "2019 Hormuz Tanker Standoff Pattern Matching.",
            "assessment": "Probability of complete long-term closure: 15%. Probability of temporary operational disruption (5-8 days): 82%."
        },
        {
            "step": 6,
            "agent": "Composite Risk Assessment Agent",
            "agent_id": "agent-risk",
            "thought": "Recalculating India Composite Energy Risk Index using weighted multi-factor matrix: Geopolitical (35%), Maritime (25%), Commodity (20%), Weather (10%), SPR Buffer (10%).",
            "evidence": "Composite Algorithm v4.2.",
            "assessment": "National Risk Score escalates from 48.2 (Yellow) to 64.2 (Orange)."
        },
        {
            "step": 7,
            "agent": "Scenario Simulation Agent",
            "agent_id": "agent-scenario",
            "thought": "Ran 1,000 Monte Carlo iterations of 7-day Hormuz slowdown + SPM Weather lock. P50 national crude stock draw: 1.85 Million bbl/day. Jamnagar & Vadinar refinery run rates drop from 96% to 81% by Day 5.",
            "evidence": "Monte Carlo Engine Simulation Run #8902.",
            "assessment": "P90 worst-case shortfall: 12.4 Million barrels over 14 days."
        },
        {
            "step": 8,
            "agent": "Procurement Copilot Agent",
            "agent_id": "agent-procurement",
            "thought": "Evaluated spot crude availability from non-Hormuz origins. Recommend immediate spot procurement of 3 cargoes of West African Bonny Light & 2 cargoes of Russian Urals loading at Novorossiysk, routed via Cape.",
            "evidence": "Global Crude Spot Availability Matrix.",
            "assessment": "Supplier score ranking: 1. Nigeria NNPC (Score 92), 2. Rosneft (Score 86), 3. Brazil Petrobras (Score 84)."
        },
        {
            "step": 9,
            "agent": "Policy & SPR Advisor Agent",
            "agent_id": "agent-policy",
            "thought": "Recommend Cabinet Directive for Strategic Petroleum Reserve (SPR) release: Authorized drawdown of 1.5 Million barrels from Mangalore & Visakhapatnam underground rock caverns directly into ISPRL pipeline network.",
            "evidence": "Ministry of Petroleum Crisis SOP - Clause 4B.",
            "assessment": "Prevents refinery starvation without expanding spot market panic purchases."
        },
        {
            "step": 10,
            "agent": "Economic Impact Agent",
            "agent_id": "agent-econ",
            "thought": "Simulated macroeconomic cascade. With SPR buffer activated, domestic retail petrol/diesel prices remain pegged. Projected quarterly GDP impact contained to -0.04%. Transport inflation risk mitigated.",
            "evidence": "Macro Energy-Economy Dynamic Model.",
            "assessment": "Zero state-wise retail fuel shortage if SPR release begins within 36 hours."
        },
        {
            "step": 11,
            "agent": "URJA Orchestrator AI",
            "agent_id": "agent-orchestrator",
            "thought": "SYNTHESIS COMPLETE: Consensus reached among 10 Agents with 94.2% agreement index.",
            "evidence": "Grounded AI Evidence Chain #AC-9901.",
            "assessment": "FINAL DIRECTIVE: 1) Execute Indian Navy Op Sankalp Escort for MT SWARNA KAMAL. 2) Release 1.5M bbl from Mangalore SPR. 3) Divert 2 VLCC vessels to Cochin Port SPM. 4) Issue spot tender for 3M bbl West African crude."
        }
    ]
    return debate_timeline
