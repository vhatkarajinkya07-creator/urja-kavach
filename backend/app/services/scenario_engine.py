import random
import math
from typing import Dict, List, Any

PRESET_SCENARIOS = {
    "hormuz_blockade": {
        "name": "Strait of Hormuz Total Blockade",
        "description": "Naval conflict or sea-mine deployment completely halts 2.2M bpd crude transits to West Coast India.",
        "default_severity": 85,
        "default_duration_days": 14,
        "affected_regions": ["Gujarat", "Maharashtra", "Punjab", "Haryana", "Delhi NCR"]
    },
    "redsea_attack": {
        "name": "Bab al-Mandab Red Sea Escalation",
        "description": "Anti-ship missile strike forces 100% of Russian & European crude imports to divert around Cape of Good Hope.",
        "default_severity": 65,
        "default_duration_days": 21,
        "affected_regions": ["Odisha", "Tamil Nadu", "Kerala", "West Bengal"]
    },
    "sau_refinery_fire": {
        "name": "Ras Tanura Processing Facility Outage",
        "description": "Explosion at Saudi Aramco mega-terminal cuts Saudi crude exports by 40% for 3 weeks.",
        "default_severity": 70,
        "default_duration_days": 18,
        "affected_regions": ["Karnataka", "Gujarat", "Maharashtra"]
    },
    "arabian_super_cyclone": {
        "name": "Category 5 Super Cyclone Hit on Gulf of Kutch",
        "description": "Severe Met-Ocean event damages Sikka & Mundra SPM moorings, disabling offloading for 10 days.",
        "default_severity": 90,
        "default_duration_days": 10,
        "affected_regions": ["Gujarat", "Rajasthan", "Punjab", "Haryana"]
    }
}

def run_monte_carlo_simulation(scenario_key: str = "hormuz_blockade", severity: int = 80, duration_days: int = 14) -> Dict[str, Any]:
    """Run 1,000 probabilistic iterations to model supply gap, price spike, and recovery curves."""
    
    num_iterations = 1000
    base_daily_deficit_bbl = (severity / 100.0) * 1_800_000
    
    results = []
    for i in range(num_iterations):
        # Apply stochastic normal noise (volatility factor)
        noise = random.gauss(1.0, 0.15)
        sim_loss_bbl = max(0, base_daily_deficit_bbl * duration_days * noise)
        sim_price_spike_pct = max(2.0, (severity * 0.35) * noise)
        sim_gdp_impact_pct = max(0.01, (sim_loss_bbl / 100_000_000) * 0.45 * noise)
        
        results.append({
            "loss_bbl": sim_loss_bbl,
            "price_spike": sim_price_spike_pct,
            "gdp_impact": sim_gdp_impact_pct
        })
    
    # Sort for P10, P50, P90 percentile calculations
    results.sort(key=lambda x: x["loss_bbl"])
    
    p10 = results[int(num_iterations * 0.10)]
    p50 = results[int(num_iterations * 0.50)]
    p90 = results[int(num_iterations * 0.90)]
    
    # Generate distribution histogram bins (20 bins)
    min_loss = results[0]["loss_bbl"] / 1e6
    max_loss = results[-1]["loss_bbl"] / 1e6
    bin_width = max(0.1, (max_loss - min_loss) / 15)
    
    histogram = []
    for b in range(15):
        bin_start = min_loss + (b * bin_width)
        bin_end = bin_start + bin_width
        count = sum(1 for r in results if bin_start <= (r["loss_bbl"] / 1e6) < bin_end)
        histogram.append({
            "range": f"{round(bin_start, 1)}-{round(bin_end, 1)}M bbl",
            "count": count,
            "probability_pct": round((count / num_iterations) * 100, 1)
        })
    
    # Day-by-day forecast curves (1 to duration_days + 7 recovery days)
    timeline_days = []
    cum_draw = 0
    for day in range(1, duration_days + 8):
        if day <= duration_days:
            daily_shortfall = (p50["loss_bbl"] / duration_days) / 1e6
            spr_buffer_released = min(daily_shortfall * 0.65, 0.9)
            net_deficit = max(0, daily_shortfall - spr_buffer_released)
        else:
            # Recovery phase
            recovery_factor = (day - duration_days) / 7.0
            daily_shortfall = ((p50["loss_bbl"] / duration_days) / 1e6) * (1 - recovery_factor)
            spr_buffer_released = daily_shortfall * 0.4
            net_deficit = max(0, daily_shortfall - spr_buffer_released)
            
        cum_draw += net_deficit
        timeline_days.append({
            "day": f"Day {day}",
            "gross_shortfall_mbbl": round(daily_shortfall, 2),
            "spr_release_mbbl": round(spr_buffer_released, 2),
            "net_deficit_mbbl": round(net_deficit, 2),
            "cumulative_deficit_mbbl": round(cum_draw, 2),
            "spr_days_left": round(38.5 - (cum_draw * 0.4), 1)
        })
        
    return {
        "scenario_info": PRESET_SCENARIOS.get(scenario_key, PRESET_SCENARIOS["hormuz_blockade"]),
        "parameters": {"severity": severity, "duration_days": duration_days, "iterations": num_iterations},
        "percentiles": {
            "P10_optimistic": {
                "total_crude_loss_mbbl": round(p10["loss_bbl"] / 1e6, 2),
                "brent_price_peak": round(84.5 * (1 + p10["price_spike"]/100), 2),
                "gdp_drag_pct": round(p10["gdp_impact"], 3)
            },
            "P50_expected": {
                "total_crude_loss_mbbl": round(p50["loss_bbl"] / 1e6, 2),
                "brent_price_peak": round(84.5 * (1 + p50["price_spike"]/100), 2),
                "gdp_drag_pct": round(p50["gdp_impact"], 3)
            },
            "P90_severe": {
                "total_crude_loss_mbbl": round(p90["loss_bbl"] / 1e6, 2),
                "brent_price_peak": round(84.5 * (1 + p90["price_spike"]/100), 2),
                "gdp_drag_pct": round(p90["gdp_impact"], 3)
            }
        },
        "distribution_histogram": histogram,
        "timeline_forecast": timeline_days
    }
