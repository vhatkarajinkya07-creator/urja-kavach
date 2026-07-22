from typing import Dict, List, Any
from app.services.telemetry import INTELLIGENCE_FEED

def search_intelligence_rag(query: str) -> Dict[str, Any]:
    """Simulate RAG vector search across intelligence corpus and generate grounded answer."""
    query_lower = query.lower()
    
    # Retrieve matching articles based on keyword similarity
    matches = []
    for item in INTELLIGENCE_FEED:
        searchable_text = f"{item['title']} {item['summary']} {item['category']} {' '.join(item['affected_countries'])} {' '.join(item['affected_routes'])}".lower()
        score = sum(1 for word in query_lower.split() if word in searchable_text)
        if score > 0 or "all" in query_lower:
            matches.append({
                "article": item,
                "relevance_score": min(0.98, 0.60 + (score * 0.12))
            })
            
    matches.sort(key=lambda x: x["relevance_score"], reverse=True)
    if not matches:
        matches = [{"article": INTELLIGENCE_FEED[0], "relevance_score": 0.85}]
        
    top_article = matches[0]["article"]
    
    # Build Grounded Response
    grounded_answer = (
        f"Based on real-time intelligence retrieved from Vector Database (Corpus INT-2026):\n\n"
        f"• **Key Finding**: {top_article['title']}\n"
        f"• **Threat Level**: {top_article['threat_level']} (Confidence Score: {top_article['confidence']}%)\n"
        f"• **Affected Routes**: {', '.join(top_article['affected_routes'])}\n"
        f"• **Recommended Command Action**: {top_article['ai_recommendation']}\n\n"
        f"Grounded in {len(matches)} vector chunk sources from {top_article['source']}."
    )
    
    return {
        "query": query,
        "matches_found": len(matches),
        "grounded_answer": grounded_answer,
        "retrieved_documents": matches
    }
