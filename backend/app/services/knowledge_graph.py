from typing import Dict, List, Any

# Graph Data linking Countries, Transit Lanes, Ports, Refineries, Tankers, Sanctions, Weather, and Sectors
GRAPH_NODES = [
    {"id": "c-iran", "label": "Iran", "category": "Country", "risk": "High", "size": 30},
    {"id": "c-saudi", "label": "Saudi Arabia", "category": "Country", "risk": "Medium", "size": 35},
    {"id": "c-russia", "label": "Russia", "category": "Country", "risk": "Medium", "size": 35},
    {"id": "c-india", "label": "India (Consumer Nation)", "category": "Country", "risk": "Low", "size": 45},
    
    {"id": "t-hormuz", "label": "Strait of Hormuz", "category": "Chokepoint", "risk": "High", "size": 40},
    {"id": "t-bab", "label": "Bab al-Mandab", "category": "Chokepoint", "risk": "High", "size": 38},
    {"id": "t-cape", "label": "Cape of Good Hope Route", "category": "Transit Lane", "risk": "Low", "size": 25},
    
    {"id": "p-mundra", "label": "Mundra Port (Gujarat)", "category": "Port", "risk": "Medium", "size": 30},
    {"id": "p-sikka", "label": "Sikka Terminal", "category": "Port", "risk": "Low", "size": 32},
    {"id": "p-paradip", "label": "Paradip Port", "category": "Port", "risk": "Low", "size": 28},
    
    {"id": "r-jamnagar", "label": "Reliance Jamnagar Refinery", "category": "Refinery", "risk": "Medium", "size": 42},
    {"id": "r-vadinar", "label": "Nayara Vadinar Refinery", "category": "Refinery", "risk": "Medium", "size": 30},
    
    {"id": "v-desh", "label": "MT DESH VISHAL (VLCC)", "category": "Tanker", "risk": "Medium", "size": 22},
    {"id": "v-swarna", "label": "MT SWARNA KAMAL (Suezmax)", "category": "Tanker", "risk": "High", "size": 22},
    
    {"id": "s-usofac", "label": "US OFAC Shadow Fleet Sanctions", "category": "Sanction", "risk": "High", "size": 26},
    {"id": "w-vayu", "label": "Cyclone Vayu-II", "category": "Weather System", "risk": "High", "size": 32},
    
    {"id": "sec-trans", "label": "Indian Logistics & Transport Sector", "category": "Economic Sector", "risk": "High", "size": 36},
    {"id": "sec-agri", "label": "Northern Agriculture Grid", "category": "Economic Sector", "risk": "Medium", "size": 34}
]

GRAPH_EDGES = [
    {"source": "c-iran", "target": "t-hormuz", "label": "Border / Naval Control", "weight": 0.95},
    {"source": "c-saudi", "target": "t-hormuz", "label": "Crude Export Flow", "weight": 0.85},
    {"source": "t-hormuz", "target": "v-swarna", "label": "Active Transit Corridor", "weight": 0.90},
    {"source": "v-swarna", "target": "p-mundra", "label": "Destination Discharge", "weight": 0.88},
    {"source": "p-mundra", "target": "r-jamnagar", "label": "Feedstock Pipeline Supply", "weight": 0.98},
    {"source": "r-jamnagar", "target": "sec-trans", "label": "Refined Diesel Output", "weight": 0.92},
    {"source": "sec-trans", "target": "sec-agri", "label": "Freight & Power Input", "weight": 0.80},
    
    {"source": "w-vayu", "target": "p-mundra", "label": "SPM Shutdown Vector", "weight": 0.90},
    {"source": "c-russia", "target": "s-usofac", "label": "Secondary Sanction Target", "weight": 0.85},
    {"source": "s-usofac", "target": "v-desh", "label": "Compliance Verification", "weight": 0.70},
    {"source": "t-bab", "target": "t-cape", "label": "Security Diversion Path", "weight": 0.75}
]

def get_knowledge_graph_data() -> Dict[str, Any]:
    return {
        "nodes": GRAPH_NODES,
        "edges": GRAPH_EDGES
    }
