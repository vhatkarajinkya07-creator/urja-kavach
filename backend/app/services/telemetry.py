import random
from typing import Dict, List, Any

# Mock initial commodities
COMMODITIES = {
    "brent": {"name": "Brent Crude", "price": 84.50, "unit": "$/bbl", "change": 1.85, "trend": "up"},
    "wti": {"name": "WTI Crude", "price": 80.20, "unit": "$/bbl", "change": 1.42, "trend": "up"},
    "dubai": {"name": "Dubai Crude", "price": 82.90, "unit": "$/bbl", "change": 1.10, "trend": "up"},
    "natgas": {"name": "Natural Gas (Henry Hub)", "price": 2.45, "unit": "$/MMBtu", "change": -0.12, "trend": "down"},
    "lng_asia": {"name": "Asia LNG Spot", "price": 13.80, "unit": "$/MMBtu", "change": 0.65, "trend": "up"},
    "diesel_india": {"name": "India Retail Diesel", "price": 89.62, "unit": "₹/L", "change": 0.00, "trend": "stable"},
    "petrol_india": {"name": "India Retail Petrol", "price": 94.72, "unit": "₹/L", "change": 0.00, "trend": "stable"},
    "freight_vlcc": {"name": "VLCC Freight Rate (Arabian Gulf to West Coast India)", "price": 54500, "unit": "$/day", "change": 4200, "trend": "up"}
}

# National Risk & Security Status
NATIONAL_METRICS = {
    "energy_security_score": 78,
    "composite_risk_index": 64.2,  # 0 to 100 (high is risky)
    "spr_days_remaining": 38.5,    # Strategic Petroleum Reserve days
    "imports_at_risk_pct": 18.4,
    "critical_routes_alert": 2,
    "refineries_under_stress": 3,
    "threat_level": "ORANGE"       # GREEN, YELLOW, ORANGE, RED, EMERGENCY
}

# Geopolitical News Articles / Intelligence
INTELLIGENCE_FEED = [
    {
        "id": "INT-2026-0891",
        "timestamp": "2026-07-22 18:45 IST",
        "source": "Reuters Maritime & Intelligence",
        "title": "Houthi Missile Buildup Reported Near Bab al-Mandab Strait; Commercial Tankers Advisory Issued",
        "summary": "Satellite surveillance confirms enhanced anti-ship missile launcher deployments along Yemeni coastline. Combined Maritime Forces issue Code Orange advisory for crude tankers transiting Red Sea.",
        "category": "Military & Maritime Threat",
        "threat_level": "ORANGE",
        "confidence": 92,
        "impact_radius_km": 450,
        "affected_countries": ["Yemen", "Saudi Arabia", "India", "Egypt"],
        "affected_ports": ["Jeddah", "Salalah", "Mundra", "JNPT Mumbai"],
        "affected_routes": ["Red Sea - Suez Lane", "Bab al-Mandab Chokepoint"],
        "affected_commodities": ["Brent Crude", "Asia LNG Spot", "VLCC Freight"],
        "historical_precedent": "2024 Red Sea Shipping Crisis (40% rerouted via Cape of Good Hope)",
        "ai_recommendation": "Divert 3 scheduled Indian Oil VLCC tankers via Cape route; initiate emergency spot swap with Persian Gulf suppliers."
    },
    {
        "id": "INT-2026-0892",
        "timestamp": "2026-07-22 17:30 IST",
        "source": "Bloomberg Energy & Commodities",
        "title": "Strait of Hormuz Naval Patrol Friction Increases Between Regional Forces",
        "summary": "Iran Revolutionary Guard naval assets initiate unexpected live-fire exercise adjacent to eastbound shipping lanes. 14 Crude oil supertankers destined for Gujarat refineries holding position.",
        "category": "Geopolitical Conflict",
        "threat_level": "RED",
        "confidence": 88,
        "impact_radius_km": 300,
        "affected_countries": ["Iran", "UAE", "Oman", "India"],
        "affected_ports": ["Ras Tanura", "Fujairah", "Sikka/Jamnagar", "Vadinar"],
        "affected_routes": ["Strait of Hormuz Eastbound", "Oman Sea Transit"],
        "affected_commodities": ["Dubai Crude", "Urals Crude", "Heavy Fuel Oil"],
        "historical_precedent": "2019 Tanker Seizure Incident in Hormuz Strait",
        "ai_recommendation": "Activate Indian Navy escort protocol under Operation Sankalp; dispatch priority status query to Reliance Jamnagar & Nayara Vadinar."
    },
    {
        "id": "INT-2026-0893",
        "timestamp": "2026-07-22 16:15 IST",
        "source": "IMD Severe Weather Watch & Joint Typhoon Warning Center",
        "title": "Category 4 Cyclone 'Vayu-II' Rapidly Intensifying in North Arabian Sea",
        "summary": "Cyclonic storm carrying sustained winds of 145 knots tracking North-East toward Saurashtra coast. Mundra and Kandla ports halt offshore SPM (Single Point Mooring) crude discharge operations.",
        "category": "Weather Disruption",
        "threat_level": "ORANGE",
        "confidence": 95,
        "impact_radius_km": 600,
        "affected_countries": ["India", "Pakistan"],
        "affected_ports": ["Mundra Port", "Kandla Port", "Sikka Terminal", "Pipavav"],
        "affected_routes": ["Arabian Sea North Lane"],
        "affected_refineries": ["IOCL Gujarat", "Reliance Jamnagar", "HPCL-Mittal Bhatinda Pipeline"],
        "historical_precedent": "2021 Cyclone Tauktae Impact on West Coast Off-loading",
        "ai_recommendation": "Re-route 2 incoming crude vessels to Cochin Port SPM; draw 1.2M barrels from Mangalore SPR storage to supply refinery pipelines."
    },
    {
        "id": "INT-2026-0894",
        "timestamp": "2026-07-22 14:00 IST",
        "source": "US OFAC & EU Sanctions Intelligence Bulletin",
        "title": "Secondary Sanctions Tightened on Unregulated Dark Fleet Tankers Transporting Urals Crude",
        "summary": "US Treasury announces designation of 18 maritime shipping entities operating non-compliant shadow fleet vessels carrying Russian crude above $60 cap.",
        "category": "Sanctions & Policy",
        "threat_level": "YELLOW",
        "confidence": 91,
        "impact_radius_km": 1200,
        "affected_countries": ["Russia", "India", "China", "Panama"],
        "affected_ports": ["Novorossiysk", "Primorsk", "Paradip", "Visakhapatnam"],
        "affected_routes": ["Baltic Sea - Suez", "Black Sea Transit"],
        "affected_commodities": ["Urals Crude", "Sokol Crude"],
        "historical_precedent": "2023 G7 Price Cap Compliance Tightening",
        "ai_recommendation": "Shift 25% Russian imports from dark fleet brokers to direct G7-insured SOE tankers or expand spot purchases of West African Bonny Light."
    }
]

