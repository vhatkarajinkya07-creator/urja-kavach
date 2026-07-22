import { Link, useLocation } from 'react-router-dom';
import { Home, ShieldAlert, Activity, GitCommit, Layers, Map, Clock, Database } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Command Center', path: '/dashboard', icon: Home },
    { name: 'Risk Intelligence', path: '/risk-intelligence', icon: ShieldAlert },
    { name: 'Scenarios', path: '/scenarios', icon: Activity },
    { name: 'Procurement', path: '/procurement', icon: GitCommit },
    { name: 'Reserves', path: '/reserves', icon: Layers },
    { name: 'Digital Twin', path: '/digital-twin', icon: Map },
    { name: 'Response Log', path: '/response-log', icon: Clock },
    { name: 'Architecture', path: '/architecture', icon: Database },
  ];

  return (
    <aside className="w-64 bg-panel border-r border-gray-800 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-condensed tracking-wider font-bold text-accent uppercase">
          Urja Kavach
        </h1>
        <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Command Center</div>
      </div>
      <nav className="flex-1 py-4">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-live border-r-2 border-live'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
