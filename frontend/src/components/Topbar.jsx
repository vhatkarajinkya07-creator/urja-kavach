import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { AlertTriangle } from 'lucide-react';

export default function Topbar() {
  const overallRisk = useStore(state => state.overallRisk);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-panel border-b border-gray-800 flex items-center justify-between px-6 ml-64 fixed top-0 right-0 left-0 z-10">
      <div className="flex items-center">
        <div className="text-gray-400 text-sm uppercase tracking-wider font-mono">
          System Status: <span className="text-live ml-1">Online</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center px-4 py-1.5 bg-gray-900 rounded border border-gray-800">
          <AlertTriangle className={`w-4 h-4 mr-2 ${overallRisk > 75 ? 'text-accent' : 'text-gray-400'}`} />
          <div className="text-sm">
            <span className="text-gray-400 mr-2 uppercase text-xs">Global Risk</span>
            <span className={`font-mono font-bold ${overallRisk > 75 ? 'text-accent' : 'text-white'}`}>
              {overallRisk}/100
            </span>
          </div>
        </div>
        
        <div className="text-gray-400 font-mono text-sm">
          {time.toISOString().replace('T', ' ').substring(0, 19)} UTC
        </div>
      </div>
    </header>
  );
}
