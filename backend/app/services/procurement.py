from typing import List, Dict, Any

SUPPLIERS = [
    {
        "id": "sup-saudi",
        "country": "Saudi Arabia",
        "company": "Saudi Aramco",
        "crude_grade": "Arab Light / Arab Heavy",
        "price_per_bbl": 84.50,
        "freight_cost": 3.80,
        "transit_days": 4.5,
        "geopolitical_risk": "Medium (Hormuz Dependent)",
        "political_alignment": "High (Long-Term Term Contract)",
        "carbon_intensity_kg": 18.2,
        "ai_score": 89,
        "recommendation": "Maintain baseline long-term contract volumes."
    },
    {
        "id": "sup-russia",
        "country": "Russia",
        "company": "Rosneft / Gazprom Neft",
        "crude_grade": "Urals / Sokol",
        "price_per_bbl": 71.20,  # Discounted
        "freight_cost": 8.50,
        "transit_days": 24.0,     # Rerouted via Suez / Cape
        "geopolitical_risk": "High (Sanctions / Dark Fleet)",
        "political_alignment": "Strategic Partnership",
        "carbon_intensity_kg": 22.5,
        "ai_score": 84,
        "recommendation": "Procure via non-sanctioned SOE vessels only."
    },
    {
        "id": "sup-iraq",
        "country": "Iraq",
        "company": "SOMO",
        "crude_grade": "Basrah Medium / Heavy",
        "price_per_bbl": 81.80,
        "freight_cost": 4.10,
        "transit_days": 5.0,
        "geopolitical_risk": "Medium-High",
        "political_alignment": "High",
        "carbon_intensity_kg": 24.1,
        "ai_score": 81,
        "recommendation": "Optimal for IOCL Paradip & BPCL refineries."
    },
    {
        "id": "sup-uae",
        "country": "UAE",
        "company": "ADNOC",
        "crude_grade": "Murban / Upper Zakum",
        "price_per_bbl": 85.10,
        "freight_cost": 3.20,
        "transit_days": 3.8,
        "geopolitical_risk": "Low-Medium (Fujairah bypass available)",
        "political_alignment": "CEPA Free Trade Agreement",
        "carbon_intensity_kg": 16.4,
        "ai_score": 94,
        "recommendation": "RECOMMENDED TOP CHOICE for immediate spot swap."
    },
    {
        "id": "sup-nigeria",
        "country": "Nigeria",
        "company": "NNPC",
        "crude_grade": "Bonny Light / Forcados",
        "price_per_bbl": 87.20,
        "freight_cost": 5.80,
        "transit_days": 18.5,
        "geopolitical_risk": "Low (Bypasses all Middle East Chokepoints)",
        "political_alignment": "Moderate",
        "carbon_intensity_kg": 19.8,
        "ai_score": 88,
        "recommendation": "Ideal strategic hedge against Hormuz escalation."
    },
    {
        "id": "sup-usa",
        "country": "United States",
        "company": "Chevron / ExxonMobil",
        "crude_grade": "WTI Midland",
        "price_per_bbl": 82.10,
        "freight_cost": 7.90,
        "transit_days": 28.0,
        "geopolitical_risk": "Very Low",
        "political_alignment": "High",
        "carbon_intensity_kg": 14.8,
        "ai_score": 82,
        "recommendation": "Suitable for long-term strategic diversification."
    }
]

def simulate_supplier_negotiation(supplier_id: str, quantity_mbbl: float = 2.0, contract_type: str = "Spot") -> Dict[str, Any]:
    supplier = next((s for s in SUPPLIERS if s["id"] == supplier_id), SUPPLIERS[3])
    
    # Calculate discount & landed cost
    discount = 1.5 if contract_type == "Term (12 Month)" else 0.0
    final_barrel_price = supplier["price_per_bbl"] - discount
    total_landed_cost_m = round((final_barrel_price + supplier["freight_cost"]) * quantity_mbbl, 2)
    
    tradeoffs = {
        "pros": [
            f"Secures {quantity_mbbl}M barrels of high-yield {supplier['crude_grade']}.",
            f"Delivery ETA within {supplier['transit_days']} days.",
            f"Alignment score with Indian refinery metallurgy: 94/100."
        ],
        "cons": [
            f"Geopolitical risk status: {supplier['geopolitical_risk']}.",
            f"Freight & transit overhead: ${supplier['freight_cost']}/bbl."
        ],
        "ai_verdict": f"Proceed with {supplier['company']} offer under Rupee-Dirham / Rupee-Rouble settlement mechanism to eliminate FX volatility."
    }
    
    return {
        "supplier": supplier,
        "terms": {
            "quantity_mbbl": quantity_mbbl,
            "contract_type": contract_type,
            "final_barrel_price": final_barrel_price,
            "total_landed_cost_usd_m": total_landed_cost_m,
            "estimated_arrival_days": supplier["transit_days"]
        },
        "tradeoffs": tradeoffs
    }
