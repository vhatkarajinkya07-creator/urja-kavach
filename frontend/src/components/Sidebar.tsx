import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  GitFork, 
  Bot, 
  Sliders, 
  Share2, 
  ShoppingBag, 
  Landmark, 
  TrendingUp, 
  Anchor, 
  BarChart3, 
  Terminal, 
  FileCheck, 
  Settings
} from 'lucide-react';
import type { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  emergencyMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, emergencyMode }) => {
  const menuItems = [
    { id: 'dashboard' as NavTab, label: 'Main Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'digital_twin' as NavTab, label: 'Digital Twin (USP)', icon: GitFork, badge: 'Flagship' },
    { id: 'globe_map' as NavTab, label: 'AIS & Geospatial Map', icon: Globe },
    { id: 'multi_agent' as NavTab, label: 'AI Agent Debate', icon: Bot, badge: '10 Agents' },
    { id: 'scenario_sim' as NavTab, label: 'Scenario Simulator', icon: Sliders },
    { id: 'knowledge_graph' as NavTab, label: 'Knowledge Graph', icon: Share2 },
    { id: 'procurement' as NavTab, label: 'Procurement Copilot', icon: ShoppingBag },
    { id: 'policy_advisor' as NavTab, label: 'Policy Advisor & SPR', icon: Landmark },
    { id: 'commodity_intel' as NavTab, label: 'Commodity Intel', icon: TrendingUp },
    { id: 'port_pipeline' as NavTab, label: 'Ports & Pipelines', icon: Anchor },
    { id: 'economic_impact' as NavTab, label: 'Economic Impact', icon: BarChart3 },
    { id: 'mission_console' as NavTab, label: 'Mission Console AI', icon: Terminal },
    { id: 'executive_report' as NavTab, label: 'Cabinet Briefing', icon: FileCheck },
    { id: 'settings' as NavTab, label: 'System Config', icon: Settings }
  ];

  return (
    <aside className={`w-64 border-r flex flex-col transition-colors duration-300 hidden md:flex shrink-0 ${
      emergencyMode 
        ? 'bg-rose-950 border-rose-800 text-rose-100' 
        : 'bg-[#EEF2F5] border-[#E2E8EE] text-[#1C2A39]'
    }`}>
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#8A9DAE] uppercase">
          COMMAND MODULES
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 group ${
                isActive
                  ? emergencyMode
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-[#1C2A39] text-white shadow-md'
                  : 'hover:bg-white text-[#566A7A] hover:text-[#1C2A39]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive 
                    ? 'text-[#E6AA53]' 
                    : 'text-[#8A9DAE] group-hover:text-[#1C2A39]'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  isActive
                    ? 'bg-[#E6AA53] text-[#1C2A39]'
                    : 'bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#E2E8EE] text-center text-[10px] text-[#566A7A] font-medium">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold text-[#1C2A39]">ORCHESTRATOR ONLINE</span>
        </div>
        <div className="mt-0.5 text-[#8A9DAE]">v1.0.0 | National Energy OS</div>
      </div>
    </aside>
  );
};
