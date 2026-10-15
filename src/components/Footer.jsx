import React from 'react';
import { Bot, Heart, Shield, Terminal, ArrowUp, Cpu } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-white">Assistive Feeding System</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                  IDP 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500">Innovative Design Project • College Engineering Capstone</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-6 text-xs text-slate-400">
            <a href="#overview" className="hover:text-cyan-300 transition-colors">Project Overview</a>
            <a href="#dashboard" className="hover:text-cyan-300 transition-colors">Control Dashboard</a>
            <a href="#telemetry" className="hover:text-cyan-300 transition-colors">Telemetry</a>
            <a href="#technology" className="hover:text-cyan-300 transition-colors">Architecture</a>
            <a href="#roadmap" className="hover:text-cyan-300 transition-colors">Roadmap</a>
            <a href="#safety" className="hover:text-cyan-300 transition-colors">Safety & Ethics</a>
          </div>

          {/* Back to top */}
          <button
            onClick={onScrollTop}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Academic and Simulation Disclaimer Footer Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            Developed for Innovative Design Project (IDP 2.0). Interactive Software Simulation.
          </p>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-amber-400/90 bg-amber-950/40 px-3 py-1 rounded-md border border-amber-900/50">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Honest Demonstration: Hardware Integration In Progress</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
