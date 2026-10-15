import React from 'react';
import { Activity, WifiOff, Terminal, Clock, CheckCircle2 } from 'lucide-react';

export default function SystemStatusPanel({
  systemStatus,
  connectionStatus,
  x,
  y,
  rotation,
  speedMode,
  totalCommands,
  currentOperation,
  emergencyStopped,
  lastCommand
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* System State */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-mono uppercase text-[11px]">System:</span>
          <div className="flex items-center space-x-1.5 font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                emergencyStopped ? 'bg-red-500' : 'bg-emerald-600 animate-pulse'
              }`}
            />
            <span className={emergencyStopped ? 'text-red-600' : 'text-slate-800'}>
              {emergencyStopped ? 'Stopped' : 'Simulation Active'}
            </span>
          </div>
        </div>

        {/* Hardware Status (Honest: Not Connected) */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-mono uppercase text-[11px]">Hardware:</span>
          <div className="flex items-center space-x-1.5 font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <WifiOff className="w-3 h-3 text-amber-600" />
            <span>Not Connected (Simulation Mode)</span>
          </div>
        </div>

        {/* Last Command */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-mono uppercase text-[11px]">Last Command:</span>
          <span className="font-mono text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {lastCommand || 'System Initialized'}
          </span>
        </div>

        {/* Total Commands */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-mono uppercase text-[11px]">Total Commands:</span>
          <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            {totalCommands}
          </span>
        </div>

        {/* Current State / Position */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-600">
          <span>Pos: <strong className="text-slate-800">{x}, {y}mm</strong></span>
          <span className="text-slate-300">|</span>
          <span>Angle: <strong className="text-teal-700">{rotation}°</strong></span>
        </div>

      </div>
    </div>
  );
}
