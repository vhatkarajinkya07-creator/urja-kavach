import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Landing() {
  const [imports, setImports] = useState(0);
  const [hormuz, setHormuz] = useState(0);
  const [buffer, setBuffer] = useState(0);

  useEffect(() => {
    // Animate numbers on load
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setImports(Math.min(88, Math.floor((88 * currentStep) / steps)));
      setHormuz(Math.min(45, Math.floor((45 * currentStep) / steps)));
      setBuffer(Math.min(9.5, (9.5 * currentStep) / steps));
      
      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] z-0 pointer-events-none opacity-50" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <Shield className="w-16 h-16 text-accent" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-condensed font-bold mb-6 tracking-tight text-white leading-none">
          <span className="text-accent">{imports}%</span> IMPORTED. <br/>
          <span className="text-accent">{hormuz}%</span> ONE STRAIT. <br/>
          <span className="text-live">{buffer.toFixed(1)}</span> DAYS BUFFER.
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Economies without automated rerouting and demand-management capability take an average of 47 days longer to stabilise supply after a geopolitical shock.
        </p>
        
        <Link 
          to="/dashboard"
          className="inline-flex items-center px-8 py-4 bg-accent hover:bg-yellow-600 text-black font-bold rounded-sm transition-all uppercase tracking-widest text-sm"
        >
          Enter Command Center
          <ChevronRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Live Ticker Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-panel border-t border-gray-800 flex items-center overflow-hidden z-10">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] items-center space-x-12 text-sm font-mono text-gray-400">
          <div className="flex items-center"><Activity className="w-4 h-4 mr-2 text-live"/> BRENT CRUDE: $85.50/BBL (+2.3%)</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-accent mr-2"/> HORMUZ TRANSIT: 21M BPD (NORMAL)</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-live mr-2"/> SPR COVER: 9.5 DAYS</div>
          <div className="flex items-center"><Activity className="w-4 h-4 mr-2 text-live"/> BRENT CRUDE: $85.50/BBL (+2.3%)</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-accent mr-2"/> HORMUZ TRANSIT: 21M BPD (NORMAL)</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-live mr-2"/> SPR COVER: 9.5 DAYS</div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
