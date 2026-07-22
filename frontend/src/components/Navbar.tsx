import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  UserCheck, 
  Radio, 
  FileText
} from 'lucide-react';
import type { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  emergencyMode: boolean;
  setEmergencyMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenReportModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setRole,
  emergencyMode,
  setEmergencyMode,
  audioEnabled,
  setAudioEnabled,
  onOpenReportModal,
  onSearchQuery
}) => {
  const [searchInput, setSearchInput] = useState('');

  const roles: UserRole[] = [
    'Energy Analyst',
    'Government Official',
    'Policy Maker',
    'Refinery Manager',
    'Logistics Manager',
    'Administrator'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      emergencyMode 
        ? 'bg-rose-900 border-rose-700 text-white shadow-lg' 
        : 'bg-white/90 border-slate-200/80 backdrop-blur-xl shadow-sm text-[#1C2A39]'
    }`}>
      <div className="max-w-[1920px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
            emergencyMode 
              ? 'bg-rose-600 text-white animate-pulse shadow-md' 
              : 'bg-[#1C2A39] text-[#E6AA53] shadow-sm'
          }`}>
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black tracking-tight text-xl text-[#1C2A39]">
                URJA KAVACH AI
              </h1>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full ${
                emergencyMode 
                  ? 'bg-rose-200 text-rose-900 font-bold' 
                  : 'bg-[#FAF4EA] text-[#1C2A39] border border-[#F0E4D2] font-bold'
              }`}>
                {emergencyMode ? 'CRISIS MODE' : 'COMMAND CENTER'}
              </span>
            </div>
            <p className="text-[11px] text-[#566A7A] font-medium hidden sm:block">
              India Energy Supply Chain Resilience Operating System
            </p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9DAE]" />
            <input
              type="text"
              placeholder="Search Vessels, Ports, Refineries, Articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#EEF2F5] text-xs text-[#1C2A39] placeholder-[#8A9DAE] pl-10 pr-4 py-2 rounded-xl border border-transparent focus:outline-none focus:bg-white focus:border-[#E6AA53] transition-all font-medium"
            />
          </div>
        </form>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Security Score Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF4EA] border border-[#F0E4D2] text-[#1C2A39]">
            <Radio className="w-4 h-4 text-[#E6AA53] animate-pulse" />
            <div>
              <div className="text-[9px] text-[#566A7A] font-semibold uppercase">Security Score</div>
              <div className="text-xs font-black text-[#1C2A39]">78 / 100</div>
            </div>
          </div>

          {/* User Role Selector */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF2F5] border border-slate-200">
            <UserCheck className="w-4 h-4 text-[#2B4459]" />
            <select
              value={currentRole}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-bold text-[#1C2A39] focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r} className="bg-white text-[#1C2A39]">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Cabinet Briefing Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1C2A39] text-[#E6AA53] hover:bg-[#2B4459] transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Cabinet Briefing</span>
          </button>

          {/* Audio Alert Toggle */}
          <button
            onClick={() => setAudioEnabled(prev => !prev)}
            className="p-2 rounded-xl border border-slate-200 bg-[#EEF2F5] text-[#566A7A] hover:text-[#1C2A39] transition-all"
            title={audioEnabled ? "Sound Alerts Enabled" : "Sound Muted"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Emergency Mode Toggle */}
          <button
            onClick={() => setEmergencyMode(prev => !prev)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-sm ${
              emergencyMode
                ? 'bg-white text-rose-900 border border-white'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{emergencyMode ? 'EXIT EMERGENCY' : 'EMERGENCY MODE'}</span>
          </button>

        </div>

      </div>
    </header>
  );
};
