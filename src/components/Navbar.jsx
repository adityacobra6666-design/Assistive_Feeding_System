import React from 'react';
import { Sliders, HelpCircle, Utensils, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, emergencyStopped }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Name */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-xs">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  Assistive Feeding System
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-mono font-medium">
                  IDP 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Robotic Spoon Control</p>
            </div>
          </div>

          {/* Minimal Navigation & Status */}
          <div className="flex items-center space-x-3">
            
            {/* Status Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800">
              <span className={`w-2 h-2 rounded-full ${emergencyStopped ? 'bg-red-500 animate-ping' : 'bg-amber-500'}`} />
              <span className="font-mono text-[11px] font-semibold">
                {emergencyStopped ? 'STOPPED' : 'SIMULATION MODE'}
              </span>
            </div>

            {/* Compact Nav Tabs: Control Panel | How It Works */}
            <nav className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('control')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'control'
                    ? 'bg-white text-teal-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Control Panel</span>
              </button>

              <button
                onClick={() => setActiveTab('how-it-works')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'how-it-works'
                    ? 'bg-white text-teal-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>How It Works</span>
              </button>
            </nav>

          </div>

        </div>
      </div>
    </header>
  );
}