# AIS Vessels tracking data (Realistic oil tankers supplying India)
AIS_VESSELS = [
    {
        "imo": "IMO 9845214",
        "name": "MT DESH VISHAL",
        "flag": "India (SCI)",
        "type": "VLCC (Very Large Crude Carrier)",
        "capacity_bbl": 2000000,
        "cargo": "Arab Light Crude Oil",
        "origin": "Ras Tanura, Saudi Arabia",
        "destination": "Sikka SPM (Jamnagar Refinery), India",
        "current_lat": 24.12,
        "current_lon": 64.85,
        "speed_knots": 13.4,
        "heading": 85,
        "eta": "2026-07-24 06:00 IST",
        "risk_score": 38,
        "risk_factors": ["Arabian Sea Cyclone Alert"],
        "status": "Underway - On Schedule"
    },
    {
        "imo": "IMO 9712044",
        "name": "MT SWARNA KAMAL",
        "flag": "India (SCI)",
        "type": "Suezmax Tanker",
        "capacity_bbl": 1000000,
        "cargo": "Basrah Heavy Crude",
        "origin": "Basra Terminal, Iraq",
        "destination": "Mundra Port, India",
        "current_lat": 26.45,
        "current_lon": 56.10,
        "speed_knots": 8.2,
        "heading": 120,
        "eta": "2026-07-25 14:00 IST",
        "risk_score": 78,
        "risk_factors": ["Hormuz Patrol Standoff", "Congestion"],
        "status": "Slowed - High Security Zone"
    },
    {
        "imo": "IMO 9918451",
        "name": "MT ARCTIC EAGLE",
        "flag": "Liberia",
        "type": "Aframax Tanker",
        "capacity_bbl": 750000,
        "cargo": "Urals Crude Oil",
        "origin": "Novorossiysk, Russia",
        "destination": "Paradip Port, Odisha, India",
        "current_lat": 12.80,
        "current_lon": 45.20,
        "speed_knots": 0.5,
        "heading": 180,
        "eta": "2026-07-29 18:00 IST",
        "risk_score": 88,
        "risk_factors": ["Bab al-Mandab Warning", "Secondary Sanctions Review"],
        "status": "Holding Position - Security Re-route"
    },
    {
        "imo": "IMO 9654129",
        "name": "MT JAG LEELA",
        "flag": "India (Great Eastern)",
        "type": "VLCC",
        "capacity_bbl": 2100000,
        "cargo": "Upper Zakum Crude",
        "origin": "Jebel Dhanna, UAE",
        "destination": "Vadinar Offshore Terminal, India",
        "current_lat": 22.50,
        "current_lon": 68.20,
        "speed_knots": 14.1,
        "heading": 70,
        "eta": "2026-07-23 22:00 IST",
        "risk_score": 45,
        "risk_factors": ["Coastal Wave Swell"],
        "status": "Approaching Port"
    },
    {
        "imo": "IMO 9548712",
        "name": "MT OCEAN PIONEER",
        "flag": "Panama",
        "type": "LNG Carrier",
        "capacity_m3": 174000,
        "cargo": "Liquefied Natural Gas",
        "origin": "Ras Laffan, Qatar",
        "destination": "Dahej LNG Terminal, Gujarat, India",
        "current_lat": 23.80,
        "current_lon": 61.40,
        "speed_knots": 16.5,
        "heading": 92,
        "eta": "2026-07-24 11:30 IST",
        "risk_score": 22,
        "risk_factors": ["Normal Transit"],
        "status": "Underway - High Speed"
    }
]

# Major Indian Ports
INDIAN_PORTS = [
    {"id": "PORT-MUN", "name": "Mundra Port", "state": "Gujarat", "capacity_tpy": "150M", "congestion_idx": 74, "waiting_vessels": 8, "status": "CONGESTED", "spm_active": False},
    {"id": "PORT-SIK", "name": "Sikka SPM (Jamnagar)", "state": "Gujarat", "capacity_tpy": "180M", "congestion_idx": 45, "waiting_vessels": 4, "status": "OPERATIONAL", "spm_active": True},
    {"id": "PORT-VAD", "name": "Vadinar Terminal", "state": "Gujarat", "capacity_tpy": "90M", "congestion_idx": 52, "waiting_vessels": 3, "status": "OPERATIONAL", "spm_active": True},
    {"id": "PORT-JNP", "name": "JNPT Mumbai", "state": "Maharashtra", "capacity_tpy": "110M", "congestion_idx": 68, "waiting_vessels": 6, "status": "MODERATE", "spm_active": True},
    {"id": "PORT-PAR", "name": "Paradip Port", "state": "Odisha", "capacity_tpy": "140M", "congestion_idx": 38, "waiting_vessels": 2, "status": "OPERATIONAL", "spm_active": True},
    {"id": "PORT-MNG", "name": "Mangalore Port", "state": "Karnataka", "capacity_tpy": "85M", "congestion_idx": 25, "waiting_vessels": 1, "status": "OPTIMAL", "spm_active": True},
    {"id": "PORT-KOC", "name": "Cochin Port", "state": "Kerala", "capacity_tpy": "70M", "congestion_idx": 20, "waiting_vessels": 1, "status": "OPTIMAL", "spm_active": True}
]

# Major Indian Refineries
INDIAN_REFINERIES = [
    {"id": "REF-JAM", "name": "Reliance Jamnagar Refinery", "capacity_mbpd": 1.24, "current_run_rate": 96.5, "crude_stock_days": 14.2, "status": "NORMAL", "primary_crude": "Middle East / Heavy"},
    {"id": "REF-VAD", "name": "Nayara Vadinar Refinery", "capacity_mbpd": 0.40, "current_run_rate": 92.0, "crude_stock_days": 11.5, "status": "NORMAL", "primary_crude": "Russian Urals / Middle East"},
    {"id": "REF-IOC-GUJ", "name": "IOCL Koyali Gujarat", "capacity_mbpd": 0.36, "current_run_rate": 88.4, "crude_stock_days": 8.1, "status": "WATCH", "primary_crude": "Domestic / Import Blend"},
    {"id": "REF-IOC-PAR", "name": "IOCL Paradip Refinery", "capacity_mbpd": 0.30, "current_run_rate": 98.1, "crude_stock_days": 16.0, "status": "OPTIMAL", "primary_crude": "Russian / West African"},
    {"id": "REF-BPCL-MUM", "name": "BPCL Mumbai Refinery", "capacity_mbpd": 0.24, "current_run_rate": 91.0, "crude_stock_days": 9.4, "status": "NORMAL", "primary_crude": "Middle East Light"},
    {"id": "REF-HPCL-MNG", "name": "MRPL Mangalore", "capacity_mbpd": 0.30, "current_run_rate": 95.0, "crude_stock_days": 18.5, "status": "OPTIMAL", "primary_crude": "Persian Gulf / SPR Connected"}
]

def get_telemetry_summary():
    return {
        "commodities": COMMODITIES,
        "metrics": NATIONAL_METRICS,
        "intelligence": INTELLIGENCE_FEED,
        "vessels": AIS_VESSELS,
        "ports": INDIAN_PORTS,
        "refineries": INDIAN_REFINERIES
    }
